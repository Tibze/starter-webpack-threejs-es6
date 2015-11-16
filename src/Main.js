import AppController from './classes/controllers/AppController';

function init(){ 

    // Entry Point
    var selector = document.getElementById('app');
    new AppController(selector);
}

window.onload = init;


