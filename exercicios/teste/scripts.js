const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

const data = {
    labels: labels,
    datasets: [{
    label: 'Crescimento da bunda da minha mulher',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [100, 200, 300, 400, 500, 600, 700]
    },]
  };

const config = {
    type: 'line',
    data: data,
    options: {}
  };

const myChart = new Chart(
    document.getElementById('myCanvas'),
    config
  );