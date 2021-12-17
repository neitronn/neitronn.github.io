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