const inputEl = document.querySelector('.form-control');
const audioEl = document.querySelector('.audio');
const buttonAddEl = document.querySelector('[data-action="add"]');
const buttonPlayEl = document.querySelector('[data-action="play"]');
const buttonSpeedDecreaseEl = document.querySelector('[data-action="speed-decrease"]');
const buttonSpeedIncreaseEl = document.querySelector('[data-action="speed-increase"]');

const currentTrack = window.localStorage.getItem('currentTrack');
if (currentTrack) {
  audioEl.src = currentTrack;
}

if (buttonAddEl) {
  buttonAddEl.addEventListener('click', function(event) {
    event.preventDefault();
    audioEl.src = inputEl.value;
    window.localStorage.setItem('currentTrack', inputEl.value);
    const currentTime = window.localStorage.getItem('currentTime');
    if (currentTime) {
      audioEl.currentTime = currentTime;
    }
  }, false);
}

if (buttonPlayEl) {
  buttonPlayEl.addEventListener('click', function(event) {
    event.preventDefault();
    audioEl.playbackRate = 2;
    audioEl.play();
  }, false);
}

if (buttonSpeedDecreaseEl) {
  buttonSpeedDecreaseEl.addEventListener('click', function(event) {
    event.preventDefault();
    audioEl.playbackRate = speedDecrease(audioEl.playbackRate);
  }, false);
}

if (buttonSpeedIncreaseEl) {
  buttonSpeedIncreaseEl.addEventListener('click', function(event) {
    event.preventDefault();
    audioEl.playbackRate = speedIncrease(audioEl.playbackRate);
  }, false);
}

if (audioEl) {
  audioEl.addEventListener('timeupdate', function() {
    window.localStorage.setItem('currentTime', audioEl.currentTime);
  });

  audioEl.addEventListener('ended', function() {
    window.localStorage.removeItem('currentTime');
    window.localStorage.removeItem('currentTrack');
  });
}

function speedDecrease(current) {
  return current - .5;
}

function speedIncrease(current) {
  return current + .5;
}
