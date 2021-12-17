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