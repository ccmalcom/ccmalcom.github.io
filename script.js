function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 1,
        tempTypeSpeed = 0;

    var type = function () {

        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 15;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 15;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition === HTML.indexOf('<span id="darkModeStatus">')) {
            // Check dark mode status from localStorage or system preference
            var isDarkMode = localStorage.getItem('colorScheme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Set the appropriate text for the dark mode status
            var darkModeText = isDarkMode ? 'enabled' : 'disabled';
            // Replace the placeholder text with the actual status
            HTML = HTML.replace('Dark Mode: disabled', 'Dark Mode: ' + darkModeText);
        }
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }

    };

    return {
        type: type
    };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();

//* Thank you https://codepen.io/stevn/pen/jEZvXa for the idea

// darkmode toggle 
document.addEventListener('DOMContentLoaded', function () {

    const suns = document.querySelectorAll('.sun')
    const moons = document.querySelectorAll('.moon')
    const buttons = document.querySelectorAll('.modeContainer')
    const themeStylesheet = document.getElementById('themeStylesheet');
    let isDarkMode = localStorage.getItem('colorScheme') === 'dark' ||
        (localStorage.getItem('colorScheme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    suns.forEach(sun => sun.classList.toggle('visible', !isDarkMode));
    moons.forEach(moon => moon.classList.toggle('visible', isDarkMode));

    themeStylesheet.href = isDarkMode ? '/dark-mode.css' : '/light-mode.css';
    buttons.forEach(button => {

        button.addEventListener('click', () => {
            isDarkMode = !isDarkMode; // Toggle the boolean value
            suns.forEach(sun => sun.classList.toggle('visible'));
            moons.forEach(moon => moon.classList.toggle('visible'));
            // darkModeStatus.textContent = isDarkMode ? 'enabled' : 'disabled';
            themeStylesheet.href = isDarkMode ? '/dark-mode.css' : '/light-mode.css';
            localStorage.setItem('colorScheme', isDarkMode ? 'dark' : 'light');
        });
    })

})