// TIME + DATE
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  document.getElementById("date").textContent = now.toLocaleDateString();
}
setInterval(updateTime, 1000);
updateTime();

// AIR QUALITY SIMULATION (Replace later with real ESP32 data)
const airValue = document.getElementById("air-value");
setInterval(() => {
  const randomAirQ = Math.floor(Math.random() * 400);
  airValue.textContent = randomAirQ + " AQI";
}, 2000);

// TEMPERATURE SIMULATION (for both cards)
const tempValue = document.getElementById("temp-value");
const nestedTemp = document.getElementById("nested-temp-value");
setInterval(() => {
  const randomTemp = (20 + Math.random() * 10).toFixed(1);
  tempValue.textContent = `${randomTemp}°C`;
  nestedTemp.textContent = `${randomTemp}°C`;
}, 2000);

// CHART
window.addEventListener("load", () => {
  const ctx = document.getElementById("powerChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
      datasets: [{
        label: "Power (kWh)",
        data: [2, 3, 2.5, 4, 3.8, 4.2, 3.5, 2.8],
        borderColor: "#fff",
        backgroundColor: "rgba(255,255,255,0.18)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff"
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } }
      },
      plugins: {
        legend: { labels: { color: "#fff" } }
      }
    }
  });
});
