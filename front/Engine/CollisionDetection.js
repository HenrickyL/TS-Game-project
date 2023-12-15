import { InvalidArgumentError } from '../Errors/index.js';
import { GeometryType } from './enums/index.js';

export class CollisionDetection {
    static #collisionRectRect(rectA, rectB) {
        return (
            rectA.left <= rectB.right &&
            rectA.right >= rectB.left &&
            rectA.top <= rectB.bottom &&
            rectA.bottom >= rectB.top
        );
    }

    static #collisionRectPoint(rect, point) {
        return (
            point.x >= rect.left &&
            point.x <= rect.right &&
            point.y >= rect.top &&
            point.y <= rect.bottom
        );
    }

    static #collisionRectCircle(rect, circle) {
        let closestX = clamp(circle.position.x, rect.left, rect.right);
        let closestY = clamp(circle.position.y, rect.top, rect.bottom);

        let distanceX = circle.position.x - closestX;
        let distanceY = circle.position.y - closestY;

        let distanceSquared = distanceX * distanceX + distanceY * distanceY;
        return distanceSquared < circle.radius * circle.radius;
    }

    static #collisionCircleCircle(circleA, circleB) {
        let distance = Math.sqrt(
            (circleB.position.x - circleA.position.x) ** 2 +
            (circleB.position.y - circleA.position.y) ** 2
        );

        return distance < circleA.radius + circleB.radius;
    }

    static #collisionCirclePoint(circle, point) {
        let distance = Math.sqrt(
            (point.x - circle.position.x) ** 2 +
            (point.y - circle.position.y) ** 2
        );

        return distance < circle.radius;
    }

    static #collisionPointPoint(pointA, pointB) {
        return pointA.x === pointB.x && pointA.y === pointB.y;
    }
    

    static collision(objA, objB) {
        if( objA instanceof Object && objB instanceof Object){
            if (objA.type === GeometryType.RECTANGLE && objB.type === GeometryType.RECTANGLE) {
                return this.#collisionRectRect(objA, objB);
            } else if (objA.type === GeometryType.CIRCLE && objB.type === GeometryType.CIRCLE) {
                return this.#collisionCircleCircle(objA, objB);
            } else if (objA.type === GeometryType.POINT && objB.type === GeometryType.POINT) {
                return this.#collisionPointPoint(objA.position, objB.position);
            } else if (objA.type === GeometryType.RECTANGLE && objB.type === GeometryType.POINT) {
                return this.#collisionRectPoint(objA, objB.position);
            } else if (objA.type === GeometryType.POINT && objB.type === GeometryType.RECTANGLE) {
                return this.#collisionRectPoint(objB, objA.position);
            } else if (objA.type === GeometryType.RECTANGLE && objB.type === GeometryType.CIRCLE) {
                return this.#collisionRectCircle(objA, objB);
            } else if (objA.type === GeometryType.CIRCLE && objB.type === GeometryType.RECTANGLE) {
                return this.#collisionRectCircle(objB, objA);
            } else if (objA.type === GeometryType.CIRCLE && objB.type === GeometryType.POINT) {
                return this.#collisionCirclePoint(objA, objB.position);
            }else if (objA.type === GeometryType.POINT && objB.type === GeometryType.CIRCLE) {
                return this.#collisionCirclePoint(objB, objA.position);
            }
            return false;
        }else{
            throw new InvalidArgumentError("Expected a Object")
        }
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
