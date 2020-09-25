import { Timeline, Animation } from './animation.js';

let t1 = new Timeline();
t1.start();

t1.add(new Animation(document.querySelector('#el').style, 'transform', 0, 500, 2000, 0, null, v => `translateX(${v}px)`));

document.querySelector('#pause-btn').addEventListener('click', evt => {
    t1.pause();
});

document.querySelector('#resume-btn').addEventListener('click', evt => {
    t1.resume();
});