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

// Power usage chart
const ctx = document.getElementById('powerChart').getContext('2d');
const powerChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      data: [10, 12, 8, 20, 15, 18, 12],
      borderColor: 'orange',
      tension: 0.4,
      pointBackgroundColor: 'red',
      pointRadius: 6,
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});