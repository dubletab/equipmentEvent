"use strict";

let mapTimer = new Map;


fetch('./static/json/message.js')
    .then(response => response.json())
    .then(json => {
            for(let event of json['data']){
                
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
        
        console.log(json)});

document.addEventListener('click', (event) =>{

    let elem = event.target.closest('.btn');
                if(!elem) return;
                elem.classList.toggle('active');
                mapTimer.set(elem.id, moment());
                elem.lastElementChild.classList.toggle('activeTimer');
});



    setInterval(() => {
        let clock = document.querySelector('.timer');
        let clockDate = document.querySelector('.timerDate');
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