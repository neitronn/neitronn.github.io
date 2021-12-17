/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calck.js":
/*!*****************************!*\
  !*** ./js/modules/calck.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

//modal
function modal(){
    const modal = document.querySelector(".modal"),
        btnModal = document.querySelectorAll("[data-modal]"),
        closeModal = document.querySelector(".modal__close");
        

    function showModal(){
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = 'hidden';
        clearInterval(TimeModal);
    }

       btnModal.forEach(item => {
            item.addEventListener("click" , showModal);
       });

       function closeMod(){
                 modal.classList.remove("show");
                modal.classList.add("hide");
                document.body.style.overflow = '';
       }

       closeModal.addEventListener("click", closeMod);

       modal.addEventListener("click", e => {
        if (e.target === modal) {
            closeMod();
        }
       });

       document.addEventListener("keydown", e => {
           if (e.code == 'Escape' && modal.classList.contains('show')){
               closeMod();
           }
       });

     //  const TimeModal = setTimeout(showModal, 5000);

       function scrolShowModal(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener("scroll", scrolShowModal);
        }
       }

       window.addEventListener("scroll", scrolShowModal);
    }

    module.exports = modal;

/***/ }),

/***/ "./js/modules/recept.js":
/*!******************************!*\
  !*** ./js/modules/recept.js ***!
  \******************************/
/***/ ((module) => {

//рецепты
function recept(){
   /* const rec = {
        recept: [
           ['Фитнес!','это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!','img/tabs/vegy.jpg','229'],
           ['Премиум','мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!','img/tabs/elite.jpg','550'],
           ['Постное','это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.','img/tabs/post.jpg','430']
        ]
    };*/

    
    fetch('http://localhost:3000/menu').then(date => date.json()).then(res => {

        

        const p = document.querySelector('.menu__field .container');
         res.forEach(item => {
        let r = new MenuReceptov(item['title'],item['descr'],item['img'],item['price']);
        r.vivodRecepta(p);
          
          });
    });
    

    

    class MenuReceptov{
        constructor(nazvanie, opisanei, kartinka, cena){
            this.nazvanie = nazvanie;
            this.opisanei = opisanei;
            this.kartinka = kartinka;
            this.cena = cena;
        }

        vivodRecepta(kyda){

            const div = document.createElement("div");
            div.classList.add('menu__item');
            const a = `
            <img src="${this.kartinka}" alt="vegy">
            <h3 class="menu__item-subtitle">Меню "${this.nazvanie}"</h3>
            <div class="menu__item-descr">Меню "${this.nazvanie}" - ${this.opisanei}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.cena}</span> грн/день</div>
            </div>`;
            div.innerHTML = a;
            kyda.append(div);
        }
    }
}

module.exports = recept;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

//слайдер
function slider(){
  /*  const prev = document.querySelector('.offer__slider .offer__slider-counter .offer__slider-prev'),
         next = document.querySelector('.offer__slider .offer__slider-counter .offer__slider-next'),
         cur = document.getElementById('current'),
         total = document.getElementById('total'),
         slaid_img = document.querySelectorAll('.offer__slider .offer__slider-wrapper .offer__slide'),
          total_count = slaid_img.length;
          let index =1;

        cur.textContent = (index > 9 ) ? index : "0"+index;
         total.textContent = (total_count > 9) ? total_count : "0"+ total_count;

        slaid_img.forEach((item, i) => {
            if (i+1 != index) {
                item.classList.add('hide');
            }
        });

        function perecluchSlaid(kuda){
            slaid_img[index-1].classList.add('hide');
            if (kuda) {
               index = (index === total_count) ? 1 : index+1;
            } else {
                index = (index === 1) ? total_count : index-1;
            }
            slaid_img[index-1].classList.remove('hide');
            cur.textContent = (index > 9 ) ? index : "0"+index;
        }

        prev.addEventListener('click', e => {
            perecluchSlaid(false);
        });

        next.addEventListener('click', e => {
            perecluchSlaid(true);
        });
        
            */


        const prev = document.querySelector('.offer__slider .offer__slider-counter .offer__slider-prev'),
         next = document.querySelector('.offer__slider .offer__slider-counter .offer__slider-next'),
         cur = document.getElementById('current'),
         total = document.getElementById('total'),
         podloska = document.querySelector('.offer__slider .podloska'),
         slaid_img = document.querySelectorAll('.offer__slider .offer__slider-wrapper .offer__slide'),
         slaider = document.querySelector('.offer__slider .offer__slider-wrapper'),
         total_count = slaid_img.length;
        let index =3,   width = window.getComputedStyle(slaider).width;

        podloska.style.width= 100 * total_count + '%';
        
        total.textContent = (total_count > 9) ? total_count : "0"+ total_count;
       
        let dots = [];
        const main = document.querySelector('.offer__slider');
        indicators = document.createElement('ul');
        indicators.classList.add('carousel-indicators');
        main.append(indicators);

        slaid_img.forEach((item ,i) => {
            item.style.width = width;
            const dota = document.createElement('li');
            dota.classList.add('dot');
            dota.setAttribute('data-slider-to', i+1);
            dots.push(dota);
            indicators.append(dota);
        });

        dots[index-1].style.opacity =1;

        width = +width.slice(0,width.length-2);
        let otstyp =(index-1)*width;

        sdvig();

        function sdvig(){
            podloska.style.transform = `translateX(-${otstyp}px)`;
            cur.textContent = (index > 9 ) ? index : "0"+index;
            for(let i=0;i<dots.length;i++){
                dots[i].style.opacity =0.5;
            }
            dots[index-1].style.opacity =1;
        }

        function nextSlaid(){
            if (otstyp == width*(total_count -1)) {
                index = 1;
                otstyp = 0;
            }else{
                otstyp += width;
                index ++;
            }
            sdvig();
        }

        function predSlaid(){
            if (otstyp == 0) {
                index = total_count;
                otstyp = width*(total_count -1);
            }else{
                index --;
                otstyp -= width;
            }
            sdvig();
        }

        next.addEventListener('click', e =>{
            nextSlaid();
        });

        prev.addEventListener('click', e => {
            predSlaid();
        });
        
        dots.forEach(dot =>{
            dot.addEventListener('click', e =>{
              index = dot.getAttribute('data-slider-to');
              otstyp =(index-1)*width;
                sdvig();
            });
        });
    }

    module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

 //tabs
 function tabs(){
    const tabsMenu = document.querySelector(".tabheader__items");
    const tabs = tabsMenu.querySelectorAll(".tabheader__item");
    const con = document.querySelectorAll(".tabcontent");
    

    function hideContent(){
        con.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        });
    }

    function showContent(i =0){
        hideContent();
        con[i].classList.add("show");
        con[i].classList.remove("hide");
    }


    tabsMenu.addEventListener('click', (e) =>  {
        const tar = e.target;
        tabs.forEach((item, i) => {
            item.classList.remove("tabheader__item_active");
            if (tar && tar == item) {
                item.classList.add("tabheader__item_active");
                showContent(i);
            }
        });
    });

    
    showContent();
 }
 module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

