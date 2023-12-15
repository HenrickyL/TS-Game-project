//usando GPT e um código de colisões de uma engine que fiz em c++
import {ObjectGroup} from './enums/index.js'
import {CollisionDetection} from './Middleware/CollisionDetection.js'

export class Scene {
    #statics
    #moving
    #collisions
    #toDelete
    #processing

    constructor() {
        this.#statics = [];
        this.#moving = [];
        this.#collisions = [];
        this.#toDelete = [];
        this.#processing = ObjectGroup.STATIC; // Define o processamento inicial como estático
    }

    add(obj, type) {
        if (type === ObjectGroup.STATIC) {
            this.#statics.push(obj);
        } else {
            this.#moving.push(obj);
        }
    }

    remove(obj, type) {
        if (type === ObjectGroup.STATIC) {
            const index = this.#statics.indexOf(obj);
            if (index !== -1) {
                this.#statics.splice(index, 1);
            }
        } else {
            const index = this.#moving.indexOf(obj);
            if (index !== -1) {
                this.#moving.splice(index, 1);
            }
        }
    }

    delete(obj, type) {
        this.#toDelete.push({ obj, type });
    }

    size() {
        return this.#statics.length + this.#moving.length;
    }

    update() {
        this.#processing = ObjectGroup.STATIC;
        this.#statics.forEach(obj => obj.update());

        this.#processing = ObjectGroup.MOVING;
        this.#moving.forEach(obj => obj.update());

        this.#processDeleted();
    }

    draw(context) {
        this.#processing = ObjectGroup.STATIC;
        this.#statics.forEach(obj => obj.draw(context));

        this.#processing = ObjectGroup.MOVING;
        this.#moving.forEach(obj => obj.draw(context));
    }

    collisionDetection() {
        this.#collisions = [];

        if (this.#moving.length >= 2) {
            for (let i = 0; i < this.#moving.length - 1; i++) {
                for (let j = i + 1; j < this.#moving.length; j++) {
                    if (CollisionDetection.collision(this.#moving[i].bbox, this.#moving[j].bbox)) {
                        this.#collisions.push({ a: this.#moving[i], b: this.#moving[j] });
                    }
                }
            }
        }

        this.#moving.forEach(obj => {
            this.#statics.forEach(staticObj => {
                if (CollisionDetection.collision(obj.bbox, staticObj.bbox)) {
                    this.#collisions.push({ a: obj, b: staticObj });
                }
            });
        });

        if (this.#collisions.length > 0) {
            this.#collisions.forEach(({ a, b }) => {
                a.onCollision(b);
                b.onCollision(a);
            });
        }

        this.#processDeleted();
    }

    #processDeleted() {
        this.#toDelete.forEach(({ obj, type }) => {
            const list = type === ObjectGroup.STATIC ? this.#statics : this.#moving;
            const index = list.indexOf(obj);
            if (index !== -1) {
                list.splice(index, 1);
            }
        });

        this.#toDelete = [];
    }
}