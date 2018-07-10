let Service = require('node-windows').Service;  
  
let svc = new Service({  
  name: 'PostMan',   
  description: 'easy access to http request',  
  script: 'C:\\***\Desktop\\NodeJs\\PostMan\\main.js'
});  
  
svc.on('install', () => {  
  svc.start();  
});  
  
svc.install();  
