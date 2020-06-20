"use strict"

import {
    c,
    canvas,
    canvasUpdate,
    vw,
    vh
} from "./canvas.js";

import {
    Matrix as M
} from "./Library/matrices.js";

import {
    Camera2D
} from "./camera.js";

import {
    Polygon
} from "./polygon.js";

class Interface {
    constructor() {
    }

    drawPoint2D(Point2D, color, thickness) {
        c.fillStyle = color;

        c.fillRect(Point2D[0][0] - thickness*0.5, -Point2D[1][0] - thickness*0.5, thickness, thickness);
    }

    drawVector2D(Vector2D, Position2D, color, thickness) {
        c.fillStyle = color;
        c.strokeStyle = color;
        c.lineWidth = thickness;

        let vector = M.add(Vector2D, Position2D);

        c.beginPath();
        c.moveTo(Position2D[0][0], -Position2D[1][0]);
        c.lineTo(vector[0][0], -vector[1][0]);
        c.stroke();
        c.fillRect(vector[0][0] - 1.5, -vector[1][0] - 1.5, 3, 3);
    }

    drawLine2D(Vector2D, Position2D, color, thickness) {
        c.fillStyle = color;
        c.strokeStyle = color;
        c.lineWidth = thickness;

        let pos = (Position2D === undefined) ? [
            [0],
            [0],
            [1]
        ] : Position2D;

        let V1 = Array.from(Vector2D);
        V1[2][0] = 0;
        V1 = M.normalize(Vector2D);
        V1[2][0] = 1;

        let P1 = M.add(pos, M.multS(V1, 10000));
        P1[2][0] = 1;

        let P2 = M.add(pos, M.multS(M.multS(V1, -1), 10000));
        P2[2][0] = 1;

        c.beginPath();
        c.moveTo(P1[0][0], -P1[1][0]);
        c.lineTo(P2[0][0], -P2[1][0]);
        c.stroke();
    }

    drawCFrame2D(CFrame, rightColor, upColor) {
        let right = M.fromColumn(CFrame, 0);
        let up = M.fromColumn(CFrame, 1);
        let pos = M.fromColumn(CFrame, 2);

        this.drawVector2D(right, pos, rightColor, 1);
        this.drawVector2D(up, pos, upColor, 1);
    }

    drawGrid(CFrame, xColor, yColor) {
        let right = M.fromColumn(CFrame, 0);
        let up = M.fromColumn(CFrame, 1);
        let origin = M.fromColumn(CFrame, 2);

        if (xColor === undefined) {
            xColor = "#99aaff";
        }
        if (yColor === undefined) {
            yColor = "#ffaa99";
        }

        let vDiff = right[0][0];
        this.drawLine2D(up, origin, yColor, 3);
        let offset = [[0], [0], [0]];
        for (let i = 0; i < canvas.width/vDiff * 10; i++) {
            offset = M.add(offset, [[vDiff], [0], [0]]);

            this.drawLine2D(up, M.add(origin, offset), yColor, 1);
        }

        offset = [[0], [0], [0]];
        for (let i = 0; i < canvas.width/vDiff * 10; i++) {
            offset = M.sub(offset, [[vDiff], [0], [0]]);

            this.drawLine2D(up, M.add(origin, offset), yColor, 1);
        }

        let hDiff = up[1][0];
        this.drawLine2D(right, origin, xColor, 3);
        offset = [[0], [0], [0]];
        for (let i = 0; i < canvas.width/vDiff * 10; i++) {
            offset = M.add(offset, [[0], [hDiff], [0]]);

            this.drawLine2D(right, M.add(origin, offset), xColor, 1);
        }

        offset = [[0], [0], [0]];
        for (let i = 0; i < canvas.width/hDiff * 10; i++) {
            offset = M.sub(offset, [[0], [hDiff], [0]]);

            this.drawLine2D(right, M.add(origin, offset), xColor, 1);
        }
    }

    drawCamera2D(camera2D, size, color, thickness) {
        c.strokeStyle = color;
        c.fillStyle = color;
        c.lineWidth = thickness;

        let vertices = [
            [-0.5, -0.5, 0.5,  0.5],
            [-0.5,  0.5, 0.5, -0.5],
            [   1,    1,   1,    1]
        ];

        let dVertices = M.multM(camera2D.CFrame, M.multRow(M.multS(vertices, size), 1 / size, 2));
        Interface.drawPolygon(dVertices, true);

        let pos = M.multM(
            camera2D.CFrame,
            [
                [0],
                [0],
                [1]
            ]
        );

        let focus = M.add(M.multS(camera2D.up(), camera2D.Distance), pos);
        let dfocus = camera2D.Distance * Math.tan(camera2D.FoV * 0.5);

        c.beginPath();
        let right = M.add(focus, M.multS(camera2D.right(), dfocus));
        c.moveTo(right[0][0], -right[1][0]);

        let left = M.sub(focus, M.multS(camera2D.right(), dfocus));
        c.lineTo(left[0][0], -left[1][0]);
        c.stroke();

        let sRight = M.add(M.multS(M.sub(right, pos), 100), pos);
        c.beginPath();
        c.moveTo(pos[0][0], -pos[1][0]);
        c.lineTo(sRight[0][0], -sRight[1][0]);
        c.stroke();

        let sLeft = M.add(M.multS(M.sub(left, pos), 100), pos);
        c.beginPath();
        c.moveTo(pos[0][0], -pos[1][0]);
        c.lineTo(sLeft[0][0], -sLeft[1][0]);
        c.stroke();
    }

    static drawPolygon(Vertices, fill) {
        c.strokeStyle = "#ffffff";
        c.fillStyle = "#ffffff";

        let VX = Vertices[0];
        let VY = Vertices[1];

        c.beginPath();
        c.moveTo(VX[0], -VY[0]);
        for (let i = 1; i < VX.length; i++) {
            c.lineTo(VX[i], -VY[i]);
        }
        c.closePath();

        c.stroke();
        if (fill) {
            c.fill();
        }
    }
}
let Int = new Interface();

let O = [
    [1, -0.2, 0],
    [0.2, 1, 0],
    [0, 0, 1]
];

let dV = [
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 1, 1]
];

// dV = [
//     [0,  -1, 0, 0.5, 1,   2, 1, 0.5],
//     [0, 0.5, 1,   2, 1, 0.5, 0,  -1],
//     [1,   1, 1,   1, 1,   1, 1,   1]
// ];

let C1 = [
    [100, -100*Math.sqrt(1/5), 100],
    [0, 100*2*Math.sqrt(1/5), 100],
    [0,   0,   1]
];

let C2 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

let V = M.multM(O, M.multM(C1, dV));

let MainLoop = setInterval(() => {
    canvasUpdate("#111120");

    Int.drawGrid(C2, "#99aaff", "#ffaa99");
}, window.delta);