//timer
function timer(){
    function raschetTime(timeFinesh){
        const d  = Date.parse(timeFinesh) - Date.parse(new Date()),
        deys = Math.floor(d / (1000 * 60 * 60 * 24) ),
        chasi = Math.floor((d / (1000 * 60 * 60 )) % 24 ),
        minyts = Math.floor((d / (1000 * 60 )) % 60 ),
        secynds = Math.floor((d / 1000) % 60 );

        return {
            "total" : d,
            "deys" : deys,
            "chasi" : chasi,
            "minyts" : minyts,
            "secynds" : secynds
        };
        

        
    }

    function addNol(x){
        if (x>=0 && x<10) {
            return ("0" + x);
        } else {
            return x;
        }
    }


    function showTim(conteiner, timeFinesh){
        const tim = document.querySelector(conteiner),
            dey = tim.querySelector("#days"),
            chas = tim.querySelector("#hours"),
            min = tim.querySelector("#minutes"),
            sec = tim.querySelector("#seconds");
            
            const id = setInterval(obnovTimer , 1000);
            obnovTimer();


    function obnovTimer(){
        let rez = raschetTime(timeFinesh);
        dey.innerHTML = addNol(rez["deys"]);
        chas.innerHTML = addNol(rez["chasi"]);
        min.innerHTML = addNol(rez["minyts"]);
        sec.innerHTML = addNol(rez["secynds"]);
        if (rez["total"] <= 0) {
            clearInterval(id);
        }
    }
        

    }

 
    showTim(".timer", "2022-01-31");
}
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener("DOMContentLoaded", () => {

   
    const calck = __webpack_require__(/*! ./modules/calck */ "./js/modules/calck.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        recept = __webpack_require__(/*! ./modules/recept */ "./js/modules/recept.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

        calck();
        modal();
        recept();
        slider();
        tabs();
        timer();

    



    


    

    

   
    


       




  });


  
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map