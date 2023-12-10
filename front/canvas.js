window.addEventListener('load', ()=>{
    const canvas = document.querySelector('canvas')
    Resize(canvas)
    const context = canvas.getContext('2d')
    context.fillRect(10,10, 20,20)
})



function ResizeFull(canvas){
    canvas.width = window.innerWidth*0.99
    canvas.height = window.innerHeight*0.99
}
function Resize(canvas){
    canvas.width = 800
    canvas.height = 600
}