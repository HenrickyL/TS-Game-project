export class Vec3d{
    #x
    #y
    #z
    constructor(x,y,z) {
        this.#x = x
        this.#y = y
        this.#z = z
    }

    get x(){
        return this.#x
    }
    get y(){
        return this.#y
    }
    get z(){
        return this.#z
    }

    get object(){
        return {
            x: this.#x,
            y: this.#y,
            z: this.#z
        }
    }
}   

export class Triangle{
    #vertices

    constructor(vertices = []){
        this.#vertices = []
        vertices.forEach(vertex => {
            this.#vertices.push(vertex)
        })
    }

    get vertices(){
        return this.#vertices
    }
}

export class Mesh{
    #triangles
    constructor(triangles = []){
        this.#triangles = new Array()
        triangles.forEach(tri=>{
            this.#triangles.push(tri)
        })

    }
    get triangles(){
        return this.#triangles
    }

    push(triangle){
        if(triangle instanceof Triangle){
            this.#triangles.push(triangle)
        }else{
            throw new Error("expected a vertex of type Vec3d")
        }
    }
}


export class Matrix4x4{
    #matrix
    constructor(){
        this.#initMatrix()
    }
    #initMatrix(){
        this.#matrix = new Array(4)
        for(let i=0; i< 4; i++){
            this.#matrix[i] = new Array(4).fill(0)
        }
    }
    get matrix(){
        return this.#matrix
    }
    set(i,j, value){
        this.#matrix[i][j] = value
    }
}