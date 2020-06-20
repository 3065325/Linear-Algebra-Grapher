"use strict"

import {
    Matrix
} from "./Library/matrices.js";

export class Camera2D {
    constructor(CFrame, FoV, Distance) {
        this.CFrame = CFrame;
        this.FoV = Math.PI * FoV / 180;
        this.Distance = Distance;

        let pos = Matrix.multM(
            this.CFrame,
            [
                [0],
                [0],
                [1]
            ]
        );

        this.focus = Matrix.add(Matrix.multS(this.up(), this.Distance), pos);
        this.focusCFrame = [
            
        ]
    }

    right() {
        //let row = this.CFrame[0];
        return Matrix.fromColumn(this.CFrame, 0); //Matrix.toVector([row[0], row[1], 0]);
    }

    up() {
        //let row = this.CFrame[1];
        return Matrix.fromColumn(this.CFrame, 1); //Matrix.toVector([row[0], row[1], 0]);
    }
}