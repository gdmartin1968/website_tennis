document.addEventListener('DOMContentLoaded', () => {
    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel(index) {
        images.forEach((img, i) => {
            img.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel(currentIndex);
    });

    updateCarousel(currentIndex);

    // Dynamic Calendar Updates
    const calendarBody = document.getElementById('calendar-body');
    const events = [
        { date: 3, name: 'Beginner Tournament' },
        { date: 10, name: 'Cardio Tennis Workshop' },
        { date: 25, name: 'Miami Open Trip' },
    ];

    function populateCalendar() {
        let html = '';
        for (let week = 0; week < 5; week++) {
            html += '<tr>';
            for (let day = 1; day <= 7; day++) {
                const date = week * 7 + day;
                const event = events.find(e => e.date === date);
                html += `<td>${date <= 31 ? date : ''}`;
                if (event) html += `<br><span>${event.name}</span>`;
                html += '</td>';
            }
            html += '</tr>';
        }
        calendarBody.innerHTML = html;
    }

    populateCalendar();
});
