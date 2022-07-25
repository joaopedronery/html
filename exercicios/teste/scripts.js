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
    },
    {
    label: 'Crescimento do meu amor por ela',
    backgroundColor: 'rgb(252, 0, 55)',
    borderColor: 'rgb(252, 0, 55)',
    data: [150, 250, 350, 450, 550, 650, 750]
    }
]
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