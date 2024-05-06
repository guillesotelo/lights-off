chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "run") applyDarkMode()
    if (message.action === "revert") revertDarkMode()
})

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
video,
div[role=img],
*[style*="background-image"]
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
const unsetStyles = `

/* --- MAIN COLOR BACKGROUND --- */
html {
    filter: unset !important;
}

html * {
    box-shadow:  unset !important;
}

img,
svg,
video,
div[role=img],
*[style*="background-image"]
 {
    filter:  unset !important;
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
    localStorage.setItem('lightsOff', 1)
}

function revertDarkMode() {
    location.reload()
    console.log('Let there be light!')
    localStorage.setItem('lightsOff', 0)
}

function run() {
    chrome.storage.local.get('lightsOff', function (data) {
        const isOn = data.lightsOff === 1; // Check if lights are off
        const on = document.getElementById("on");
        const off = document.getElementById("off");
        console.log('isOn', isOn)

        if (isOn) {
            applyDarkMode()
            if (on && off) {
                off.classList.remove('active')
                on.classList.add('active')
            }
        }
    })
}
run()

