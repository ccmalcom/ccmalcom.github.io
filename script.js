const themeColor = document.getElementById('theme-color');

let isDarkMode = localStorage.getItem('colorScheme') === 'dark' ||
    (localStorage.getItem('colorScheme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
themeColor.content = isDarkMode ? '#BB6B6B' : '#F7344F';

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

            themeColor.content = isDarkMode ? '#BB6B6B' : '#F7344F';
            localStorage.setItem('colorScheme', isDarkMode ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        });
    })

})