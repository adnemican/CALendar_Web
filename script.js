let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth() + 1
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month - 1]}`
    month_picker.innerHTML = month_names[month - 1];
    calendar_header_year.innerHTML = year

    // Get first day of month
    let first_day = new Date(year, month - 1, 1)

    for (let i = 0; i <= days_of_month[month - 1] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth() + 1) {
                day.classList.add('current-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

// Mendapatkan elemen dengan ID "clockDisplay" dan "dateDisplay"
let clockElement = document.getElementById('clockDisplay');
let dateElement = document.getElementById('dateDisplay');
let dayTextElement = document.querySelector('.day-text-formate');

// Fungsi untuk mengupdate jam
function updateClock() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    // Tambahkan angka 0 di depan angka jam, menit, dan detik jika kurang dari 10
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Tampilkan waktu dalam format jam:menit:detik
    clockElement.textContent = hours + ":" + minutes + ":" + seconds;
}

// Fungsi untuk mengupdate tanggal
function updateDate() {
    let currentDate = new Date();
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let formattedDate = currentDate.toLocaleDateString('en-US', options);
    let dayText = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Tampilkan tanggal dalam format hari, bulan, tahun
    dateElement.textContent = formattedDate;
    dayTextElement.textContent = dayText.toUpperCase();
}

// Memanggil fungsi updateClock dan updateDate secara awal
updateClock();
updateDate();

// Memanggil fungsi updateClock dan updateDate setiap detik
setInterval(updateClock, 1000);
setInterval(updateDate, 1000);




let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month = index + 1
        generateCalendar(curr_month, curr_year)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = currDate.getMonth() + 1;
let curr_year = currDate.getFullYear();

generateCalendar(curr_month, curr_year);

document.querySelector('#prev-year').onclick = () => {
    --curr_year;
    generateCalendar(curr_month, curr_year);
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year;
    generateCalendar(curr_month, curr_year);
}