export class Dispatcher {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

// listen => recogize => dispatch

export class Listener {
  constructor(element, recoginzer) {
    let isListeningMouse = false;
    let contexts = new Map();

    element.addEventListener("mousedown", (evt) => {
      let context = Object.create(null);
      contexts.set(`mouse${1 << evt.button}`, context);
      recoginzer.start(evt, context);

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
            recoginzer.move(event, context);
          }
          button = button << 1;
        }
      };

      let mouseup = (event) => {
        let context = contexts.get(`mouse${1 << event.button}`);
        recoginzer.end(event, context);
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

    element.addEventListener("touchstart", (event) => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        recoginzer.start(touch, context);
      }
    });

    element.addEventListener("touchmove", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recoginzer.move(touch, context);
      }
    });

    element.addEventListener("touchend", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recoginzer.end(touch, context);
        contexts.delete(touch.identifier);
      }
    });

    // 表示touch事件以异常的方式结束，例如alert会打断事件，触发cancel，而不会触发end
    element.addEventListener("touchcancel", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recoginzer.cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) { this.dispatcher = dispatcher; }
  start(point, context)  {
    (context.startX = point.clientX), (context.startY = point.clientY);
  
    // for flick
    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ];
  
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
  
    context.handler = setTimeout(() => {
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      context.handler = null;
      this.dispatcher.dispatch('press', {});
    }, 500);
  };

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
  
    // 移动超过10px（一倍屏：5px；三倍屏：15px）
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      this.dispatcher.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      });
      clearTimeout(context.handler);
    }
  
    if (context.isPan) {
      console.log(dx, dy);
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      });
    }
    // 只存0.5秒内的点
    context.points = context.points.filter((p) => Date.now() - p.t < 500);
  
    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ];
  };
  end (point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch("tap", {});
      clearTimeout(context.handler);
    }
    if (context.isPress) {
      this.dispatcher.dispatch("pressend", {});
    }
  
    context.points = context.points.filter((p) => Date.now() - p.t < 500);
  
    let d, v;
    if (!context.points.length) v = 0;
    else {
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      );
      v = d / (Date.now() - context.points[0].t);
      console.log(d, v);
    }
  
    if (v > 1.5) {
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      });
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      this.dispatcher.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
      });
    }
  };
  cancel (point, context) {
    clearTimeout(context.handler);
    this.dispatcher.dispatch('cancel', {});
  };
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)));
}
