document.addEventListener("DOMContentLoaded", function () {
    const switchButton = document.getElementById("switchButton")
    if (switchButton) {
        switchButton.addEventListener("click", function () {
            const on = document.getElementById("on")
            const off = document.getElementById("off")
            const isOn = on.classList.contains('active')

            if (isOn) {
                on.classList.remove('active')
                off.classList.add('active')
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "revert" })
                })
                localStorage.setItem('lightsOff', 0)
            }
            else {
                off.classList.remove('active')
                on.classList.add('active')
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "run" })
                })
                localStorage.setItem('lightsOff', 1)
            }
        })
    }

    // chrome.runtime.onMessage.addListener(function (message) {
    //     if (message.action === "processComplete") {
    //         window.close()
    //     }
    // })
})

window.addEventListener("storage", () => {
    const isOn = localStorage.getItem('lightsOff')

    if (isOn) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "run" })
        })
    }
})