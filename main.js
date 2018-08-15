var btn = document.querySelector("button");
var price = document.querySelector("#price-text");
var currency_symbol  = document.querySelector("#currency-symbol");

window.onload = function(){
    var XHR = getXHRRequest();
    XHR.send();
};

btn.addEventListener("click",function(){
    var XHR = getXHRRequest();
    XHR.send();
});

setInterval(function(){
    var XHR = getXHRRequest();
    XHR.send(); 
},30000);

function getXHRRequest(){
    var XHR = new XMLHttpRequest();
    XHR.open("GET","https://api.coindesk.com/v1/bpi/currentprice.json");
    var radioBtns = document.querySelectorAll("input");
    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 && XHR.status == 200){
            var parsedData = JSON.parse(XHR.responseText);
            for(i=0 ; i< radioBtns.length ; i++){
                if(radioBtns[i].checked == true){
                    var selected_currency = radioBtns[i].attributes.value.value;
                    break;
                }
            }           
            switch (selected_currency){
                case "usd":
                    price.innerHTML = parseFloat(parsedData.bpi.USD.rate_float).toFixed(2);
                    currency_symbol.innerHTML = parsedData.bpi.USD.symbol;
                    break;
                case "eur":
                    price.innerHTML = parseFloat(parsedData.bpi.EUR.rate_float).toFixed(2);
                    currency_symbol.innerHTML = parsedData.bpi.EUR.symbol;
                    break;
                case "gbp":
                    price.innerHTML = parseFloat(parsedData.bpi.GBP.rate_float).toFixed(2);
                    currency_symbol.innerHTML = parsedData.bpi.GBP.symbol;
                    break;
            }
        }
    }
    return XHR;
}