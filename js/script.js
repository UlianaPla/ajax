'use strict';

const inputRub = document.querySelector('#rub'),
inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json'); // не открывает соединение между фронтендом и бекендом, а собирает настройки
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    // Свойства:
    // status       404, 500, 503, 0 ,200, 403...
    // statusText   OK, Accepted...
    // response 
    // readyState (0-unsent, 1-opened, 2-headers_received, 3-loading, 4-done)

    // События:
    // readystatechange - отслеживает изменение статуса запроса (при каждом изменении свойства readyState)
    // load - когда запрос полностью загрузился и мы получили какой-то результат (не обязательно успешный)
    
    //request.addEventListener('readystatechange', () => {
    request.addEventListener('load', () => {
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = "Что-то пошло не так";
        }
    });
});