document.addEventListener('contextmenu', event => event.preventDefault());


const fromCurrencyDropDownList = document.getElementById('fromCurrencyDropDownList');
const toCurrencyDropDownList = document.getElementById('toCurrencyDropDownList');

const moneyAmount = document.getElementById('amount');
moneyAmount.focus();
const resultField = document.getElementById('result');


const swapCurrency = document.getElementById('swapButton');

moneyAmount.addEventListener('input', convert);
fromCurrencyDropDownList.addEventListener('change', convert);
toCurrencyDropDownList.addEventListener('change', convert);

swapCurrency.addEventListener('click', () => {
    [fromCurrencyDropDownList.value, toCurrencyDropDownList.value] = [toCurrencyDropDownList.value, fromCurrencyDropDownList.value];
    console.log('SWAPPED');
    convert();
});

async function convert() {
    var ifConnected = window.navigator.onLine;
    if (!ifConnected) {
        alert('No internet connection!');
        window.close();
    }
    const fromCurrency = fromCurrencyDropDownList.value;
    const toCurrency = toCurrencyDropDownList.value;
    
    valueToExchange = moneyAmount.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(res => res.json())
        .then(res => {
            const rate = res.rates[toCurrency.toUpperCase()];
            resultField.value = (valueToExchange * rate).toFixed(2);
        })
};

//Max 2 nums after dot
moneyAmount.addEventListener("keyup", function(){
    moneyAmount.value = moneyAmount.value.replace(/(\.\d{2})\d+/g, '$1');
});

function onKeyPress(evt){
    evt = (evt) ? evt : (window.event) ? event : null;
    if (evt)
    {
        var charCode = (evt.charCode) ? evt.charCode :((evt.keyCode) ? evt.keyCode :((evt.which) ? evt.which : 0));
        if (charCode == 43) 
            return false;
        if (charCode == 45) 
            return false;
        if (moneyAmount.value.length > 14){
            return false;
        }
    }
}

$(document).ready(function() {
    $( ".swapButton").click( function() {
        $("#swapButton").toggleClass('flip');
    });
});

convert();