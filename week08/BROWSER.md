# DOM API

浏览器API中主要是DOM API，围绕操作DOM而生，它们的基类是Node，最常用的对象是Element和Document。
## Element

导航类操作：
* parentNode：获取父节点
* childNodes：获取子节点
* firstChild：获取第一个子节点
* lastChild：获取最后一个子节点
* nextSibling：获取下一个邻居
* previousSibling：获取上一个邻居
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibling

修改操作：
* appendChild
* insertBefore
* removeChild
* replaceChild

高级操作:
* compareDocumentPosition 是一个用于比较两个节点中关系的函数。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。
* isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
* cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝。

## Element与Attribute

常用方法：
* getAttribute
* setAttribute
* removeAttribute
* hasAttribute

## Document

在js中，dom标准规定必须通过create方法创建对象，而不能使用new运算.
* createElement: 创建html节点
* createTextNode：创建文本节点
* createCDATASection
* createComment: 创建注释节点
* createProcessingInstruction
* createDocumentFragment
* createDocumentType

查找元素的方法
* querySelector
* querySelectorAll
* getElementById
* getElementsByName
* getElementsByTagName
* getElementsByClassName


## DOM事件
事件捕获：从外到里依次触发
事件冒泡：从内到外依次触发
```
//html
<div id="parent">
    <div id="child"></div>
</div>

//javascript
let parent = document.getElementById('parent');
let child = document.getElementById('child');
parent.addEventListener('click', function () {
    console.log('It\'s parent')
}, true);
child.addEventListener('click', function () {
    console.log('Click child2')
})
child.addEventListener('click', function () {
    console.log('Click child')
}, true)

```
点击child元素，输出结果依次是：It's parent，Click child2，Click child。


## Range

用法比较复杂的API，如果掌握它，将能提高你操作DOM的效率。


# CSSOM

CSSOM是对CSS文档的抽象，JS可以通过CSSOM实现对CSS样式的操作。

```
//html
<div id="parent">
    <div id="child">
    </div>
</div>

//css
<style>
    #parent {
        width: 100px;
        height: 200px;
        border: 1px solid red;
    }
    #child {
        width: 50px;
        height: 50px;
        background: red;
    }
</style>
```


一个style标签对应一个CSSStyleSheet，每个style标签中有多个规则。
CSSStyleSheet包含多个cssRules，cssRules不仅包含普通规则对应的CSSStyleRule， 还包含@规则对应的CSSImportRule等，

同时，我们也可以采用insertRule在js中插入指定样式，例如；
```
document.styleSheets[0].insertRule('#parent {background: gray}', 0)
```

当然对应的，我们也可以通过removeRule移除指定样式对象，
```
document.styleSheets[0].removeRule(0)
```
至此，我们就知道了如何在js中修改cssom对象来改变页面样式啦，

重要API：

getComputedStyle： 获取最终页面渲染的样式对象

```
getComputedStyle(document.getElementById('child'))
```

获取页面渲染之后，元素所在盒子的位置信息

* getClientRects
* getBoundingClientRect


# API分类

W3C 标准下的 API：
* Web Audio API
* Web Cryptography API
* Media Source Extensions
* The Screen Orientation API
* Network Information API
* Web MIDI (Musical Instrument Digital Interface ) API
* IndexedDB API
* Gamepad API
* DeviceOrientation Event
* Web App Manifest
* WebVTT: The Web Video Text Tracks Format
* Touch Events
* Scalable Vector Graphics (SVG)
* Resize Observer API
* Intersection Observer
* Mutation Observer
* Cooperative Scheduling of Background Tasks
* Service Worker API
* Payment Request API
* Presentation API
* Web Authentication API

WICG 标准下的 API：
* Input Device Capabilitie
* Web Bluetooth API
* WebUSB API

ECMA 标准下的 API：
* JavaScript 全局变量
* ECMAScript 2018 Internationalization API

WHATWG 标准下的 API：
* Streams
* Encoding
* URL

Khronos 标准下的 API：
* WebGL

未标准化的 API：
* Web Background Synchronization
* WebRTC API
* Document Object Model XPath
* Visual Viewport API
* Performance Timeline API


