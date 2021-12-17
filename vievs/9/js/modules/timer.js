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