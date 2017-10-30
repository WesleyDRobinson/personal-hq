const _ = require('lodash')
const gradients = [
    'gradientHex',
    'gradientPent',
    'gradientSquare',
    'gradientTriangle',
    'gradientBR',
    'gradientRB',
    'gradientBG',
    'gradientGB',
    'gradientGY',
    'gradientYG',
    'gradientBY',
    'gradientYB',
    'gradientGO',
    'gradientOG'
]
const metas = document.querySelectorAll('meta')
const wrapper = document.getElementById('wrapper')
const change = () => {
    const words = _.split(wrapper.className, ' ')
    let sansGradient = _.join(_.filter(words, word => word.substr(0, 8) !== 'gradient'), ' ')
    let newGradient = _.sample(gradients)
    wrapper.className = sansGradient += ' ' + newGradient
    return newGradient
}
const saveImage = () => {
    const styles = window.getComputedStyle(wrapper)
    let img = styles.getPropertyValue('background-image')
    const canvas = document.createElement("canvas");
    canvas.width = 192;
    canvas.height = 192;
    const gr = 1.618
    const ctx = canvas.getContext('2d')
    let lg = ctx.createLinearGradient(0, 0, 0, 0)
}
const play = (gameId) => {
    const iframeClasses = ['aspect-ratio--object', 'contain']
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', `https://${gameId}.com`)
    iframe.height = '900px'
    iframe.width = '100%'
    iframe.classList.add(...iframeClasses)
    const game = document.getElementById('game')
    game.innerHTML = ``
    game.appendChild(iframe)
    game.parentNode.classList.remove('dn')
}

document.addEventListener('click', (e) => {
    const target = e.target
    switch (target.id) {
        case 'change-button':
            change()
            break
        case 'flash-button':
            if (target.interval) {
                target.innerText = 'flash'
                clearInterval(target.interval)
                delete target.interval
            }
            else {
                target.innerText = 'stop'
                target.interval = setInterval(change, 1000)
            }
            break
        case 'add-instructions':
            const amwac = _.find(metas, {name: 'apple-mobile-web-app-capable'})
            amwac.content = 'no'
            break
        case 'save-button':
            saveImage()
            break
        case 'patatap':
        case 'typatone':
            play(target.id)
            break
        default:
            return 0
    }
})

let content = document.getElementById('content')
content.addEventListener('blur', () => {
    const letter = content.innerText.substr(0, 1)
    const amwat = _.find(metas, {name: 'apple-mobile-web-app-title'})
    document.title = amwat.content = letter
})
