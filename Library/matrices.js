"use strict"

export class Matrix {
    constructor(rows, columns) {
        let M1 = new Array(rows);

        for (let i = 0; i < rows; i++) {
            M1[i] = new Array(columns);
        }

        return M1;
    }

    static toRandom(rows, columns, min, max) {
        if (!min) {
            min = 0;
        }

        if (!max) {
            max = 1;
        }

        let M1 = new Array(rows);

        for (let i = 0; i < rows; i++) {
            let M1Row = new Array(columns);

            for (let j = 0; j < columns; j++) {
                M1Row[j] = Math.random()*(max - min) + min;
            }

            M1[i] = M1Row;
        }

        return M1;
    }

    static fromRow(M1, i) {
        return Array.from(M1[i]);
    }

    static fromColumn(M1, j) {
        let A1 = new Array(M1.length);

        for (let i = 0; i < A1.length; i++) {
            A1[i] = M1[i][j];
        }

        return Matrix.toVector(A1);
    }

    static toVector(A1) {
        let V1 = new Array(A1.length);
        
        for (let i = 0; i < V1.length; i++) {
            V1[i] = [A1[i]];
        }

        return V1;
    }

    static fromVectors(A1) {
        let V1Length = A1[0].length;

        for (let i = 1; i < A1.length; i++) {
            if (A1[i].length !== V1Length) {
                console.log(`Attempted to concatenate a ${V1length}x1 Vector by a ${A1[i].length}x1 Vector`);
                return undefined;
            }
        }

        let M1 = new Array(A1[0].length);

        for (let i = 0; i < M1.length; i++) {
            let M1Row = new Array(A1.length);

            for (let j = 0; j < M1Row.length; j++) {
                M1Row[j] = A1[j][i][0];
            }

            M1[i] = M1Row;
        }

        return M1;
    }

    static toArray(M1) {
        let A1 = new Array(M1.length * M1[0].length);
        
        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[0];
            let offset = i * M1Row.length;

            for (let j = 0; j < M1Row.length; j++) {
                A1[offset + j] = M1Row[j];
            }
        }

