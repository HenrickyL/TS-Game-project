import intro from "./introduction.js"

window.addEventListener('load', ()=>{
    const canvas = document.querySelector('canvas')
    Resize(canvas)
    const context = canvas.getContext('2d')
    intro.DrawRect(context)
    intro.DrawLines(context)
    intro.DrawCircle(context)
    intro.Animate(context)
})



function ResizeFull(canvas){
    canvas.width = window.innerWidth*0.99
    canvas.height = window.innerHeight*0.99
}
function Resize(canvas){
    canvas.width = 800
    canvas.height = 600
}

