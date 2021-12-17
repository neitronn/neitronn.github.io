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