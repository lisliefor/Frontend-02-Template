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
        for (let r of this.attributes.src) {
            let child = document.createElement('img');
            child.style.height = '150px';
            child.style.marginLeft = '15px';
            child.style.marginTop = '15px';
            child.src = r;
            this.root.appendChild(child);
        }
        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    '../images/1.jpg',
    '../images/2.jpg',
    '../images/3.jpg',
    '../images/4.jpg',
];

let a = <Carousel src={d} />;
a.mountTo(document.body);