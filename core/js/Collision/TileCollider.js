import Camera from "../Camera/Camera.js";
import TileResolver from "./TileResolver.js";

export default class TileCollider {

    constructor(tileGrid) {
        this.resolver = new TileResolver(tileGrid)
        TileCollider.instance = this

        this.matchesX = []
        this.matchesY = []
    }

    checkX(shape) {
        let xRange

        // xRange will be the right side
        if (shape.gameObject.velocity.x > 0) {
            xRange = shape.xPosition + shape.width
        }

        // xRange will be the left side
        else if (shape.gameObject.velocity.x < 0) {
            xRange = shape.xPosition
        }

        // Object is not moving horizontally
        else {
            return
        }

        // Match tiles
        this.matchesX = this.resolver.getByRange(
            xRange, xRange,
            shape.yPosition, shape.yPosition + shape.height
        )

        this.matchesX.forEach(match => {
            // If tile doesn't has a collider
            if (match.tile.collider === null) {
                return
            }

            // Get collider instance
            const collider = match.tile.collider
            collider.checkX(shape, match)
        })
    }

    checkY(shape) {
        let yRange

        // yRange will be on the bottom
        if (shape.gameObject.velocity.y > 0) {
            yRange = shape.yPosition + shape.height
        }

        // yRange will be on the top
        else if (shape.gameObject.velocity.y < 0) {
            yRange = shape.yPosition
        }

        // Object is not moving vertically
        else {
            return
        }

        this.matchesY = this.resolver.getByRange(
            shape.xPosition, shape.xPosition + shape.width,
            yRange, yRange)

        this.matchesY.forEach(match => {

            // if tile doesn't has a collider
            if (match.tile.collider === null) {
                return
            }

            // Get collider instance
            const collider = match.tile.collider
            collider.checkY(shape, match)

        })
    }
}