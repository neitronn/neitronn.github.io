window.addEventListener('DOMContentLoaded', () => { 
    class Slider{
        constructor(page,btns,activclass=0,hide=0){
            this.page = document.querySelector(page);
            const slide =Array.from( this.page.children);
            this.slide = [];
            slide.forEach(e=>{
                if (e.tagName != "BUTTON") {  this.slide.push(e);}
            });
            this.activclass = activclass;
            this.btns = document.querySelectorAll(btns);
            this.activ = 1;
            try{
                this.baner = document.querySelector(".hanson");
            this.baner.style.opacity = "0";
            }catch(e){

            }
            
            this.hide = hide;
        }


        
        showSlider(n){
           
            this.activ += n;
            if (this.activ <= 0) this.activ = this.slide.length;
            if (this.activ > this.slide.length) this.activ =1;
            
            if (this.hide===0){
                this.slide.forEach( e => {
                    e.style.display = "none";
                });
    
                this.slide[this.activ-1].style.display = "block";
            
            }

            if(this.activclass){
                this.slide.forEach( e => {
                    e.classList.remove(this.activclass);
                });
                this.slide[this.activ-1].classList.add(this.activclass);
            }
            
        }

       

        


    } //конец класса


    class SliderMain extends Slider{

        

        showBaner(){
            if (this.activ === 3){
                this.baner.classList.add("animated");
                 setTimeout(()=>{
                    this.baner.style.opacity =1;
                    this.baner.classList.add("fadeInUp");
                    
                }, 3000)
            } else  { 
                this.baner.style.opacity = "0";
                this.baner.classList.remove("fadeInUp");
                
                
            }
        }

        

        rander(){
            this.btns.forEach(e => {
                e.addEventListener("click", (element) =>{
                    let z=1;
                    if(e.classList.contains('prev')) {  z=-1; } 
                    this.showSlider(z);
                    try{
                        this.showBaner();
                    }catch(e){

                    }
                    
                });
            });

            document.querySelectorAll(".sidecontrol>a").forEach(e => {
                e.addEventListener("click", () => {
                    this.activ = 1;
                    this.showSlider(0);
                });
            });   
        }

    }


    try{
        const slider = new SliderMain(".page",".page .next");
         slider.rander();
    }catch(e){

    }

    try{
        const slider_mod = new SliderMain(".moduleapp",".moduleapp .next, .moduleapp .prev");
    slider_mod.rander();
    }catch(e){

    }
    
    



    class SliderSecondary extends Slider{
        rander(){
            this.page.style.cssText = `
            display : flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
           
            this.btns[1].addEventListener("click", () => {
                this.page.appendChild(this.slide[this.activ-1]);
                this.showSlider(1);
            });
            
            this.btns[0].addEventListener("click", () => {
                const lol = this.slide[this.activ-1];
                this.showSlider(-1);
                this.page.insertBefore(this.slide[this.activ-1], lol);
            });
            


        }
    }

    try{
        const sleder2 = new SliderSecondary(".showup__content-slider", ".showup__prev, .showup__next",0,1);
    sleder2.rander();

    const sleder3 = new SliderSecondary(".modules__content-slider", ".modules__info-btns .slick-prev, .modules__info-btns .slick-next",0,1);
    sleder3.rander();

    const sleder4 = new SliderSecondary(".feed__slider", ".feed__slider .slick-prev, .feed__slider .slick-next","feed__item-active",1);
    sleder4.rander();

    }catch(e){

    }
    
    

    



    class Differences{
        constructor(mainClass, addClass){
            this.main = document.querySelector(mainClass);
           
            this.cards = [];
            Array.from( this.main.children).forEach((item, i, arr) => {
                if (i != 0 && i != arr.length -1) {
                    this.cards.push(item);
                    item.style.display = "none";
                }else if (i == arr.length -1) {
                    this.last = item;
                }

                
            });
            this.counter = 0;
            this.add = this.main.querySelector(addClass);
        }



        init(){
            this.add.addEventListener("click", () => {
                if (this.counter < this.cards.length-1) {
                    this.cards[this.counter].style.display = "flex";
                    this.counter++;
                }else{
                    this.cards[this.counter].style.display = "flex";
                    this.last.remove();
                }
            });
        }

    };

    try{
        new Differences(".officerold", ".plus").init();
    new Differences(".officernew", ".plus").init();
    }catch(e){

    }
    




class Form{
    constructor(form, url = 'assets/question.php'){
        this.form = document.querySelectorAll(form);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасиб! Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };
        this.path = url;
        this.inputs = document.querySelectorAll("input");
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }


    clearInput(){
        this.inputs.forEach(input => {
            input.value = "";
        });
    }

    init(){

        this.form.forEach(item => {
            item.addEventListener("submit", (e) => {
                e.preventDefault();


                let statusMessage = document.createElement('div');
            statusMessage.style.cssText = `
                margit-top: 15px;
                font-size: 18px;
                color: grey;
            `;
            item.parentNode.appendChild(statusMessage);

            statusMessage.textContent = this.message.loading;

            const formData = new FormData(item);

            this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = this.message.success;
                })
                .catch(() => {
                    statusMessage.textContent = this.message.failure;
                })
                .finally(() => {
                    this.clearInput();
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                });



        });
        

            

        });
    }


}


new Form(".form").init();






    class Player{
        constructor(btn,overlay, conteiner){
            this.btn = document.querySelectorAll(btn);
            this.overlay = document.querySelector(overlay);

        }


        init(){
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.btn.forEach(e=>{
                e.addEventListener("click", () => {
                   
                    if (typeof( this.player) === 'undefined')  {   this.creatPlayer(e.getAttribute("data-url")); } else { 
                       
                       if (this.player.videoId != e.getAttribute("data-url")) this.player.loadVideoById(e.getAttribute("data-url")); 
                        
                    }
                    this.overlay.style.display = "flex";
                });
            });
            this.btnClose();
            
        }

        btnClose(){
            this.overlay.querySelector(".close").addEventListener("click", () => {
                this.player.stopVideo();
                this.overlay.style.display = "none";
                
            });
        }

        creatPlayer(url){
           
      
       this.player = new YT.Player('frame', {
          height: '360',
          width: '640',
          videoId: url,
        });
      
     
        }




    }

    const player = new Player(".play", ".overlay", "#frame");
    player.init();



class Okordion {
    constructor(classbtn){
        this.btns = document.querySelectorAll(classbtn);

    }

    init(){
        this.btns.forEach(btn => {
            btn.addEventListener("click", e => {
                let sosed = btn.parentNode.previousElementSibling;
               if (sosed.style.display == "none") sosed.style.display = "block"; else sosed.style.display = "none";
            });
        });
    }
}

new Okordion(".module__info-show .plus").init();



class Dowholod{
    constructor(classDowholod){
        this.dow  = document.querySelectorAll(classDowholod);
    }

    init(silka = "assets/img/feed_1.png"){
        this.dow.forEach(item => {
            item.addEventListener("click", () => {
                
                const a = document.createElement("a");
                a.setAttribute('href', silka);
                a.setAttribute('download', '');
                a.click();
                a.remove();
            });
        });
    }


}

new Dowholod(".module__info-book .download").init();




});