"use strict";

let mapTimer = new Map;

let clock;
let clockDate;
let canEdit;

ajaxCall();

setInterval(ajaxCall, 10000);



document.addEventListener('click', (event) =>{
    if(!canEdit) return;
    let elem = event.target.closest('.btn');
    // test
    if(!elem) return;
    $.ajax({
        type: "POST",
        url: window.location,
        dataType: 'json',
        data: {type: 'clickButton', idButton: elem.id},
        success: function(msg){
            
            if (msg['result'] == true){
                if(!elem) return;
                elem.classList.toggle('active');
                mapTimer.set(elem.id, moment());
                elem.lastElementChild.classList.toggle('activeTimer');
            }
        }
    });

})

function ajaxCall() {
    $.ajax({
        type: "POST",
        url: window.location,
        dataType: 'json',
        data: {type: 'getData'},
        success: function(msg){

            clock = document.querySelector('.timer');
            clockDate = document.querySelector('.timerDate');
            if (msg['data'].length > 0) {
                
                canEdit = msg['canEdit'];
                for(let event of msg['data']){
                    
                    let blockEvent = document.getElementById(event.id);
                    
                    if(event.pressed) {
                        blockEvent.classList.add('active');
                        blockEvent.lastElementChild.classList.add('activeTimer');
                        let timer = moment(event.latest_start_time, "DD.MM.YYYY HH:mm:ss");
                        mapTimer.set(event.id, timer);
                    }
                    else{
                        blockEvent.classList.remove('active');
                        blockEvent.lastElementChild.classList.remove('activeTimer');
                        let timer = moment(event.latest_start_time, "DD.MM.YYYY HH:mm:ss");
                        mapTimer.set(event.id, timer);
                    }

                }
            
            }
        }
    });
    
}





    setInterval(() => {

        try {
            let dateNow = new Date();
            clock.innerHTML = getDoubleCharacters(dateNow.getHours()) 
            + ':' + getDoubleCharacters(dateNow.getMinutes()) 
            + ':' + getDoubleCharacters(dateNow.getSeconds());
            clockDate.innerHTML = getDoubleCharacters(dateNow.getDate()) 
            + '.' + getDoubleCharacters(dateNow.getMonth() + 1) 
            + '.' + getDoubleCharacters(dateNow.getFullYear());
        } catch(error){
            null;
        }
    }, 1000);



setInterval(() => {
    mapTimer.forEach((value, key) => {
        let now = moment();
        let d = (now.diff(value, 'days'));
        let h = (now.diff(value, 'hours')%24);
        let m = (now.diff(value, 'minutes')%60);
        let s = (now.diff(value, 'seconds')%60);
        document.getElementById(key).lastElementChild.innerHTML = getDoubleCharacters(d) 
        + 'д ' + getDoubleCharacters(h) 
        + ":" + getDoubleCharacters(m)
        + ":" + getDoubleCharacters(s);

    });
}, 1000);



function getDoubleCharacters(mean) {
    if(mean < 10) return '0' + mean;
    else return mean;
} 