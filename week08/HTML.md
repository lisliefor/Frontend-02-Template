## DTD

DTD全名Document Type Defination，文档类型定义，主要描述文档使用哪种类型或标准,这些标准包含哪些标签，以及如何使用这些标签。例如：
```
<!DOCTYPE html>
```
注：HTML5 仍然保留了 HTML 语法和 XHTML 语法。

## HTML语法

合法元素：
* Element: <tagName></tagName>
* Text: 文本节点
* Comment：注释节点 <!-- --> 
* DocumentType：<!Doctype html>
* CDATA: 另一种文本节点（不会发生转义）

字符引用：
* &amp: 表示&字符
* &lt: 表示小于号 <
* &gt: 表示大于号 > 
* &quot：表示双引号 "
* &nbsp：表示空格

例如:
```
<p>&amp &lt &gt &quot </p>
```

## 语义化标签
#### 一. 何为标签语义化？

* 它是一种规范约定，赋予标签不同的内涵，在显示上有所区别的情况下，也让分析网页有一些默认的依据。

#### 二. 使用标签语义化的好处


* 阅读友好，易于团队的开发和维护
* 有利于搜索引擎检索，有利于SEO优化


### 三. 常见语义化场景及对应标签

* aside: 侧边栏
* article: 文章
* hgroup，h1,h2: 通常用于标题组合
```
<hgroup>
    <h1>Hello world! </h1>
    <h2>I'm Eason.</h2>
</hgroup>
```
* abbr: 表示缩写
```
<abbr title="World Wide Web">WWW</abbr>.
```
* hr： 分割线
* p： 段落
* strong: 表示某个词很重要，着重体现，加粗显示
* time： 表示时间标签
* blockquote,q,cite
* figure,figcaption: 主要用于表示和主文章相关的图片，照片呢等内容
```
<figure>
    <img src="http://www.baidu.com/img/flexible/logo/pc/result@2.png"/>
    <figcaption>The NeXT Computer used by Tim Berners-Lee at CERN.</figcaption>
</figure>
```
* dfn: 通常用来包裹被定义的名词
* nav,ul,ol：表示导航，列表
* pre: 表示显示带有格式的文本
* code： 表示代码，通常和pre搭配使用



## 元信息类标签

#### 一. 什么是元信息类标签？

元信息指描述自身的信息。元信息类标签是HTML用于描述文档自身的标签。它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。

元信息多数情况下是给浏览器、搜索引擎等机器阅读的，有时候这些信息会在页面之外显示给用户，有时候则不会。

元信息类标签主要有：
* head
* title
* base
* meta

#### 二. head
head 标签本身不携带信息，它主要是作为其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。
```
<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
    </body>
</html>
```
#### 三. title
主要是考虑到 title 作为元信息，可能会被用在浏览器收藏夹、微信推送卡片、微博等各种场景，这时侯往往是上下文缺失的，所以 title 应该是完整地概括整个网页内容的。

#### 四. base

base 历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。

base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，建议用script替代

#### 五. meta
在 head 中可以出现任意多个meta标签。一般的meta标签由name和content 两个属性来定义。name表示元信息的名，content则用于表示元信息的值。

1. 具有charset属性的meta

```
  <meta charset="UTF-8" >
```
主要用于定义html文档的编码格式。


2. 具有http-equiv属性的meta

下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。
```
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```

3. 具有viewport属性的meta

典型的一个应用场景是移动端适配的网页，需要设置如下代码，表示应该把用户缩放功能禁止掉，宽度设为设备宽度。
```
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

## 替换型元素

首先说一下什么事替换型元素？

顾名思义，替换型元素就是把外部文件引入，来替换掉自身标签的内容。

常见替换型元素：script，img, audio, vedio, picture, iframe等

#### script

script标签既可以作为替换型元素，也可以作为非替换型元素
```
//作为非替换型元素
<script type="text/javascript">
console.log("Hello world!");
</script>

//作为替换型元素
<script type="text/javascript" src="index.js"></script>
```
说到这儿，就不能不能提style标签呢，style是一个非替换型元素，不能使用src属性，如果想引入外部样式文件，是使用link标签

```
<link herf="./common.css"></link>
```
> 凡是替换型元素，都是使用 src 属性来引用文件的，链接型元素是使用 href 标签的。

#### img
```
<img src="./a.png"></img>
```
#### picture
```
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>
```

#### iframe
```
<iframe href="./test.html"></iframe>
```
#### vedio
```
<vedio href="./test.mp4"></vedio>
```
#### audio
```
<audio href="./test.,mp4"></audio>
```

