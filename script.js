const themeStylesheet = document.getElementById('themeStylesheet');
const themeColor = document.getElementById('theme-color');
let isDarkMode = localStorage.getItem('colorScheme') === 'dark' ||
    (localStorage.getItem('colorScheme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
themeStylesheet.href = isDarkMode ? '/dark-mode.css' : '/light-mode.css';
themeColor.content = isDarkMode ? '#BB6B6B' : '#F7344F';

// darkmode toggle 

document.addEventListener('DOMContentLoaded', function () {

    const suns = document.querySelectorAll('.sun')
    const moons = document.querySelectorAll('.moon')
    const buttons = document.querySelectorAll('.modeContainer')


    suns.forEach(sun => sun.classList.toggle('visible', !isDarkMode));
    moons.forEach(moon => moon.classList.toggle('visible', isDarkMode));

    buttons.forEach(button => {

        button.addEventListener('click', () => {
            isDarkMode = !isDarkMode; // Toggle the boolean value
            suns.forEach(sun => sun.classList.toggle('visible'));
            moons.forEach(moon => moon.classList.toggle('visible'));
            // darkModeStatus.textContent = isDarkMode ? 'enabled' : 'disabled';
            themeStylesheet.href = isDarkMode ? '/dark-mode.css' : '/light-mode.css';
            themeColor.content = isDarkMode ? '#BB6B6B' : '#F7344F';
            localStorage.setItem('colorScheme', isDarkMode ? 'dark' : 'light');
        });
    })

})