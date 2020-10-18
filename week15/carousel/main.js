import { createElement } from './framework';
import { Carousel } from './Carousel.js';
import { Button } from './Button.js';
import { List } from './List.js';

let d = [
    {
        img: './images/1.png',
        url: 'https://time.geekbang.org',
        title: 'image 1',
    },{
        img: './images/2.png',
        url: 'https://time.geekbang.org',
        title: 'image 2',
    },{
        img: './images/3.png',
        url: 'https://time.geekbang.org',
        title: 'image 3',
    },{
        img: './images/4.png',
        url: 'https://time.geekbang.org',
        title: 'image 4',
    }
];
/*
let a = 
<Carousel src={d}
    onChange={event => console.log(event.detail.position)}
    onClick={event => window.location.href = event.detail.data}
/>;
*/

/*
let a = <Button>
content
</Button>;
*/

let a = <List data={d}>
{(r) =>
    <div>
        <img style="height: 100px;" src={r.img} />
        <a href={r.url}>{r.title}</a>
    </div>
}
</List>;


a.mountTo(document.body);