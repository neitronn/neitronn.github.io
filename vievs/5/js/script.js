document.addEventListener("DOMContentLoaded", () => {

    const otstyp = removPX( getComputedStyle(document.querySelector(".otstyp")).marginTop), //высота отступа от меню
        menu = document.querySelector(".menu"); 


    window.addEventListener("scroll", e => {  //во время скрола добовляет/удаляет фоновый цвет меню
        
       if (window.pageYOffset >= otstyp) {
        
        menu.classList.add("bg");
       }else{
        menu.classList.remove("bg");
       }
    });


    function removPX(a){ //отбрасывает 2 символа в строке и приводит к числовоому типу
        return Number(a.slice(0,a.length -2));
    }




    //карусель

    function karusel(clasMain, objImg, visibleSlaids, activSlaid, widthdiv){  // 1- класс окна карусели, 2- обьект (id - src), 3 - количество видимых картинок, 4 - активная картинка, 5 - ширина обертки img
        const main = document.querySelector(clasMain), // получаем карусель из HTML
              k = Math.floor(visibleSlaids/2);  // сколько будем отрисовывать фоток за приделами
        let a=[],  i=0 ,b=[], j, zdvig=0;

        if (k ==0) { k=1; }

        for (var key in objImg) { //саздаем масивы а с картинками обернытые в div  data-value содержит ключи, масив b - не клон а такойже масив толь с атребутом data-clone
            a[i] = document.createElement("div");
            a[i].dataset.value = key;
            a[i].dataset.index = i;
            a[i].style.width = widthdiv;
            a[i].innerHTML = `<img src="${objImg[key][2]}">`;
            
           
            
            b[i] = document.createElement("div");
            b[i].dataset.value = key;
            b[i].dataset.index = i;
            b[i].style.width = widthdiv;
            b[i].dataset.clone = "";
            b[i].innerHTML = `<img src="${objImg[key][2]}">`;
            i++   
          }    

         
          i= activSlaid - k - k; // определяем начальную фотку (за кадром)
          j = activSlaid+k+k; // определяем конечную фотку (за кадром)


          const classlaids = "slaids",
          div = document.createElement("div"); //создаем контейнер со слайдами
          div.classList.add(classlaids);
          div.style.width =  ((j-i+1)* removPX(widthdiv)) + "px";
          div.style.left =  (-(k* removPX(widthdiv))) + "px";
          main.style.width =  (visibleSlaids* removPX(widthdiv)) + "px";
          main.prepend(div);   

         for (;i<=j;i++) //цикл для создания всей ленты
         {
           
            if (i<0){   
                 
                div.append(b[a.length+i]);
               
               
            }else{
                if(i>=a.length){
                   
                    div.append(b[i-a.length]  );
                }else {
                    if (i == activSlaid) { a[i].querySelector("img").classList.add("activeslaid");   titleAlco(server,a[i].getAttribute("data-value")); }
                    div.append(a[i]);
                }
                
            }
         }


         let listener = function (e) {
            if (e.target && e.target.tagName == "IMG") {
             
                if (e.target.parentElement.getAttribute("data-index") != activSlaid) {
                    titleAlco(server,e.target.parentElement.getAttribute("data-value"));
                    main.removeEventListener('click', listener,false);
                   dvishenie(e.target.parentElement.getAttribute("data-index"), e.target);
                   
   
   
   
                   }
                
               }
          }
        
         main.addEventListener('click', listener,false);


         function dvishenie(activ, target){
            const imgslaid = main.querySelectorAll("div img");
           let m= activSlaid - activ;
           
         

            if (Math.abs(m) > k ) { if(m<0) { m= m + a.length;}else{ m= (m - a.length)  }   }

            zdvig =  (m)*removPX(widthdiv);
            
          
            imgslaid.forEach(item=> {
               if(target != item) { item.classList.remove("activeslaid");  } else { item.classList.add("activeslaid"); }
            });


           div.classList.add("slidtransition");
           div.style.transform = `translateX(${zdvig}px)`;

           
            
           setTimeout( chistka, 700,target,imgslaid);
           
         }



         function chistka(t,arrImg){
            main.addEventListener('click', listener,false);
             div.classList.remove("slidtransition");
            div.style.transform = "translateX(0px)";
             let y,i,j;
            for (i=0; i < arrImg.length; i++) {
               if (arrImg[i] == t) {
                y=i;
               }
            }

            for (i=0; i < arrImg.length; i++) {
                arrImg[i].parentElement.classList.remove("remove");
                if ((i < y-k) || (i > y+k)) {
                 arrImg[i].parentElement.dataset.clone = "1";
                }else{
                    
                    arrImg[i].parentElement.dataset.clone = "2";
                }

                if ((i < y-k-k) || (i > y+k+k)) {
                    arrImg[i].parentElement.classList.add("remove");
                }


             }


             t.classList.add("activeslaid");
                activSlaid = t.parentElement.getAttribute("data-index");
                
                

            y=0;
             for (i=Math.floor(arrImg.length/2); i < arrImg.length; i++) {
               if( arrImg[i].parentElement.classList.contains('remove')) { y=y+1; }
             }
             
             if (y) {
                for (i=0; i <y; i++) {
                    j = +div.querySelector("div").dataset.index;
                   j = j-1;
                   if (j == -1) { j=a.length -1; }
                   
                    if (proverka(b[j],arrImg)) {
                        div.prepend(a[j]);

                    }else{
                        div.prepend(b[j]);
                       
                    }
                   
                   
                }
             }


             y=0;
             for (i=0; i < Math.floor(arrImg.length/2); i++) {
                if( arrImg[i].parentElement.classList.contains('remove')) { y=y+1; }
              }


              if (y) {
                for (i=0; i <y; i++) {
                    j = +div.querySelector("div:last-child").dataset.index;
                   
                   j = j+1;
                   if (j == a.length) { j=0; }
                   
                    if (proverka(b[j],arrImg)) {
                        div.append(a[j]);

                    }else{
                        div.append(b[j]);
                       
                    }
                   
                   
                }
             }










            for (i=0; i < arrImg.length; i++) {
                if( arrImg[i].parentElement.classList.contains('remove')) { arrImg[i].parentElement.remove();  }
             }


            
            
         }

         function proverka(d,arrImg){
             let v=0;
             
             arrImg.forEach(item => {
                if (item.parentElement == d) { v=1; }
                
             })
             
            
             return v;

         }
             

    } //конец функции инициализации karusel




 // функция вызова описания (вызыв будет в карусели)

    function titleAlco(objOpisani, activ){
        let ret=["",""], vivod, kyda;
        for (let key in objOpisani){
            if (key == activ) { ret = objOpisani[key]; }
        }
       // vivod = document.createElement("div");
        vivod = `
        <div class='titlealcogol'>
        <h4>${ret[0]}</h4>
        <p>${ret[1]}</p>
        </div>
        `;
        kyda = document.querySelector(".karusel");
        if ( document.querySelector(".titlealcogol") ) {  document.querySelector(".titlealcogol").remove(); }
        kyda.insertAdjacentHTML("afterEnd", vivod);



        let opa =0;
        let time = setInterval(frame, 7);
    function frame() {
        const tit = document.querySelector(".titlealcogol");
        
       
        if (opa >= 1) {
          clearInterval(time);
         
        } else {
            opa += 0.01;
            tit.style.opacity = opa;
           
        }
        
    }
   
}
 //конец функции описания.



const server = {
        101 : ['Водка "Finlandia"' , "Finlandia — водка, изготовляемая в Финляндии из шестирядного ячменя и талой ледниковой воды. Ячменную брагу для водки перегоняют в ректификат, используя систему непрерывной ректификации на спиртзаводе в селе Коскенкорва под управлением финской корпорации Altia.", "img/1.png"],
        102 : ['2Водка "Finlandia"' , "2Finlandia — водка, изготовляемая в Финляндии из шестирядного ячменя и талой ледниковой воды. Ячменную брагу для водки перегоняют в ректификат, используя систему непрерывной ректификации на спиртзаводе в селе Коскенкорва под управлением финской корпорации Altia.", "img/2.png"],
        103 : ['3Водка "Finlandia"' , "3Finlandia — водка, изготовляемая в Финляндии из шестирядного ячменя и талой ледниковой воды. Ячменную брагу для водки перегоняют в ректификат, используя систему непрерывной ректификации на спиртзаводе в селе Коскенкорва под управлением финской корпорации Altia.", "img/3.png"],
        104 : ['4Водка "Finlandia"' , "4Finlandia — водка, изготовляемая в Финляндии из шестирядного ячменя и талой ледниковой воды. Ячменную брагу для водки перегоняют в ректификат, используя систему непрерывной ректификации на спиртзаводе в селе Коскенкорва под управлением финской корпорации Altia.", "img/4.png"],
        105 : ['5Водка "Finlandia"' , "5Finlandia — водка, изготовляемая в Финляндии из шестирядного ячменя и талой ледниковой воды. Ячменную брагу для водки перегоняют в ректификат, используя систему непрерывной ректификации на спиртзаводе в селе Коскенкорва под управлением финской корпорации Altia.", "img/5.png"],
        106 : ['6Водка "Finlandia"' , "6Finlandia — водка, изготовляемая в Финляндии из шестирядного ячменя и талой ледниковой воды. Ячменную брагу для водки перегоняют в ректификат, используя систему непрерывной ректификации на спиртзаводе в селе Коскенкорва под управлением финской корпорации Altia.", "img/6.png"],
    };

   
  // karusel(".karusel", server, 5, 0, "250px");  

    let w=0;

    function showReceptiWidth(){
        if (document.body.clientWidth < 400 && w !=1 ){
            w =1;
            document.querySelector(".karusel").innerHTML ="";
            karusel(".karusel", server, 3, 0, "100px");  
            
        } else if  (document.body.clientWidth < 450 && document.body.clientWidth>=400 && w !=2 ){
            w =2;
            document.querySelector(".karusel").innerHTML ="";
            karusel(".karusel", server, 3, 0, "130px");  
            
        } else if  (document.body.clientWidth < 650 && document.body.clientWidth>=450 && w !=3 ){
            w =3;
            document.querySelector(".karusel").innerHTML ="";
            karusel(".karusel", server, 3, 0, "150px");  
            
        } else if  (document.body.clientWidth < 750 && document.body.clientWidth>=650 && w !=4 ){
            w =4;
            document.querySelector(".karusel").innerHTML ="";
            karusel(".karusel", server, 5, 0, "130px");  
            
        } else if  (document.body.clientWidth < 1000 && document.body.clientWidth>=750 && w !=5 ){
            w =5;
            document.querySelector(".karusel").innerHTML ="";
            karusel(".karusel", server, 5, 0, "150px");  
           
        } else if  (document.body.clientWidth >= 1000 && w !=6 ){
            w =6;
            document.querySelector(".karusel").innerHTML ="";
            karusel(".karusel", server, 5, 0, "200px");  
           
        } 
    }

    showReceptiWidth();

   window.addEventListener(`resize`, event => {
    showReceptiWidth();
    
  });


const server2 = [
   { id: 1,
    name: "Голубая лагуна",
    title: "Это сладкий освежающий лонг на водке с добавлением ликёра блю кюрасао, который придаёт коктейлю нежный голубой оттенок.",
    ingrids: ['Водка "Finlandia"', 'Ликер блю кюрасао', 'Спрайт', 'Ананас', 'Лед'],
    rec: ["Наполни харрикейн кубиками льда доверху", "Налей ликер блю кюрасао 20 мл и водку 50 мл", "Долей спрайт доверху и аккуратно размешай коктейльной ложкой", "Укрась долькой ананаса"],
    img1: "img/с1.png",
    img2: "img/с1.png"
   },
   { id: 2,
    name: "Голубая лагуна2",
    title: "2Это сладкий освежающий лонг на водке с добавлением ликёра блю кюрасао, который придаёт коктейлю нежный голубой оттенок.",
    ingrids: ['Водка "Finlandia"', 'Ликер блю кюрасао', 'Спрайт', 'Ананас', 'Лед'],
    rec: ["Наполни харрикейн кубиками льда доверху", "Налей ликер блю кюрасао 20 мл и водку 50 мл", "Долей спрайт доверху и аккуратно размешай коктейльной ложкой", "Укрась долькой ананаса"],
    img1: "img/с1.png",
    img2: "img/с1.png"
   },
   { id: 3,
    name: "3Голубая лагуна",
    title: "3Это сладкий освежающий лонг на водке с добавлением ликёра блю кюрасао, который придаёт коктейлю нежный голубой оттенок.",
    ingrids: ['Водка "Finlandia"', 'Ликер блю кюрасао', 'Спрайт', 'Ананас', 'Лед'],
    rec: ["Наполни харрикейн кубиками льда доверху", "Налей ликер блю кюрасао 20 мл и водку 50 мл", "Долей спрайт доверху и аккуратно размешай коктейльной ложкой", "Укрась долькой ананаса"],
    img1: "img/с1.png",
    img2: "img/с1.png"
   }

];



 // рецепты  
    
    class Recepti{
        constructor(id,name,title,ingrids,rec,img1,img2, kyda){
            this.id = id;
            this.name = name;
            this.title = title;
            this.ingrids="";

            let action = [];

            ingrids.forEach(item => {
                this.ingrids += "<li>" + item + "</li>"; 
            });
            this.rec="";
            rec.forEach(item => {
                this.rec += "<li>" + item + "</li>"; 
            });

            this.img1 = img1;
            this.img2 = img2;
            this.kyda = kyda;
            this. div = document.createElement("div");
        }

        vivodRecepta(){
            
           
           this.div.classList.add("row");
           this.div.innerHTML = `
            
            <div class="column-3 leftimg">
                <img src="${this.img1}" >
            </div>
  
            <div class="column-6 left">
                <div class="content">
               <h5 class="podz">${this.name}</h5>
                <p>${this.title}</p>
                <p class="podz">Ингридиенты:</p>
                <ul>
                    ${this.ingrids}
                </ul>
                <p class="podz">Рецепт:</p>
                <ul>
                  ${this.rec}
              </ul>
                </div>
            </div>
  
            <div class="column-3 rigimg">
              <img src="${this.img2}">
            </div>
            `;

            this.kyda.append(this.div);
            
          
        }

        actionAnimation(x,ms){
            this.div.style.opacity = 1;
            switch(x){
                case 1:
                    this.animSliders(ms);
                    break;
                case 2:
                    this.spaceInUp(ms);
                    break;
                default:
                this.wanish(ms);
            }

        }

        wanish(ms){
            
           
            this.div.querySelector(".column-6").classList.add("animavanishIn");
            ms = ms/2;
            this.div.querySelector(".column-6").style.cssText = `animation-duration: ${ms}ms;`;
            const img = this.div.querySelectorAll(".column-3");
            img.forEach(e => {
                e.style.opacity = 0;
                setTimeout( () =>{
                    e.classList.add("animaswap");
                    e.style.cssText = `animation-duration: ${ms}ms;`;
                }, ms/1.5 );
            });

        }


        animSliders(ms){
            let elem = this.div.querySelectorAll("h5, p, ul, img");
            elem.forEach(e => {
                e.style.opacity = 0;
            });
            ms = ms/5;
           
           elem =  this.div.querySelector("h5");
           elem.classList.add("animaslideLeftReturn");
            
            elem.style.cssText = `animation-duration: ${ms}ms;`;
            
            elem =  this.div.querySelector("p");
            elem.classList.add("animaslideRightReturn");
            elem.style.cssText = `animation-duration: ${ms}ms;`;

            elem =  this.div.querySelectorAll("p.podz");
            setTimeout( () => {    
                elem.forEach(e =>{
                    e.classList.add("animaslideRightReturn");
                   e.style.cssText = `animation-duration: ${ms}ms;`;

                });


                        elem =  this.div.querySelectorAll("ul");
                    setTimeout( () => {    
                        elem.forEach(e =>{
                            e.classList.add("animaslideLeftReturn");
                            e.style.cssText = `animation-duration: ${ms}ms;`;
                
                        });

                                elem =  this.div.querySelectorAll("img");
                                setTimeout( () => {    
                                    elem.forEach(e =>{
                                        e.classList.add("animafoolishIn");
                                        e.style.cssText = `animation-duration: ${ms}ms;`;
                            
                                    });

                                     }, ms );

                            }, ms/1.7 );


                    }, ms );

            


        }


        spaceInUp(ms){
            this.div.classList.add("animaspaceInUp");
            this.div.style.cssText = `animation-duration: ${ms/2}ms;`;
        }




    } //конец класса


 // конец рецептов
   
 
 const divReceptov = document.querySelector(".recepti");
    let e=0;
    let ob = [];
    let centr = [];
   server2.forEach(item => {
    
    ob[e] = new Recepti(item.id,item.name,item.title,item.ingrids,item.rec,item.img1,item.img2,divReceptov);
    ob[e].div.style.opacity =0;
    ob[e].vivodRecepta();
    centr[e] = (ob[e].div.getBoundingClientRect().top + ob[e].div.getBoundingClientRect().bottom + pageYOffset*2)/2;
    e++;
   });

   
   ob.forEach((o,i) => {

    let listenerScroll = [];
    listenerScroll[i] = function (e){
   const p = window.screen.height + pageYOffset;
    if ((pageYOffset < centr[i]) && (p > centr[i]))
        {
            o.actionAnimation(i,3400);
            window.removeEventListener('scroll', listenerScroll[i]);
        }
    
    
   }
  
   
   window.addEventListener("scroll", listenerScroll[i]);


   });
   
   
   


}); // конец 