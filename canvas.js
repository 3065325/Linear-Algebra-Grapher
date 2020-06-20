"use strict"

export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export let mouse = {x: 0, y: 0};
export let delta = 1000/240;

export let vw = canvas.width / 100;
export let vh = canvas.height / 100;

export function canvasUpdate(color) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    vw = canvas.width / 100;
    vh = canvas.height / 100;
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.translate(canvas.width / 2, canvas.height / 2);
}

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x - canvas.width / 2;
    mouse.y = e.y - canvas.height / 2;
})