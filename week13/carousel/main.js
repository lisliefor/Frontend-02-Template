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
