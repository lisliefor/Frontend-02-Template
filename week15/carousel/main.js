import { createElement } from './framework';
import { Carousel } from './carousel.js';

let d = [
    {
        img: './images/1.png',
        url: 'https://time.geekbang.org',
    },{
        img: './images/2.png',
        url: 'https://time.geekbang.org',
    },{
        img: './images/3.png',
        url: 'https://time.geekbang.org',
    },{
        img: './images/4.png',
        url: 'https://time.geekbang.org',
    }
];

let a = 
<Carousel src={d}
    onChange={event => console.log(event.detail.position)}
    onClick={event => window.location.href = event.detail.data}
/>;
a.mountTo(document.body);
