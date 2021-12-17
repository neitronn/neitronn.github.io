
window.addEventListener('DOMContentLoaded', () => {


    let state = {};

    function inputClear (){
        document.querySelectorAll("input").forEach(item => {
            item.value = "";
        });
    };
   
    function sowpPopupModal(activClass, showClass, closeElem, closeOut = true){  //модальные окна
        const a = document.querySelectorAll(activClass),
            s = document.querySelector(showClass),
            c = document.querySelector(closeElem);

            

        a.forEach(item => {
            item.addEventListener("click", e => {

                if (e.target) {
                    e.preventDefault();
                    if (showClass == ".popup_calc" ) {  activSetState();  }
                    s.style.display = "block";
                     document.body.style.overflow = "hidden";
                }

                
            });
        });

        s.addEventListener("click", e => {
            if ( e.target == c || (e.target === s && closeOut)) {
                if (showClass == ".popup_calc" && state) { state = {};   }
                s.style.display = "none";
                document.body.style.overflow = "";
                inputClear();
            }
        });
            

    }



    sowpPopupModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer strong");
    sowpPopupModal(".phone_link", ".popup", ".popup strong");
    sowpPopupModal(".glazing_price_btn", ".popup_calc", ".popup_calc_close strong");
    






    function activTabs(headClass, activClass, conteinerClass, contentClass, classActiv, dis = "block"){ //табы
        const head = document.querySelector(headClass),
            activ = head.querySelectorAll(activClass),
            conteiner = document.querySelector(conteinerClass),
            content = conteiner.querySelectorAll(contentClass);
          
        
        activ.forEach((item , i) => {
            
            
            item.addEventListener("click", e => {


                    if (classActiv != ""){
                            activ.forEach((w ,k) => {
                                if (k != i) {
                                    w.classList.remove(classActiv);
                                }else{
                                    w.classList.add(classActiv);
                                }
                            });
                    }


                content.forEach((a, j) => {
                   
                    if (i != j) {
                        a.style.display = "none";
                        
                    }else{
                        a.style.display = dis;
                        
                    }
                });

            });

        });


    }

    activTabs(".glazing_slider", ".glazing_block", ".glazing", ".glazing_content","");

    activTabs(".decoration_slider", ".decoration_item div", ".decoration", ".internal, .external, .rising, .roof","after_click");

    activTabs(".balcon_icons", ".balcon_icons_img", ".big_img", ".big_img img","do_image_more", "inline-block");

    function noSimvol (classInput){  //функция проверки на ввод цифр


       document.querySelectorAll( classInput).forEach(item => {
            item.addEventListener("input", e => {
                item.value = item.value.replace(/\D/, ''); // Все нецифры занемяем пустой строкой
            });
        });
    };



    

    function SetState (st, classElem, sobitie, svoistva) {  // формирование данных в калькуляторе
        const elems = document.querySelectorAll(classElem);

        elems.forEach((elem, i) => {

            switch (elem.nodeName){
                case ("SPAN"):
                    elem.addEventListener(sobitie, e => {
                        st[svoistva] = i;
                       // console.log(state);                            

                    });
                break;

                case ("INPUT"):
                    elem.addEventListener(sobitie, e => {
                        st[svoistva] = elem.value;
                      //  console.log(state);
                    });
                break;

                case ("SELECT"):
                    elem.addEventListener(sobitie, e => {
                        st[svoistva] = elem.value;
                       // console.log(state);
                    });
                break;


                case ("LABEL"):
                    elem.addEventListener(sobitie, e => {
                        const checkets = document.querySelectorAll(".popup_calc_profile_content .checkbox");
                       
                        checkets.forEach((che, j) => {
                            che.checked = false;
                        
                        });
                        st[svoistva] = i;
                        checkets[i].checked = true;
                    });
                break;
               

            }

            


        });

        

    };


    function poverkaFormCalck(){  //проверрка заполнености формы калькулятора
        const btn = document.querySelectorAll("[data-value]");
        btn.forEach(b => {

            b.addEventListener("click", e => {

                switch ( b.getAttribute("data-value")){
                    case ('1'):
                        if ( !state.windowWidth || !state.windowheight || state.windowWidth=="" || state.windowheight == "") { return false; }
                        closeFormAll();
                        document.querySelector(".popup_calc_profile").style.display = "block";
                        document.body.style.overflow = "hidden";
                        break;

                    case ('2'):
                        if ( !state.windowType ||  state.windowType=="" ) { return false; }
                        closeFormAll();
                        document.querySelector(".popup_calc_end").style.display = "block";
                        document.body.style.overflow = "hidden";
                        break;
               }


            });

           
              
        });
    };


    function closeFormAll(){
        const forms = document.querySelectorAll("body > div[class^='popup']");
       
        forms.forEach(form => {
            form.style.display = "none";
        });
       
        document.body.style.overflow = "";
    };


    function closeFormCalck(){
        const close = document.querySelectorAll(".popup_calc_profile_close strong, .popup_calc_end_close strong");
        close.forEach(c => {
            c.addEventListener("click", e => {
                closeFormAll();
            });
        });
    };

    closeFormCalck();


    poverkaFormCalck();
    
    noSimvol("#width");
    noSimvol("#height");

    function activSetState(){
        SetState(state, ".balcon_icons_img", "click", "windowVids");
    SetState(state, "#width", "input", "windowWidth");
    SetState(state, "#height", "input", "windowheight");
    SetState(state, "#view_type", "input", "windowType");
   SetState(state, ".popup_calc_profile_content label", "click", "windowT");

    };

    



    function forms(){ // формы отправки данных
        const form = document.querySelectorAll("form"),
            inputs = document.querySelectorAll("input");
            

            noSimvol('input[name="user_phone"]');

        const messag = {
            loading: 'загрузка данных...',
            success: 'Спасибо. Скора мы с вами свяжимся.',
            error: 'ошибка, попробуйте снова'
        };

        const postData = async (url, data) => { //async - указывает что дальше есть асинхроная операция которую нужно подождать
            document.querySelector(".status").textContent = messag.loading;

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
        };


        form.forEach(item => {
            item.addEventListener('submit' ,  e => {
                e.preventDefault();


                let statusMessag = document.createElement("div");
                statusMessag.classList.add("status");
                item.appendChild(statusMessag);

                const formData = new FormData (item);
              if (  item.getAttribute("data-atr") == 'end') {
                  for (let key in state){
                      formData.append(key, state[key]);
                  }
              }




                postData('assets/server.php', formData)  //получили промес
                    .then(res => {                  // успешный ответ от серверв
                        console.log(res);
                        statusMessag.textContent = messag.success;
                    })
                    .catch ( () => { //ошибка при отправке запроса на сервер
                        statusMessag.textContent = messag.error;
                    })
                    .finally (() => { //выполниться в любом случае еспех или ошибка. 
                        clearInput();
                        setTimeout(() => {
                            statusMessag.remove();
                        }, 3000);
                    });  


            });
        });



    }

    forms();




//таймер

     function raschetTime(timeFinesh){
        let d  = Date.parse(timeFinesh) - Date.parse(new Date());
        if (d < 0) { d=0; }
        const
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

 
    showTim(".timer1", "2021-09-31");


workImgs = document.querySelectorAll('.works a');
windowImg = document.createElement("div");
windowImg.classList.add('popup');
windowImg.classList.add('popupImg');
document.body.append(windowImg);

workImgs.forEach(img => {
    img.addEventListener('click', e => {
        windowImg.innerHTML = `
        
       
            ${img.innerHTML}
        
       
        `;
        
        
        
        ;
        
    });
});





sowpPopupModal(".works a", ".popupImg", ".popup strong");







});//загрузка страницы