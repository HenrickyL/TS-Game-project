

function DrawLines(context){
    context.beginPath()
    context.moveTo(50,300)
    context.lineTo(300,100)
    // context.lineTo(400,300)
    context.strokeStyle = "#f00"
    context.stroke()
}

function DrawRect(context){
    context.fillStyle = "rgba(0,0,255, 0.5)"
    context.fillRect(10,10, 20,20)
}

function DrawCircle(context){
    context.beginPath()
    context.arc(300,300, 30, 0 , Math.PI*2,  false)
    context.strokeStyle = "#00f"
    context.stroke()
}

function DrawArc(context){
}




const Introduction = {
    DrawLines,
    DrawRect,
    DrawCircle,
    DrawArc
}

export default Introduction