// Clock updater
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric'});
  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}
setInterval(updateClock, 1000);
updateClock();

// Brightness slider
const slider = document.getElementById('brightness-slider');
const valueDisplay = document.getElementById('brightness-value');
slider.addEventListener('input', () => {
  valueDisplay.textContent = `${slider.value}%`;
});

// Temperature chart (simple gauge)
const tempCtx = document.getElementById('tempChart').getContext('2d');
new Chart(tempCtx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [24, 6],
      backgroundColor: ['#ffb347', '#333'],
      cutout: '80%',
    }]
  },
  options: {
    plugins: { legend: { display: false } }
  }
});

// Power usage chart
const ctx = document.getElementById('powerChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Power Usage (kWh)',
      data: [10, 12, 8, 20, 15, 18, 12],
      borderColor: '#ff7b00',
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointRadius: 4,
      fill: true,
      backgroundColor: 'rgba(255,123,0,0.2)',
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#555' }, ticks: { color: '#ccc' } },
      x: { grid: { color: '#555' }, ticks: { color: '#ccc' } }
    }
  }
});
