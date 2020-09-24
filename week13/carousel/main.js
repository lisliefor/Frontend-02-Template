import { createElement } from './framework';
import { Carousel } from './carousel.js';
import { Timeline, Animation } from './animation.js';

let d = [
    './images/1.png',
    './images/2.png',
    './images/3.png',
    './images/4.png',
];

let a = <Carousel src={d} />;
a.mountTo(document.body);

let t1 = new Timeline();
t1.add(new Animation({ set a(v) { console.log(v); } }, 'a', 0, 100, 1000, null));
t1.start();