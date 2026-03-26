// Populate selects
for (let i = 0; i < 24; i++) {
  hours.innerHTML += `<option value="${i}">${i}</option>`;
}
for (let i = 0; i < 60; i++) {
  minutes.innerHTML += `<option value="${i}">${i}</option>`;
  seconds.innerHTML += `<option value="${i}">${i}</option>`;
}

let timer = null;
let totalSeconds = 0;

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
const chickenSound = document.getElementById('chickenSound');

function updateSelects(disabled) {
  document.getElementById('hours').disabled = disabled;
  document.getElementById('minutes').disabled = disabled;
  document.getElementById('seconds').disabled = disabled;
}

startBtn.onclick = function() {
  const h = parseInt(document.getElementById('hours').value, 10);
  const m = parseInt(document.getElementById('minutes').value, 10);
  const s = parseInt(document.getElementById('seconds').value, 10);
  totalSeconds = h * 3600 + m * 60 + s;
  if (totalSeconds === 0) return;

  updateSelects(true);
  startBtn.disabled = true;
  cancelBtn.disabled = false;

  timer = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      chickenSound.play();
      updateSelects(false);
      startBtn.disabled = false;
      cancelBtn.disabled = true;
      return;
    }
    totalSeconds--;
    // Update selects to show current time left
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    document.getElementById('hours').value = h;
    document.getElementById('minutes').value = m;
    document.getElementById('seconds').value = s;
  }, 1000);
};

cancelBtn.onclick = function() {
  clearInterval(timer);
  updateSelects(false);
  startBtn.disabled = false;
  cancelBtn.disabled = true;
};

// Initialize state
updateSelects(false);
startBtn.disabled = false;
cancelBtn.disabled = true;

