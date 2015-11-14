import AppController from './classes/controllers/AppController';

function init(){ 
    
    console.log("** Yopi **");

    // Entry Point
    new AppController();
}

window.onload = init;


