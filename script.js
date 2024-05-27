// script.js

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCount = 1;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerHTML = 'Pause';
        startStopBtn.style.backgroundColor = '#ffc107';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        startStopBtn.style.backgroundColor = '#28a745';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    startStopBtn.innerHTML = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    timeDisplay.innerHTML = '00:00:00.000';
    laps.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapCount}: ${timeDisplay.innerHTML}`;
        laps.appendChild(lapTime);
        lapCount++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "00" + milliseconds : (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}
