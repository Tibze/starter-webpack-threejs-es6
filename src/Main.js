import AppController from './classes/controllers/AppController';

function init(){ 
    
    console.log("** Yopi **");

    // Entry Point
    var selector = document.getElementById('app');
    new AppController(selector);
}

window.onload = init;


