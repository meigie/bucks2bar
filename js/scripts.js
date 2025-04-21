// Input with id "username" on change event
document.getElementById("username").addEventListener("input", (event) => {
  const username = event.target.value;
  const regex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*~])[A-Za-z0-9!@#$%^&*~]{8,}$/;

  // Set the username input border color based on regex validation
  event.target.style.border = regex.test(username)
    ? "2px solid green"
    : "2px solid red";
});

document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");
  const canvas = document.getElementById("barChart");

  downloadBtn.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "chart.png";
    link.click();
  });
});

// Trigger the email-sending functionality programmatically
document.addEventListener("DOMContentLoaded", () => {
  const sendEmailButton = document.getElementById("send-email");

  // Add a click event listener to the button
  sendEmailButton.addEventListener("click", async () => {
    const canvas = document.getElementById("barChart");
    const image = canvas.toDataURL("image/png");

    const email = document.getElementById("email-address").value;
    if (email) {
      fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, image }),
      })
        .then((response) => response.text())
        .then((result) => alert(result))
        .catch((error) => console.error("Error:", error));
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const chartTab = document.getElementById("chart-tab");
  let barChart = null;

  chartTab.addEventListener("click", () => {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const getData = (type) =>
      months.map(
        (month) =>
          parseFloat(document.getElementById(`${month}-${type}`).value) || 0
      );

    if (!barChart) {
      const ctx = document.getElementById("barChart").getContext("2d");
      const incomeData = getData("income");
      const expensesData = getData("expenses");

      barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months.map(
            (month) => month.charAt(0).toUpperCase() + month.slice(1)
          ),
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: expensesData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Monthly Income vs Expenses",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      // Update the chart data if it already exists
      barChart.data.datasets[0].data = getData("income");
      barChart.data.datasets[1].data = getData("expenses");
      barChart.update();
    }
  });
});
