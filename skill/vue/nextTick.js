const callbacks = []
let padding = false;

function flushCallback () {
  padding = false;
  const copies = callbacks.slice(0)
  callbacks.length = 0;
  for (const key in copies) {
    copies[key]()
  }
}

let microTimerFunc
const p = Promise.resolve()
microTimerFunc = () => {
  p.then(flushCallback)
}

function nextTick (cb, ctx) {
  // 反复调用nextTick 只会将回调添加到回调列表中缓存起来
  callbacks.push(() => {
    if(cb) {
      cb.call(ctx)
    }
  })
  // 反复调用nextTick 只会向任务队列中添加一个任务, 既第一次调用nextTick的时候
  if(!padding) {
    padding = true;
    microTimerFunc();
  }
}

nextTick(function() {
  console.log(this.name)
}, {name: 'banne'})