window.addEventListener('DOMContentLoaded', () => {

    function upWorks(){
        const btn = document.querySelector(".up"),
        img_bg = document.querySelector(".bg_img"),
        podloshka = document.querySelector(".podloshka");


        btn.addEventListener("click", e => {
            if(btn.classList.contains('rotate')) {
                btn.classList.remove('rotate');
                img_bg.classList.remove('toraise');
               
                podloshka.classList.remove('podloshka_up');
               
            }else{
                btn.classList.add('rotate');
                img_bg.classList.add('toraise');
               
                podloshka.classList.add('podloshka_up');
              
            }

          
        })


    }

    upWorks();



    function slaider(){
        const btnL = document.querySelector(".works .navigation .left"),
        btnR = document.querySelector(".works .navigation .right"),
        nav = document.querySelector(".works .navigation .slaids"),
        head = document.querySelector('.main .header'),
        headA = head.querySelector("a"),
        headImg = head.querySelector("img"),
        slaids2 = document.querySelectorAll(".works .navigation .slaids a"),
        stekIcons = document.querySelectorAll(".stek_icons img");
        let slaids = document.querySelectorAll(".works .navigation .slaids a"),
        activ = 5;



       function movement(k){

            if (k>0) {
                for(let i=0; i<k; i++) {
                    
                    slaids[i].remove();
                    nav.append( slaids[i]);
                }
                

            }else{
                const t = Math.abs(k);
                for(let i=0; i<t; i++) {
                    
                    slaids[slaids.length -i -1].remove();
                    nav.prepend( slaids[slaids.length  -i-1]);
                }
               
            }

            activ += k;
            
           
            

            if (activ > slaids.length) { activ = activ - slaids.length; }
            if (activ <= 0) { activ = slaids.length + activ; }


            
            
         const src =   slaids2[activ-1].querySelector("img").getAttribute('src');
         headImg.src = src;
         
         ShowStek(slaids2[activ-1]);

         let trimSrc = src.substr(4, src.length - 8);

         if (trimSrc == "6") {
            headA.href = "#";
         } else {
            headA.href = "vievs/" + trimSrc + "/index.html";
         }
         

         

         slaids = nav.querySelectorAll("a");
        

        }


        btnR.addEventListener("click", e => {
            movement(1);
        });

        btnL.addEventListener("click", e => {
            movement(-1);
        });

        slaids.forEach((item, i) => {
            item.addEventListener("click", e => {
                e.preventDefault();
                movement(determinePosition(activ, i+1));
               
            });
        });


       function determinePosition(a,t){
        let r = a-t;
            if (Math.abs(r) <= 2) {
                
                return -r;
            } else {
                if (a < t) {
                    
                    return t - slaids.length -a;
                }else{
                 
                    return slaids.length - a + t;
                }
            }
       }


       function ShowStek(e){

        stekIcons.forEach(item => {
            item.style.display = "none";
        });

           e.dataset.stek.split(" ").forEach(item => {
            stekIcons[+item-1].style.display = "";
           });
       }

movement(0);
    }

slaider();



})