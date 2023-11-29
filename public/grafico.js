const socket = io();
//let counter = 2;
socket.on('serial:data', function(dataSerial){
    //console.log(dataSerial);
    Chart.data.labels.push(counter);
    Chart.data.datasets.forEach(dataset => {
        dataset.data.push(dataSerial.Value);
        //console.log(dataSerial.Value);
    });
    //counter = counter + 2;
    //Chart.update();
});
const ctx = document.getElementById('meugrafico');
new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Serial"],
      datasets: [{
        label: 'Serial',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      
      y: [{
        
        beginAtZero: true
        
      }]
      
    }
});