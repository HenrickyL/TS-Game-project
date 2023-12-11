export class Graphics{
    #canvas
    #context
    #width
    #height

    #objects = []
    
    constructor(width = 800, height=600){
        this.#height = height
        this.#width = width
        this.#canvas = document.querySelector('canvas')
        this.#resize()
        this.#context = this.#canvas.getContext('2d')
    }

    initialize(){
       
    }

    update(){

    }

    draw(){
        this.#clear()

        this.#objects.forEach(obj =>{
            obj.draw(this.#context)
        })

    }


    addObject(object){
        this.#objects.push(object)
    }



    #clear(){
        this.#context.clearRect(0,0, this.#width, this.#height)
    }

    #resize(){
        this.#canvas.width = this.#width
        this.#canvas.height = this.#height
    }
}