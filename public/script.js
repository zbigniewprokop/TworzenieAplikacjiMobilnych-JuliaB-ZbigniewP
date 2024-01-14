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