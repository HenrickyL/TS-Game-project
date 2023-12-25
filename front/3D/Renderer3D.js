import { Matrix4x4} from "./middleware.js";
import {Point, Polygon} from '../Engine/Geometry.js'
import { Color } from "../Engine/Colors.js";
export class Renderer3D {
    #canvas;
    #context;
    #width;
    #height;
    #theta = 90; //Fov
    #zNear = 0.1;
    #zFar = 1000;
    #aspectRatio=0
    #FovRad //FovRad - 1/tan
    #matProj
    #matRotX
    #matRotZ
    #angleXRad = 0
    #angleZRad = 0

    #z = 2



    constructor(width, height, theta = 90, zNear = 0, zFar = 0) {
        this.#canvas = document.querySelector('canvas')
        this.setProjectionParams(width, height, theta, zNear, zFar)
        this.#resize()
        this.#context = this.#canvas.getContext('2d')
    }
    get canvas(){
        return this.#canvas
    }
    get width(){
        return this.#width
    }

    get height(){
        return this.#height
    }

    set z(value){
        this.#z = value
    }

    #resize(){
        this.#canvas.width = this.#width
        this.#canvas.height = this.#height
    }


    setProjectionParams(width, height, theta, zNear, zFar) {
        this.#width = width;
        this.#height = height;
        this.#theta = theta;
        if(zNear!==0)this.#zNear = zNear;
        if(zFar!==0) this.#zFar = zFar;

        this.#aspectRatio = this.height/ this.width
        this.#FovRad = 1/ (Math.tan(this.#theta * 0.5 / 180*Math.PI))
        this.#matProj = new Matrix4x4() 
        this.#matRotX = new Matrix4x4() 
        this.#matRotZ = new Matrix4x4() 
        this.#calculatedMatrixProjection()
    }

    #calculatedMatrixRotateZ(){
        this.#matRotZ = new Matrix4x4() 

        const angle = this.#angleZRad
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        
        this.#matRotZ.set(0,0, cos)
        this.#matRotZ.set(0,1, sin)
        this.#matRotZ.set(1,0, -sin)
        this.#matRotZ.set(1,1, cos)
        this.#matRotZ.set(2,2, 1)
        this.#matRotZ.set(3,3, 1)

    }

    #calculatedMatrixRotateX(){
        this.#matRotX = new Matrix4x4() 

        const angle = this.#angleXRad
        const sin = Math.sin(angle * 0.5)
        const cos = Math.cos(angle * 0.5)
        
        this.#matRotX.set(0,0, 1)
        this.#matRotX.set(1,1, cos)
        this.#matRotX.set(1,2, sin)
        this.#matRotX.set(2,1, -sin)
        this.#matRotX.set(2,2, cos)
        this.#matRotX.set(3,3, 1)
        
    }

    #calculatedMatrixProjection(){
        this.#matProj = new Matrix4x4() 
        const a = this.#aspectRatio
        const f = this.#FovRad
        const af = a *f 
        const q = this.#zFar/(this.#zFar - this.#zNear)

        this.#matProj.set(0,0, af)
        this.#matProj.set(1,1, f)
        this.#matProj.set(2,2, q)
        this.#matProj.set(3,2, -q*this.#zNear)
        this.#matProj.set(2,3, 1)
        this.#matProj.set(3,3, 0)
    }
    projectVertex(vertex) {
        const v1 = this.#multiplyMatrixVector(vertex, this.#matRotZ.matrix)
        const v = this.#multiplyMatrixVector(v1, this.#matRotX.matrix)

        // const v = 
        // console.log(v)
        // const v = vertex
        const translatedVertex = {
            x: v.x,
            y: v.y,
            z: v.z+ this.#z
        }

        const result = this.#multiplyMatrixVector(translatedVertex, this.#matProj.matrix)

        result.x += 1
        result.y += 1

        result.x *= 0.5 * this.width 
        result.y *= 0.5 * this.height 
        return result
    }

    update(angleX, angleZ){
        this.#angleXRad = angleX 
        this.#angleZRad = angleZ 

        this.#calculatedMatrixRotateX()
        this.#calculatedMatrixRotateZ()
    }

    render(mesh, settings = {}) {
        // Limpar o canvas antes de renderizar
        this.#context.clearRect(0, 0, this.#width, this.#height);

        mesh.forEach(triangle => {
            const vertices = triangle.vertices;
            // Projetar cada vértice do triângulo na tela
            const projectedVertices = vertices.map(vertex => this.projectVertex(vertex));
            if(settings.isPoint)
                Point.draw(this.#context, projectedVertices,{isSquare: false, size: 5})
            else
                Polygon.draw(this.#context, projectedVertices, settings.isColor && Color.GREEN)
        });
    }

    #multiplyMatrixVector(p, m){
        const result  = {
            x:  p.x * m[0][0] + p.y * m[1][0] + p.z * m[2][0] + m[3][0],
            y:  p.x * m[0][1] + p.y * m[1][1] + p.z * m[2][1] + m[3][1],
            z:  p.x * m[0][2] + p.y * m[1][2] + p.z * m[2][2] + m[3][2]
        }
        const w = p.x * m[0][3] + p.y * m[1][3] + p.z *m[2][3] + m[3][3]
        if(w !== 0){
            result.x /= w
            result.y /= w
            result.z /= w
        }

        //todo compare with new Vec3d
        return result
    }
}
