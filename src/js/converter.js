// Shorthand for $( document ).ready()
$(function() {
    $('#form').on('submit', function(e) {
        e.preventDefault();

        var amount = $('#amount').val();
        var convertFrom = $('#convertFrom').val();
        var convertTo = $('#convertTo').val();
        console.log(amount);
        console.log(convertTo);
        console.log(convertFrom);

        convertCurrency(amount, convertFrom, convertTo);
    });

    function convertCurrency(amount, from, to) {
        var amount = amount;
        var baseCurrency = from;
        var convertedCurrency = to;
        var XMLHttpRequestObject;
        var query = baseCurrency + '_' + convertedCurrency;
        var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' +
            query + '&compact=ultra';

        if (window.XMLHttpRequest) {
            XMLHttpRequestObject = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
        }

        XMLHttpRequestObject.onreadystatechange = function() {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
                var exchangeResponseJSON = JSON.parse(XMLHttpRequestObject.responseText);
                var exchangeRate = exchangeResponseJSON[query];
                console.log(exchangeRate);
                // Call the calculator function
                calculateConversion(amount, exchangeRate);
            }
        }

        XMLHttpRequestObject.open('GET', url);
        XMLHttpRequestObject.send(null);

    }

    function calculateConversion(amount, rate) {
        var rate = Math.ceil(rate);
        var convertedRate = Math.floor(rate * amount);
        console.log(convertedRate);
        $('#home').html('Conversion Rate: ' + rate + " <br> Amount: " + convertedRate);
    }
    $('#clear').on('click', function() {
        $('#home').html('Currency Conversion at that should work 😎!');
    })
});