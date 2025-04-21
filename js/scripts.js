// input with id "username" on change event
document.getElementById('username').addEventListener('input', function (event) {
    //regex to check if username has at least 1 capital letter, 1 special character, 1 number and is at least 8 characters long
    const username = event.target.value;
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (regex.test(username)) {
        // set the username input border to green
        event.target.style.border = '2px solid green';
    } else {
        // set the username input border to red
        event.target.style.border = '2px solid red';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadBtn');
    const canvas = document.getElementById('barChart');

    downloadBtn.addEventListener('click', function () {
        const image = canvas.toDataURL('image/png'); // Convert canvas to a data URL
        const link = document.createElement('a'); // Create a temporary anchor element
        link.href = image;
        link.download = 'chart.png'; // Set the download filename
        link.click(); // Trigger the download
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const chartTab = document.getElementById('chart-tab');
    let barChart = null;

    chartTab.addEventListener('click', function () {
        if (!barChart) {
            const ctx = document.getElementById('barChart').getContext('2d');
            const months = [
                'january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'
            ];
            const incomeData = months.map(month => parseFloat(document.getElementById(`${month}-income`).value) || 0);
            const expensesData = months.map(month => parseFloat(document.getElementById(`${month}-expenses`).value) || 0);

            barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Expenses',
                        data: expensesData,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Monthly Income vs Expenses'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            // Update the chart data if it already exists
            const months = [
                'january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'
            ];
            barChart.data.datasets[0].data = months.map(month => parseFloat(document.getElementById(`${month}-income`).value) || 0);
            barChart.data.datasets[1].data = months.map(month => parseFloat(document.getElementById(`${month}-expenses`).value) || 0);
            barChart.update();
        }
    });
});