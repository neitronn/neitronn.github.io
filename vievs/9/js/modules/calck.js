 //калькулятор
        
function calck(){



        const pol = document.querySelectorAll('#gender div'),
            sport = document.querySelectorAll('.calculating .container .calculating__field .calculating__choose_big div'),
            inpZnach = document.querySelectorAll('.calculating__choose_medium input'),
            totalKalorii = document.querySelector('.calculating__result span');
        

        const a = {
            pol : 1,
            rost : 0,
            ves : 0,
            vozrost : 0,
            sport : 4
        };

        viborZnacheni(pol, pol[a.pol-1]);
        viborZnacheni(sport,sport[a.sport -1]);

        function viborZnacheni(spisokElem,activ){
            spisokElem.forEach(item => {
                item.classList.remove('calculating__choose-item_active');
            });
            activ.classList.add('calculating__choose-item_active');
        }

        function rascetKalori(){

            a.rost = (a.rost <= 250) ? a.rost : 0;
            a.ves = (a.ves <= 250) ? a.ves : 0;
            a.vozrost = (a.vozrost <= 100) ? a.vozrost : 0;


            if (a.pol && a.rost && a.ves && a.vozrost && a.sport)
             {  
                let t,k;

                switch (a.sport){
                    case '1':
                        k = 1.2;
                        break;
                    case '2':
                        k = 1.375;
                        break;
                    case '3':
                        k = 1.55;
                        break;
                    default:
                        k = 1.725;
                }

                if (a.pol == 2) { t = 88.36 + (13.4 * a.ves) + (4.8 * a.rost) - (5.7 * a.vozrost); }
                if (a.pol == 1) { t = 447.6 + (9.2 * a.ves) + (3.1 * a.rost) - (4.3 * a.vozrost); }




                t = t*k ;
                
                totalKalorii.textContent =  Math.round(t);
             }else{
                totalKalorii.textContent = "-";
             }
        }



        pol.forEach(item => {
            item.addEventListener('click', e => {
                viborZnacheni(pol,e.target); 
                a.pol = e.target.getAttribute('data-pol');
                rascetKalori();
            });
        });


        sport.forEach(item => {
            item.addEventListener('click', e => {
                viborZnacheni(sport,e.target); 
                a.sport = e.target.getAttribute('data-sport');
                rascetKalori();
            });
        });


        inpZnach.forEach(item => {
            item.addEventListener('input', e => {
                   let v = e.target.value;
                   if ( Number(v) && v>0 ) {
                    a[e.target.getAttribute('data-inp')] = v;
                   } else {
                    a[e.target.getAttribute('data-inp')] = 0;
                   }
                   rascetKalori();
            });
        });

    }

    module.exports = calck;