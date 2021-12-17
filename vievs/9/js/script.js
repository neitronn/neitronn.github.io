document.addEventListener("DOMContentLoaded", () => {

   
    const calck = require('./modules/calck'),
        modal = require('./modules/modal'),
        recept = require('./modules/recept'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer');

        calck();
        modal();
        recept();
        slider();
        tabs();
        timer();

    
  });


  