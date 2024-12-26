document.getElementById('lightTheme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#333';
    document.body.style.fontSize = '16px';
    localStorage.setItem('theme', 'light');
});

document.getElementById('darkTheme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#fff';
    document.body.style.fontSize = '18px';
    localStorage.setItem('theme', 'dark');
});

window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    }
    loadData(); 
};

document.getElementById('toggleButton').addEventListener('click', () => {
    const content = document.getElementById('toggleContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
});

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;
    });
});

modal.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
});

const accordionBtns = document.querySelectorAll('.accordion-btn');
accordionBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const content = e.target.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!name || !email || !password) {
        toastr.error("Sva polja moraju biti popunjena!");
        return;
    }

    if (!email.match(emailPattern)) {
        toastr.error("Unesite validnu email adresu.");
        return;
    }

    if (!password.match(passwordPattern)) {
        toastr.error("Lozinka mora sadržavati barem jedno veliko slovo, jedno malo slovo i jedan broj.");
        return;
    }

    setTimeout(() => {
        toastr.success("Forma je uspešno poslata!");
    }, 500);
});

function loadData() {
    document.getElementById('loading-spinner').style.display = 'block'; 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onload = function () {
        document.getElementById('loading-spinner').style.display = 'none'; 
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayData(data);
        } else {
            toastr.error('Greška prilikom učitavanja podataka.');
        }
    };
    xhr.send();
}

function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    data.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('data-item');
        div.id = `data-item-${item.id}`;
        div.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <button onclick="viewMore(${item.id})">View More</button>
            <button onclick="editItem(${item.id})">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function viewMore(id) {
    toastr.info(`View more for item ID: ${id}`);
}

function editItem(id) {
    toastr.info(`Edit item ID: ${id}`);
}

function deleteItem(id) {
    const item = document.getElementById(`data-item-${id}`);
    item.remove();
    toastr.success(`Stavka ID: ${id} je obrisana`);
}

document.getElementById('showWeather').addEventListener('click', () => {
    const apiKey = '6250317916d48f3ad4614b1aa7c6311a';
    const city = 'Sarajevo';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weatherData = `Trenutna temperatura u ${city}: ${data.main.temp}°C, ${data.weather[0].description}`;
            document.getElementById('weatherData').textContent = weatherData;
        })
        .catch(() => {
            document.getElementById('weatherData').textContent = 'Greška prilikom dohvaćanja podataka.';
        });
});
