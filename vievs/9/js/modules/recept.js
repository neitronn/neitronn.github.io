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