const styles = `

/* --- MAIN COLOR BACKGROUND --- */
html {
    filter: invert(84%) grayscale(0%) saturate(110%) contrast(115%) brightness(110%) hue-rotate(180deg) !important;
}

html * {
    box-shadow: none !important;
}

img,
svg,
div[role=img]
 {
    filter: invert(84%) grayscale(0%) saturate(110%) contrast(115%) brightness(110%) hue-rotate(180deg) !important;
}

/* --- SCROLLBARS --- */
::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
}

::-webkit-scrollbar-thumb {
    background-color: gray !important;
    border-radius: 6px !important;
}

::-webkit-scrollbar-thumb:hover {
    background-color: darkgray !important;
}

::-webkit-scrollbar-track {
    background: lightgray !important;
}


`

function applyDarkMode() {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelectorAll('[data-color-scheme]').forEach(element => {
        element.setAttribute('data-color-scheme', 'dark');
    });

    console.log('Lights just went Off!')
}

applyDarkMode();