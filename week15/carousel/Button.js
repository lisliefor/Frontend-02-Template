import { Component, STATE, ATTRIBUTE, createElement } from './framework.js';
import { enableGesture } from './gesture/gesture.js';

export { STATE, ATTRIBUTE } from './framework.js';

export class Button extends Component {
    constructor() {
        super();
    }

    appendChild(child) {
        if (!this.childContainer) this.render();
        this.childContainer.appendChild(child);
    }

    render() {
        this.childContainer = (<span>111</span>);
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }
}