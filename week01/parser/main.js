var brackets = require("g2-bracket-parser");

const compoundModeRegular = /^(and|AND|or|OR|\(|\)| |\d|\[|\])*$/;

const parseTree = (source, targetTree) => {
    for (const rs of source) {
      const obj = {};
      if (rs && rs.match) {
        obj.t = rs.match.content;
        obj.bs = rs.match.src;
        obj.isRoot = true;
      } else if (rs && rs.content && rs.src) {
        obj.t = rs.content;
        obj.bs = rs.src;
      }
      if (rs.match && rs.match.children && rs.match.children.length > 0) {
        obj.children = [];
        parseTree(rs.match.children, obj.children);
      } else if (rs.children && rs.children.length > 0) {
        obj.children = [];
        parseTree(rs.children, obj.children);
      }
      targetTree.push(obj);
    }
  };
  
  const renewBS = (n, delIdx, parentNode, bsAry) => {
    let idx = bsAry.indexOf(delIdx.toString());
    if (idx === -1) idx = bsAry.indexOf(`(${delIdx.toString()}`);
    if (idx === -1) idx = bsAry.indexOf(`${delIdx.toString()})`);
  
    if (idx === 0) {
      if (bsAry.length <= 1) {
        n.nbs = '';
        return 'break';
      }
      // 去掉头部元素和第一个连接符(and || or)
      bsAry.shift();
      bsAry.shift();
    } else if (idx === bsAry.length - 1) {
      // 去掉尾部元素和最后一个连接符(and || or)
      bsAry.pop();
      bsAry.pop();
    } else {
      bsAry.splice(idx - 1, 1);
      bsAry.splice(idx - 1, 1);
    }
    n.nbs = bsAry.join(' ');
    if (n.nbs === `(${n.t})`) n.nbs = n.t;
  
    // 更新父节点
    if (n.nbs && parentNode) {
      parentNode.nbs = parentNode.bs.replace(n.bs, n.nbs);
    }
  };
  
  const rebuildCondition = (tree, delIdx, parentNode) => {
    for (const n of tree) {
      if (n.children && n.children.length > 0) {
        const tAry = n.t.split(' ');
        const bsAry = n.bs.split(' ');
        // 删除序号可能不包含在括号内
        if (
          tAry.indexOf(delIdx.toString()) === -1 &&
          tAry.indexOf(`(${delIdx.toString()}`) === -1 &&
          tAry.indexOf(`${delIdx.toString()})`) === -1 &&
          (bsAry.indexOf(delIdx.toString()) > -1 ||
            bsAry.indexOf(`(${delIdx.toString()}`) > -1 ||
            bsAry.indexOf(`${delIdx.toString()})`) > -1)
        ) {
          const rs = renewBS(n, delIdx, parentNode, bsAry);
          if (rs === 'break') break;
        } else {
          rebuildCondition(n.children, delIdx, n);
          // 如果有更新，则继续传递到上一层节点
          if (n.nt && parentNode) {
            if (n.nt.indexOf('and') === -1 && n.nt.indexOf('or') === -1)
              parentNode.nt = parentNode.t.replace(`(${n.t})`, n.nt);
            else parentNode.nt = parentNode.t.replace(n.t, n.nt);
          }
          if (n.nbs && parentNode) {
            parentNode.nbs = parentNode.bs.replace(n.bs, n.nbs);
          }
        }
      } else {
        const ary = n.t.split(' ');
        const idx = ary.indexOf(delIdx.toString());
        if (idx === -1) {
          const tAry = n.t.split(' ');
          const bsAry = n.bs.split(' ');
          // 删除序号可能不包含在括号内
          if (
            tAry.indexOf(delIdx.toString()) === -1 &&
            tAry.indexOf(`(${delIdx.toString()}`) === -1 &&
            tAry.indexOf(`${delIdx.toString()})`) === -1 &&
            (bsAry.indexOf(delIdx.toString()) > -1 ||
              bsAry.indexOf(`(${delIdx.toString()}`) > -1 ||
              bsAry.indexOf(`${delIdx.toString()})`) > -1)
          ) {
            const rs = renewBS(n, delIdx, parentNode, bsAry);
            if (rs === 'break') break;
          }
        } else {
          if (idx === 0) {
            if (ary.length <= 1) {
              n.nt = '';
              break;
            } else {
              // 去掉头部元素和第一个连接符(and || or)
              ary.shift();
              ary.shift();
            }
          } else if (idx === ary.length - 1) {
            // 去掉尾部元素和最后一个连接符(and || or)
            ary.pop();
            ary.pop();
          } else {
            ary.splice(idx - 1, 1);
            ary.splice(idx - 1, 1);
          }
          n.nt = ary.join(' ');
  
          // 更新父节点
          if (n.nt && parentNode) {
            if (n.nt.indexOf('and') === -1 && n.nt.indexOf('or') === -1)
              parentNode.nt = parentNode.t.replace(`(${n.t})`, n.nt);
            else parentNode.nt = parentNode.t.replace(n.t, n.nt);
          }
        }
      }
    }
  };
  
  const adaptConditionChange = (conditionString, delIdx, withSquare) => {
    if (!conditionString || conditionString.length === 0) return;
    if (!compoundModeRegular.test(conditionString)) return;
  
    const sor = brackets(withSquare ? conditionString.replace(/\[/g, '').replace(/\]/g, '') : conditionString);
    const tree = [];
    parseTree(sor, tree);
    rebuildCondition(tree, delIdx, null);
  
    let cs = withSquare ? conditionString.replace(/\[/g, '').replace(/\]/g, '') : conditionString;
    // 处理序号没有包含在任何括号中的情况
    let flag = false;
    for (const t of tree) {
      const ary = t.bs
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .split(' ');
      if (ary.indexOf(delIdx.toString()) > -1) {
        flag = true;
      }
      if (t.nt !== undefined) {
        if (t.nt.indexOf('and') === -1 && t.nt.indexOf('or') === -1)
          cs = cs.replace(`(${t.t})`, t.nt);
        else cs = cs.replace(t.t, t.nt);
      }
      if (t.nbs !== undefined) {
        cs = cs.replace(t.bs, t.nbs);
      }
    }
  
    if (!flag) {
      const csAry = cs.split(' ');
      const csIdx = csAry.indexOf(delIdx.toString());
      if (csIdx === 0) {
        csAry.shift();
        csAry.shift();
      } else if (csIdx === csAry.length - 1) {
        csAry.pop();
        csAry.pop();
      } else {
        csAry.splice(csIdx - 1, 1);
        csAry.splice(csIdx - 1, 1);
      }
      cs = csAry.join(' ');
    }
  
    // 重编序号
    let count = 0;
    const rstAry = cs.split(' ');
    for (let i = 0; i < rstAry.length; i++) {
      const r = rstAry[i];
      if (['and', 'or'].indexOf(r) === -1) {
        count++;
        const key = r.replace(/\(/g, '').replace(/\)/g, '');
        rstAry[i] = r.replace(key, withSquare ? `[${count}]` : `${count}`);
      }
    }
  
    // 不重编序号直接返回cs
    return rstAry.join(' ');
  };
  
// (1 or 2) and (3 or (4 and (5 or 6))) and 7
const originStr = "[1] and ([2] or [3]) and [4]";
const del = 1;
const str = adaptConditionChange(originStr, del, true);
console.log(originStr);
console.log(del);
console.log(str);
