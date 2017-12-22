let Service = require('node-windows').Service;  
  
let svc = new Service({  
  name: 'PostMan',   
  description: 'easy access to http request',  
  script: 'C:\\Users\\HZ98341\\Desktop\\NodeJs\\PostMan\\main.js'
});  
  
svc.on('install', () => {  
  svc.start();  
});  
  
svc.install();  