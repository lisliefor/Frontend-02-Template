let ele = document.documentElement;

let contexts = new Map();
let isListeningMouse = false;

ele.addEventListener("mousedown", (evt) => {
  let context = Object.create(null);
  contexts.set(`mouse${1 << evt.button}`, context);
  start(evt, context);

  let mousemove = (event) => {
    // 掩码
    // event.buttons = 0b0001 左键
    // event.buttons = 0b0010 右键
    let button = 1;
    while (button <= event.buttons) {
      if (button & event.buttons) {
        // 对event buttons排序
        let key;
        if (button === 2) key = 4;
        else if (button === 4) key = 2;
        else key = button;
        let context = contexts.get(`mouse${key}`);
        move(event, context);
      }
      button = button << 1;
    }
  };

  let mouseup = (event) => {
    let context = contexts.get(`mouse${1 << event.button}`);
    end(event, context);
    contexts.delete(`mouse${1 << event.button}`);

    if (event.buttons === 0) {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      isListeningMouse = false;
    }
  };
  if (!isListeningMouse) {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    isListeningMouse = true;
  }
});


ele.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
});

ele.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    move(touch, context);
  }
});

ele.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    end(touch, context);
    contexts.delete(touch.identifier);
  }
});

// 表示touch事件以异常的方式结束，例如alert会打断事件，触发cancel，而不会触发end
ele.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier);
    cancel(touch, context);
    contexts.delete(touch.identifier);
  }
});

let start = (point, context) => {
  // console.log('start', point.clientX, point.clientY);
  context.startX = point.clientX, context.startY = point.clientY;

  // for flick
  context.points = [{
    t: Date.now(),
    x: point.clientX,
    y: point.clientY,
  }];

  context.isTap = true;
  context.isPan = false;
  context.isPress = false;

  handler = setTimeout(() => {
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    context.handler = null;
    // console.log('press');
  }, 500);
}

let move = (point, context) => {
  let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

  // 移动超过10px（一倍屏：5px；三倍屏：15px）
  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log('pan start');
    clearTimeout(context.handler);
  }

  if (context.isPan) {
    console.log(dx, dy);
    console.log('pan');
  }
  // 只存0.5秒内的点
  context.points = context.points.filter(p => ((Date.now() - p.t) < 500));

  context.points = [{
    t: Date.now(),
    x: point.clientX,
    y: point.clientY,
  }];

  // console.log('move', point.clientX, point.clientY);
}

let end = (point, context) => {
  if (context.isTap) {
    dispatch('tap', {});
    clearTimeout(context.handler);
  }
  if (context.isPan) {
    console.log('pan end');
  } 
  if (context.isPress) {
    console.log('press end');
  }

  context.points = context.points.filter(p => ((Date.now() - p.t) < 500));

  let d, v;
  if (!context.points.length) v = 0;
  else {
    d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
    v = d / (Date.now() - context.points[0].t);
  }

  if (v > 1.5) {
    console.log('flick');
    context.isFlick = true;
  } else {
    context.isFlick = false;
  }

  console.log(v);
  // console.log('end', point.clientX, point.clientY);
}

let cancel = (point, context) => {
  clearTimeout(context.handler);
  console.log('cancel', point.clientX, point.clientY);
}

function dispatch(type, properties) {
  let event = new Event(type);
  for (let name in properties) {
    event[name] = properties[name];
  }
  ele.dispatchEvent(event);
}