import {
    Matrix as M
} from "./Library/matrices.js";

export class Polygon {
    constructor(verticesArray) {
        if (verticesArray.length % 3 !== 0) {
            verticesArray[verticesArray.length] = 0;
        }

        this.dVertices = new Array(3);

        let rowX = new Array(verticesArray.length / 3);
        let rowY = new Array(verticesArray.length / 3);
        let rowZ = new Array(verticesArray.length / 3);
        for (let i = 0, j = 0; j < verticesArray.length - 1; i++, j += 3) {
            rowX[i] = verticesArray[j + 0];
            rowY[i] = verticesArray[j + 1];
            rowZ[i] = verticesArray[j + 2];
        }

        this.dVertices[0] = rowX;
        this.dVertices[1] = rowY;
        this.dVertices[2] = rowZ;

        this.CFrame = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }
}