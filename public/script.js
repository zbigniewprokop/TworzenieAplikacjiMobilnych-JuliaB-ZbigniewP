document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
    const testimonials = carousel.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        carousel.appendChild(testimonial.cloneNode(true));
    });

    let scrollInterval;

    function startScroll() {
        scrollInterval = setInterval(() => {
            carousel.scrollLeft += 1;

            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
            }
        }, 50);
    }

    function stopScroll() {
        clearInterval(scrollInterval);
    }

    carousel.addEventListener('mouseover', stopScroll);
    carousel.addEventListener('mouseout', startScroll);

    startScroll();
}
});

document.getElementById('enableNotifications').addEventListener('click', function() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            showNotification();
        }
    });
});


function showNotification() {
    const notification = new Notification("Powiadomienie z Prostej Aplikacji", {
        body: "Witamy w Aplikacji Usług Pożyczkowych!",
    });

    notification.onclick = function () {
        window.open('https://pozyczki-jb-zp.surge.sh'); 
    };
}

document.getElementById('calculate').addEventListener('click', function() {

    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;

    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = parseFloat(years) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        document.getElementById('monthly-payment').innerText = 'Miesięczna rata: ' + monthly.toFixed(2);
        document.getElementById('total-payment').innerText = 'Łącznie do zapłaty: ' + (monthly * calculatedPayments).toFixed(2);
        document.getElementById('total-interest').innerText = 'Łączne odsetki: ' + ((monthly * calculatedPayments)-principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
    } else {
        alert('Proszę wprowadzić poprawne liczby');
    }
    
});
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location-display').innerHTML = "Geolokalizacja nie jest wspierana przez tę przeglądarkę.";
    }
}

function showPosition(position) {
    document.getElementById('location-display').innerHTML = "Szerokość geograficzna: " + position.coords.latitude +
    "<br>Długość geograficzna: " + position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location-display').innerHTML = "Użytkownik odmówił zgody na geolokalizację."
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location-display').innerHTML = "Informacje o lokalizacji są niedostępne."
            break;
        case error.TIMEOUT:
            document.getElementById('location-display').innerHTML = "Próba pobrania lokalizacji trwała zbyt długo."
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location-display').innerHTML = "Wystąpił nieznany błąd."
            break;
    }
}
function startSpeechRecognition(inputID) {
    const voiceInput = document.getElementById(inputID);
    
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      
      recognition.lang = 'pl-PL'; 
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = function (event) {
        const result = event.results[0][0].transcript;
        voiceInput.value = result;
      };
      
      recognition.start();
      
      setTimeout(function () {
        recognition.stop();
      }, 5000);
    } else {
      alert('Twoja przeglądarka nie obsługuje Web Speech API. Spróbuj innej przeglądarki.');
    }
  }

  function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (name && email && password && confirm) {
      alert('Rejestracja udana!');
    } else {
      alert('Wypełnij wszystkie pola przed rejestracją.');
    }
  }



