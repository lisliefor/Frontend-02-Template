import { Component, createElement } from './framework.js';

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let r of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${r}')`;
            this.root.appendChild(child);
        }

        let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;

            let nextIndex = (currentIndex + 1) % children.length;
            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
            
            setTimeout(() => {
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;

                currentIndex = nextIndex;
            }, 16); // 16ms = 浏览器一帧的时间
        }, 3000);

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    './images/1.jpg',
    './images/2.jpg',
    './images/3.jpg',
    './images/4.jpg',
];

let a = <Carousel src={d} />;
a.mountTo(document.body);