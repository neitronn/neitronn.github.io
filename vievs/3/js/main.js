window.addEventListener('DOMContentLoaded', () => { //загрузка страницы

    let present = false;


    function inputClear (){
        document.querySelectorAll("input").forEach(item => {
            item.value = "";
        });
    };



    function sowpPopupModal(activClass, showClass, closeElem, closeOut = true, delActiv = false, pr= false){  //модальные окна
        const activ = document.querySelectorAll(activClass),
        show = document.querySelector(showClass),
        close = show.querySelector(closeElem); // получаем элементы на страницы для взаимодействия

        activ.forEach(item => {  //вешаем обработку событий на каждый элемент
            item.addEventListener("click", e => {
                if (e.target) {
                    show.classList.add("animated", "fadeIn");
                    show.style.display = "block";
                    document.body.style.overflow = "hidden";

                    if (delActiv) {  activ.forEach(i => { i.remove(); });  } // если delActiv = истина, то удаляем кнопки вызова
                    if (pr) { present = true; }

                }
            });
        });

        
        show.addEventListener("click", e => { //обработка событий на закрытие формы
                if ( e.target == close || (e.target === show && closeOut)) {
               
                show.style.display = "none";
                document.body.style.overflow = "";
                inputClear();
            }
        });

        

    }; //модальные окна


    function IntervalPresent(t){  //таймер открытия подарка
        setTimeout(()=>{
            if(!present){

               if ( !checkingOpenModal("[data-modal]")) {
                document.querySelector(".pulse").click();
               }
               else {  IntervalPresent(t); }
               
            }
        }, t);
    };

    function checkingOpenModal(data){ //функция проверяет есть ли видимые модальные оокна
        let p=false;
        const modal = document.querySelectorAll(data);

        modal.forEach(item => {
          if ( item.style.display != "" && item.style.display != "none") p=true;
          
        });
        return p;

    };


    function scrollWindow(){
        window.addEventListener('scroll', function() {
            if(!present &&(window.pageYOffset + document.documentElement.clientHeight>= document.documentElement.scrollHeight)) {
                document.querySelector(".pulse").click();
            }
          });
    };

    
     
      

    sowpPopupModal(".button-consultation", ".popup-consultation", ".popup-close");
    sowpPopupModal(".button-design", ".popup-design", ".popup-close");
    sowpPopupModal(".pulse", ".popup-gift", ".popup-close", true , true,true);
   // IntervalPresent(30000);
    scrollWindow();



    function slider(SlideClass, direction, t,btnPrev, BtnNext){ //слайдер


        const Sliders = document.querySelectorAll(SlideClass);
        let activSlaids = 1,
        paused = false;

       

        showSlider(0);

        function showSlider(n){

            Sliders.forEach(slid => {
                slid.style.display = "none";
                slid.classList.add("animated");
            });


            activSlaids +=n;
            if (activSlaids > Sliders.length) activSlaids=1;
            if (activSlaids < 1 ) activSlaids = Sliders.length;           
            Sliders[activSlaids-1].style.display = "block";
        };


        try {
            const btnP = document.querySelector(btnPrev),
            btnN = document.querySelector(BtnNext);

            btnP.addEventListener("click", e=>{
                showSlider(-1);
                Sliders[activSlaids-1].classList.remove("slideInRight");
                Sliders[activSlaids-1].classList.add("slideInLeft");

            });

            btnN.addEventListener("click", e=>{
                showSlider(1);
                Sliders[activSlaids-1].classList.remove("slideInLeft");
                Sliders[activSlaids-1].classList.add("slideInRight");
            });

        }catch(e){

        }

        function activateAnimation(){
            if (direction == "vr") {
               paused = setInterval(function() {
                    showSlider(1);
                    Sliders[activSlaids-1].classList.add("slideInDown");
                }, t);
            }else {
    
                paused =  setInterval(function() {
                    showSlider(1);
                    Sliders[activSlaids-1].classList.remove("slideInLeft");
                    Sliders[activSlaids-1].classList.add("slideInRight");
                }, t);
    
            }

        };


        activateAnimation();

        Sliders[0].parentNode.addEventListener("mouseenter", () => {
            clearInterval(paused);
        });
        
        Sliders[0].parentNode.addEventListener("mouseleave", () => {
            activateAnimation();
        });


    }; // слайдер


 //   slider(".feedback-slider-item", "", 3000, ".main-prev-btn", ".main-next-btn");  //на сервере анимация дергает сайт
    slider(".main-slider-item", "vr", 3000, "", "");





    function noSimvol (classInput){  //функция проверки на ввод цифр


        document.querySelectorAll( classInput).forEach(item => {
             item.addEventListener("input", e => {
                 item.value = item.value.replace(/\D/, ''); // Все нецифры занемяем пустой строкой
             });
         });
     };




    function forms(){ // формы отправки данных
        const form = document.querySelectorAll("form"),
            inputs = document.querySelectorAll("input"),
            upload = document.querySelectorAll("[name='upload']");
            

            noSimvol('input[name="phone"]');

        const messag = {
            loading: 'загрузка данных...',
            success: 'Спасибо. Скора мы с вами свяжимся.',
            error: 'ошибка, попробуйте снова',
            load: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };

        const pach = {
            designer: 'assets/server.php',
            question: 'assets/question.php'
        };

        const postData = async (url, data) => { //async - указывает что дальше есть асинхроная операция которую нужно подождать
        
            let res = await fetch(url, { //await - ждет выполнения асинхроной операции (используется в паре с async). fetch - возвращает промес
                method: "POST",
                body: data
            });

            return await res.text();

        };

        const clearInput = () => {
            inputs.forEach(item => {
                item.value = '';
            });
            upload.forEach(item => {
                item.previousElementSibling.textContent ="файл не выбран";
            });
        };


        upload.forEach(item => {
            item.addEventListener("input", () => {
              
                item.previousElementSibling.textContent = item.files[0].name;
            });
        });


        form.forEach(item => {
            item.addEventListener('submit' ,  e => {
                e.preventDefault();


                let statusMessag = document.createElement("div");
                statusMessag.classList.add("status");
                item.parentNode.appendChild(statusMessag);

                item.classList.add('animated', 'fadeOutUp');
                setTimeout(() => {
                    item.style.display ="none";
                }, 400);

                let statusImg = document.createElement("img");
                statusImg.setAttribute('src', messag.load);
                statusMessag.appendChild(statusImg);

                let StatusText = document.createElement('div');
                StatusText.textContent = messag.loading;
                statusMessag.appendChild(StatusText);

                const formData = new FormData (item);
                let api;

                item.closest('.popup-design') || item.classList.contains('calc-form') ? api = pach.designer : api = pach.question; // функция ищет элименты (в данном случае по классу) вверху по иерархии
                console.log(api);



                postData(api, formData)  //получили промес
                    .then(res => {                  // успешный ответ от серверв
                        console.log(res);
                        statusImg.setAttribute('src', messag.ok);
                        StatusText.textContent = messag.success;  
                    })
                    .catch ( () => { //ошибка при отправке запроса на сервер
                        statusImg.setAttribute('src', messag.fail);
                        StatusText.textContent = messag.error;
                    })
                    .finally (() => { //выполниться в любом случае еспех или ошибка. 
                        clearInput();
                        setTimeout(() => {
                            statusMessag.remove();
                            item.style.display = "block";
                            item.classList.remove("fadeOutUp");
                            item.classList.add("fadeInUp");

                        }, 3000);
                    });  


            });
        });



    }
    
    forms();



    function showStyles(classStyles, btn){
        const styles = document.querySelectorAll(classStyles),
         b = document.querySelector(btn);

        styles.forEach(item =>{
            item.classList.add('animated', 'fadeInUp');
        });


       

        b.addEventListener('click', () =>{
            styles.forEach(item =>{
                item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
                item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            });
            b.remove();
        });

    };
  
    
    showStyles('.styles-2', '.button-styles');


    function calc (size, material, option, promo, result){
        const sizeBlock = document.querySelector(size),
         materialBlock = document.querySelector(material),
         optionBlock = document.querySelector(option),
         promoBlock = document.querySelector(promo),
         resultBlock = document.querySelector(result);
        let sum=0;

         function raschCalck(){
            sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionBlock.value));


            if (promoBlock.value === "SALE") sum= Math.round(sum * 0.7);

            if (sizeBlock.value == '' || materialBlock.value == '') {
                resultBlock.innerHTML = "выберете размер и материал";
            } else {
                resultBlock.innerHTML = sum;
            }


         };

         sizeBlock.addEventListener('change', raschCalck);
         materialBlock.addEventListener('change', raschCalck);
         optionBlock.addEventListener('change', raschCalck);
         promoBlock.addEventListener('input', raschCalck);

    };

    calc('#size', '#material', '#options', '.promocode', '.calc-price');


    function filtred(ClassSection){
        const section = document.querySelector(ClassSection),
            menu = section.querySelector('ul'),
            menuLI = menu.querySelectorAll('li'),
            blockImgAll = section.querySelectorAll('.portfolio-block'),
            no = section.querySelector('.portfolio-no');
            

        menu.addEventListener('click', e => {
            if (e.target && e.target.tagName == "LI") {
                menuLI.forEach(item => {
                    item.classList.remove('active');
                });
                e.target.classList.add('active');

                showBlocks('.' + e.target.classList[0]);

            }
        });


        function showBlocks(showClassImg){

           const blockImg = section.querySelectorAll(showClassImg);
          
            
            blockImgAll.forEach(item => {
                item.style.display = "none";
                item.classList.remove("fadeIn");
            });
            no.style.display = "none";

           

            if (blockImg.length > 1) {
                blockImg.forEach(item => {
                    item.style.display = "block";
                });
            }else{
                no.style.display = "block";
                
            }

        };

    };

    filtred('#portfolio');



    function pictureSize(classBlocks){
        const blocks = document.querySelectorAll(classBlocks);

        function showPicture(block){
            const img = block.querySelector("img");
            img.src = img.src.slice(0, -4) + '-1.png';
            block.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
                p.style.display = "none";
            });
        };

        function hidePicture(block){
            const img = block.querySelector("img");
            img.src = img.src.slice(0, -6) + '.png';
            block.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
                p.style.display = "block";
            });
        };


        blocks.forEach (block => {
            block.addEventListener('mouseover', () => {
                showPicture(block);
            });

            block.addEventListener('mouseout', () => {
                hidePicture(block);
            });


        });
        

    };

    pictureSize('.sizes-block');



    function acordion(classZagalovka){
        acord = document.querySelectorAll(classZagalovka);
        acord.forEach(item => {
            item.addEventListener('click', e => {
                
                if (e.target && e.target.tagName == "SPAN") {
                   if (e.target.parentNode.classList.contains("activ-acord")) {
                    e.target.parentNode.classList.remove("activ-acord");
                   } else {
                    closeAcordsAll();
                    e.target.parentNode.classList.add("activ-acord");
                   }
                    
                }
            });
        });

        function closeAcordsAll(){
            acord.forEach(item => {
                item.classList.remove("activ-acord");
            });
        };
    };

    acordion(".accordion-heading");


    function burger(){
        const btn = document.querySelector(".burger"),
        menu = document.querySelector(".header .burger-menu");

        menu.style.display = "none";

        btn.addEventListener("click", () => {
            
            if ( menu.style.display == "none" && window.screen.availWidth < 993 ) {
                menu.style.display = "block";
              
            } else {
                menu.style.display = "none";
            }

            window.addEventListener("resize", () => {
                if (window.screen.availWidth > 992) {
                    menu.style.display = "none";
                }
            });

        });
    };

    burger();


    function scrollUp(){
        const btn = document.querySelector(".pageup");

        window.addEventListener("scroll", ()=>{
            if (document.documentElement.scrollTop > 1650) {
                btn.classList.add("animated", "fadeIn");
                btn.classList.remove("fadeOut");
               
            }else{
                btn.classList.add("fadeOut");
                btn.classList.remove("fadeIn");
               
                
            }
        });

        const body = document.body,
        element = document.documentElement;

        function calcScroll(){
            btn.addEventListener("click", function(e){
                let scrollTop = Math.round(body.scrollTop || element.scrollTop);

                if(this.hash !== '') {
                    e.preventDefault();
                    let hashElement = document.querySelector(this.hash);
                     let  hashElementTop = 0;
                

               
                while(hashElement.offsetParent){
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent
                }
                hashElementTop = Math.round(hashElementTop);
                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
            });
        };

        function smoothScroll(from, to, hash){
            let timeInterval =1,
            precScrollTop,
            speed;

            if (to > from){
                speed=30;
            }else{
                speed=-30;
            }

            let move = setInterval(function()  {
                let scrollTop = Math.round(body.scrollTop || element.scrollTop);

                if(
                    precScrollTop === scrollTop ||
                    (to > from && scrollTop >= to) ||
                    (to < from && scrollTop <= to)
                ){
                    clearInterval(move);
                    history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
                }else{
                    body.scrollTop += speed;
                    element.scrollTop += speed;
                    precScrollTop = scrollTop;
                }

            }, timeInterval);

           

        };


        calcScroll();

    };

    scrollUp();

    
    

    
   

}); //окончания загрузки страницы