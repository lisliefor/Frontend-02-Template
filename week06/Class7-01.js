/**
 * 编写一个 match 函数。它接受两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。
 * 这个元素你可以认为它一定会在一棵 DOM 树里面。通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。
 * （不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）
 * 以下是一个调用的例子。
 * @param {string} selector 
 * @param {HTML DOM} element 
 */
function match(selector, element) {
  const reg = /(#|.)?[\w]+/g;
  const ary = selector.split(' ');
  if (ary && ary.length > 0) {
    // 字符串性质
    for (const a of ary) {
      if (element && a.toUpperCase() === element.tagName) return true;
      const secList = a.match(reg);
      if (secList && secList.length > 0) {
        for (const s of secList) {
          return eleMatch(s, element);
        }
      }
    }
  }
  return false;
}

function eleMatch(s, e) {
  if (e && s && s.toUpperCase() === e.tagName) return true;
  if (s.startsWith('.')) {
    const cls = e.className || '';
    return cls.split(' ').some(v => (v === s.replace('.', '')));
  }
  if (s.startsWith('#')) return element.id === s.replace('#', '');
  return false;
}

match("div #id.class", document.getElementById("id"));