        return A1;
    }

    static map(M1, func) {
        let M2 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[i];
            let M2Row = new Array(M1[0].length);

            for (let j = 0; j < M2Row.length; j++) {
                M2Row[j] = func(M1Row[j]);
            }

            M2[i] = M2Row;
        }

        return M2;
    }

    static add(M1, M2) {
        if (M1.length !== M2.length || M1[0].length != M2[0].length) {
            console.log(`Attempted to add a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[i];
            let M2Row = M2[i];
            let M3Row = new Array(M1[0].length);

            for (let j = 0; j < M3Row.length; j++) {
                M3Row[j] = M1Row[j] + M2Row[j];
            }

            M3[i] = M3Row;
        }

        return M3;
    }

    static sub(M1, M2) {
        if (M1.length !== M2.length || M1[0].length != M2[0].length) {
            console.log(`Attempted to subtract a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[i];
            let M2Row = M2[i];
            let M3Row = new Array(M1[0].length);

            for (let j = 0; j < M3Row.length; j++) {
                M3Row[j] = M1Row[j] - M2Row[j];
            }

            M3[i] = M3Row
        }

        return M3;
    }

    static multS(M1, s) {
        let M2 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[i];
            let M2Row = new Array(M1[0].length);

            for (let j = 0; j < M2Row.length; j++) {
                M2Row[j] = M1Row[j] * s;
            }

            M2[i] = M2Row;
        }

        return M2;
    }

    static multRow(M1, s, i) {
        let M2 = Array.from(M1);
        let M2Row = M2[i];

        for (let j = 0; j < M2Row.length; j++) {
            M2Row[j] = M2Row[j] * s;
        }

        M2[i] = M2Row;

        return M2;
    }


    static multColumn(M1, s, j) {
        let M2 = Array.from(M1);

        for (let i = 0; i < M2.length; i++) {
            M2[i][j] = M2[i][j] * s;
        }

        return M2;
    }

    static multM(M1, M2) {
        if (M1[0].length !== M2.length) {
            console.log(`Attempted to multiply a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M3Row = new Array(M2[0].length);

            for (let j = 0; j < M2[0].length; j++) {
                let M1Row = M1[i];

                let sum = 0;
                for (let k = 0; k < M1[0].length; k++) {
                    sum += M1Row[k] * M2[k][j];
                }

                M3Row[j] = sum;
            }

            M3[i] = M3Row;
        }

        return M3
    }

    static multH(M1, M2) {
        if (M1.length !== M2.length || M1[0].length != M2[0].length) {
            console.log(`Attempted to hadamard a ${M1.length}x${M1[0].length} Matrix by a ${M2.length}x${M2[0].length} Matrix`);
            return undefined;
        }

        let M3 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[i];
            let M2Row = M2[i];
            let M3Row = new Array(M1[0].length);

            for (let j = 0; j < M3Row.length; j++) {
                M3Row[j] = M1Row[j] * M2Row[j];
            }

            M3[i] = M3Row;
        }

        return M3;
    }

    static transpose(M1) {
        let M2 = new Array(M1[0].length);

        for (let i = 0; i < M2.length; i++) {
            let M2Row = new Array(M1.length);

            for (let j = 0; j < M1.length; j++) {
                M2Row[j] = M1[j][i];
            }

            M2[i] = M2Row;
        }

        return M2;
    }

    static normalize(M1) {
        let M2 = Matrix.transpose(M1);
        let M3 = new Array(M1.length);

        let Sums = new Array(M2.length);
        
        for (let i = 0; i < Sums.length; i++) {
            Sums[i] = Math.sqrt(M2[i].reduce((a, b) => a + b**2, 0));
        }

        for (let i = 0; i < M1.length; i++) {
            let M1Row = M1[i];
            let M3Row = new Array(M1Row.length);

            for (let j = 0; j < Sums.length; j++) {
                M3Row[j] = M1Row[j] / Sums[j];
            }

            M3[i] = M3Row;
        }

        return M3;
    }

    static magnitude(M1) {
        let M2 = Matrix.transpose(M1);
        let A1 = new Array(M2.length);
        
        for (let i = 0; i < A1.length; i++) {
            A1[i] = Math.sqrt(M2[i].reduce((a, b) => a + b**2, 0));
        }

        return A1;
    }

    static dot(M1, M2) {
        return Matrix.mult(Matrix.transpose(M1), M2);
    }

    static minor(M1, i, j) {
        if (M1.length === 1 && M1[0].length === 1) {
            console.log("Attempted to take the minor of a 1x1 Matrix");
            return undefined;
        }

        let M2 = new Array(M1.length - 1);

        for (let k = 0, l = 0; l < M2.length; k++, l++) {
            if (k === i) {
                k++;
            }

            let M1Row = M1[k];
            let M2Row = new Array(M1[0].length - 1);

            for (let m = 0, n = 0; n < M2Row.length; m++, n++) {
                if (m === j) {
                    m++;
                }

                M2Row[n] = M1Row[m];
            }

            M2[l] = M2Row;
        }

        return M2;
    }

    static cofactor(M1, i, j) {
        return M[i][j] * Math.pow(-1, i + j) * Matrix.minor(M1, i, j);
    }

    static det(M1) {
        if (M1.length !== M1[0].length) {
            console.log(`Attempted to get the determinant of a non-square ${M1.length}x${M1[0].length} Matrix`);
            return undefined;
        }

        if (M1.length <= 2) {
            if (M1.length === 1 && M1[0].length === 1) {
                return M1.component(1, 1);
            }

            return M1[0][0] * M1[1][1] - M1[0][1] * M1[1][0];
        }

        let M1Row = M1[0];

        let sum = 0;
        for (let j = 0; j < M1.length; j++) {
            sum += M1Row[j] * Math.pow(-1, j) * Matrix.det(Matrix.minor(M1, 0, j));
        }

        return sum;
    }

    static inverse(M1) {
        let M1Det = Matrix.det(M1);

        if (M1Det === 0) {
            console.log(`Attempted to get the inverse of a Matrix with a determinant of 0`);
            return undefined;
        }

        let M2 = new Array(M1.length);

        for (let i = 0; i < M1.length; i++) {
            let M2Row = new Array(M1[0].length);

            for (let j = 0; j < M2Row.length; j++) {
                M2Row[j] = Math.pow(-1, i + j) * Matrix.det(Matrix.minor(M1, i, j));
            }

            M2[i] = M2Row;
        }

        return Matrix.multS(Matrix.transpose(M2), 1 / M1Det);
    }

    static print(M1) {
        let String = "";
        for (let i = 0; i < M1.length; i++) {
            String = `${String}`;

            let M1Row = M1[i];

            for (let j = 0; j < M1[0].length; j++) {
                String = `${String} ${M1Row[j]}`;
            }
            String = `${String}\n`;
        }
        console.log(String);
    }
}