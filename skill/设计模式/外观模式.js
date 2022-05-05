const addMyEvent = function (el, event, fn) {
    console.log(el)
    if (el.addEventListener) {
        el.addEventListener(event, fn, false)
    } else if (el.attachEvent) {
        el.attachEvent('on' + event, fn)
    } else {
        el['on' + event] = fn
    }
}

window.onload = function () {
    let app = document.querySelector('#app')
    addMyEvent(app, 'click', function () {
        console.log('a')
    })
}

