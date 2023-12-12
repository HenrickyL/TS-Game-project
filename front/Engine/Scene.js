//usando GPT e um código de colisões de uma engine que fiz em c++
import {GeometryType, ObjectGroup} from './enums/index.js'
export class Scene {
    constructor() {
        this.statics = [];
        this.moving = [];
        this.collisions = [];
        this.toDelete = [];
        this.processing = ObjectGroup.STATIC; // Define o processamento inicial como estático
    }

    add(obj, type) {
        if (type === ObjectGroup.STATIC) {
            this.statics.push(obj);
        } else {
            this.moving.push(obj);
        }
    }

    remove(obj, type) {
        if (type === ObjectGroup.STATIC) {
            const index = this.statics.indexOf(obj);
            if (index !== -1) {
                this.statics.splice(index, 1);
            }
        } else {
            const index = this.moving.indexOf(obj);
            if (index !== -1) {
                this.moving.splice(index, 1);
            }
        }
    }

    delete(obj, type) {
        this.toDelete.push({ obj, type });
    }

    size() {
        return this.statics.length + this.moving.length;
    }

    update() {
        this.processing = ObjectGroup.STATIC;
        this.statics.forEach(obj => obj.update());

        this.processing = ObjectGroup.MOVING;
        this.moving.forEach(obj => obj.update());

        this.processDeleted();
    }

    draw(context) {
        this.processing = ObjectGroup.STATIC;
        this.statics.forEach(obj => obj.draw(context));

        this.processing = ObjectGroup.MOVING;
        this.moving.forEach(obj => obj.draw(context));
    }

    collisionDetection() {
        this.collisions = [];

        if (this.moving.length >= 2) {
            for (let i = 0; i < this.moving.length - 1; i++) {
                for (let j = i + 1; j < this.moving.length; j++) {
                    if (this.collision(this.moving[i].bbox, this.moving[j].bbox)) {
                        this.collisions.push({ a: this.moving[i], b: this.moving[j] });
                    }
                }
            }
        }

        this.moving.forEach(obj => {
            this.statics.forEach(staticObj => {
                if (this.collision(obj, staticObj)) {
                    this.collisions.push({ a: obj, b: staticObj });
                }
            });
        });

        if (this.collisions.length > 0) {
            this.collisions.forEach(({ a, b }) => {
                a.onCollision(b);
                b.onCollision(a);
            });
        }

        this.processDeleted();
    }

    processDeleted() {
        this.toDelete.forEach(({ obj, type }) => {
            const list = type === ObjectGroup.STATIC ? this.statics : this.moving;
            const index = list.indexOf(obj);
            if (index !== -1) {
                list.splice(index, 1);
            }
        });

        this.toDelete = [];
    }

    collisionRectRect(rectA, rectB) {
        return (
            rectA.left <= rectB.right &&
            rectA.right >= rectB.left &&
            rectA.top <= rectB.bottom &&
            rectA.bottom >= rectB.top
        );
    }

    collisionRectPoint(rect, point) {
        console.log(rect, point)
        return (
            point.x >= rect.left &&
            point.x <= rect.right &&
            point.y >= rect.top &&
            point.y <= rect.bottom
        );
    }

    collisionRectCircle(rect, circle) {
        let closestX = clamp(circle.position.x, rect.left, rect.right);
        let closestY = clamp(circle.position.y, rect.top, rect.bottom);

        let distanceX = circle.position.x - closestX;
        let distanceY = circle.position.y - closestY;

        let distanceSquared = distanceX * distanceX + distanceY * distanceY;
        return distanceSquared < circle.radius * circle.radius;
    }

    collisionCircleCircle(circleA, circleB) {
        let distance = Math.sqrt(
            (circleB.position.x - circleA.position.x) ** 2 +
            (circleB.position.y - circleA.position.y) ** 2
        );

        return distance < circleA.radius + circleB.radius;
    }

    collisionCirclePoint(circle, point) {
        let distance = Math.sqrt(
            (point.x - circle.position.x) ** 2 +
            (point.y - circle.position.y) ** 2
        );

        return distance < circle.radius;
    }

    collisionPointPoint(pointA, pointB) {
        return pointA.x === pointB.x && pointA.y === pointB.y;
    }

    collision(objA, objB) {
        if (objA.type === GeometryType.RECTANGLE && objB.type === GeometryType.RECTANGLE) {
            console.log("C-RR")
            return this.collisionRectRect(objA, objB);
        } else if (objA.type === GeometryType.CIRCLE && objB.type === GeometryType.CIRCLE) {
            console.log("C-CC")
            return this.collisionCircleCircle(objA, objB);
        } else if (objA.type === GeometryType.POINT && objB.type === GeometryType.POINT) {
            console.log("C-PP")
            return this.collisionPointPoint(objA.position, objB.position);
        } else if (objA.type === GeometryType.RECTANGLE && objB.type === GeometryType.POINT) {
            console.log("C-RP")
            return this.collisionRectPoint(objA, objB.position);
        } else if (objA.type === GeometryType.POINT && objB.type === GeometryType.RECTANGLE) {
            console.log("C-PR")
            return this.collisionRectPoint(objB, objA.position);
        } else if (objA.type === GeometryType.RECTANGLE && objB.type === GeometryType.CIRCLE) {
            console.log("C-RC")
            return this.collisionRectCircle(objA, objB);
        } else if (objA.type === GeometryType.CIRCLE && objB.type === GeometryType.RECTANGLE) {
            console.log("C-CR")
            return this.collisionRectCircle(objB, objA);
        } else if (objA.type === GeometryType.CIRCLE && objB.type === GeometryType.POINT) {
            console.log("C-CP")
            return this.collisionCirclePoint(objA, objB.position);
        }else if (objA.type === GeometryType.POINT && objB.type === GeometryType.CIRCLE) {
            console.log("C-PC")
            return this.collisionCirclePoint(objB, objA.position);
        }

        return false;
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}