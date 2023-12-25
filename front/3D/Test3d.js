import {Mesh, Vec3d, Triangle} from './middleware.js'


export class Test3d{
    #cubeMesh
    constructor(){

        
    }

    getCube(){
        const p000 = new Vec3d(0,0,0)
        const p100 = new Vec3d(1,0,0)
        const p110 = new Vec3d(1,1,0)
        const p010 = new Vec3d(0,1,0)
        const p011 = new Vec3d(0,1,1)
        const p111 = new Vec3d(1,1,1)
        const p001 = new Vec3d(0,0,1)
        const p101 = new Vec3d(1,0,1)

        const triangles = [
            new Triangle([p000,p010,p110]),
            new Triangle([p000,p110,p100]),

            new Triangle([p100,p110,p111]),
            new Triangle([p100,p111,p101]),

            new Triangle([p101,p111,p011]),
            new Triangle([p101,p011,p001]),

            new Triangle([p001,p011,p010]),
            new Triangle([p001,p010,p000]),

            new Triangle([p010,p011,p111]),
            new Triangle([p010,p111,p110]),

            new Triangle([p101,p001,p000]),
            new Triangle([p101,p000,p100]),
        ]

        return new Mesh(triangles)
    }
    getHexagonalPrism() {
        const vertices = [];
        const sides = 6; // Número de lados do hexágono

        // Criando os vértices do hexágono central
        vertices.push(new Vec3d(0, 0, 0)); // Ponto central

        // Gerando os vértices do hexágono em torno do ponto central
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle);
            const z = Math.sin(angle);

            vertices.push(new Vec3d(x, 0, z)); // Adiciona os pontos do hexágono
        }
        vertices.push(new Vec3d(1, 1, 0));
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle);
            const z = Math.sin(angle);

            vertices.push(new Vec3d(x, 1, z)); // Adiciona os pontos do hexágono
        }

        // Criando os triângulos para conectar cada par de pontos do hexágono central ao ponto central
        const triangles = [];
        for (let i = 1; i <= sides; i++) {
            const nextI = i === sides ? 1 : i + 1;
            triangles.push(new Triangle([vertices[0], vertices[i], vertices[nextI]]));
        }

        return new Mesh(triangles);
    }

    getPyramid() {
        const p000 = new Vec3d(0, 0, 0);
        const p100 = new Vec3d(1, 0, 0);
        const p010 = new Vec3d(0.5, Math.sqrt(3) / 2, 0); // Altura da pirâmide é raiz de 3 / 2
        const p001 = new Vec3d(0.5, Math.sqrt(3) / 6, Math.sqrt(6) / 3); // Altura da pirâmide na altura 1

        const triangles = [
            new Triangle([p000, p100, p010]),
            new Triangle([p000, p010, p001]),
            new Triangle([p100, p001, p010]),
            new Triangle([p100, p000, p001]),
            // ... adicionando mais uma base para parecer uma pirâmide completa
            new Triangle([p000, p010, p100]),
            new Triangle([p010, p001, p100]),
        ];

        return new Mesh(triangles);
    }

    getSphere(subdivisions) {
        const vertices = [];
        const sides = 12; // Número de lados do polígono (dodecágono)

        const radius = 1; // Raio da esfera

        // Criação dos vértices em uma esfera
        for (let i = 0; i < sides; i++) {
            const lat = (-Math.PI / 2) + (Math.PI / sides) * i;
            const z = Math.sin(lat) * radius;

            const cosLat = Math.cos(lat);
            for (let j = 0; j < sides; j++) {
                const lon = (Math.PI * 2 / sides) * j;
                const x = Math.cos(lon) * cosLat * radius;
                const y = Math.sin(lon) * cosLat * radius;

                vertices.push(new Vec3d(x, y, z));
            }
        }

        // Criação dos triângulos para formar os dodecágonos (polígonos de 12 lados)
        const triangles = [];
        for (let i = 0; i < vertices.length; i++) {
            const v1 = vertices[i];
            const v2 = vertices[(i + 1) % vertices.length];
            const v3 = vertices[(i + sides) % vertices.length];
            const v4 = vertices[(i + sides + 1) % vertices.length];

            triangles.push(new Triangle([v1, v3, v2]));
            triangles.push(new Triangle([v2, v3, v4]));
        }

        return new Mesh(triangles);
    }

    get mesh(){
        return this.#cubeMesh.triangles
    }
}