let obj = {
  name: 111
}

let value = obj.name;
Object.defineProperty(obj, 'name', {
  get() {
    console.log('get')
    return value
  },
  set(newVal) {
    console.log('set', newVal)
    queueWatcher(1)
    value = newVal
  }
})

const queue = []
function flushSchedulerQueue() {
  queue.forEach(item => {
    console.log('queue', item)
  })
  queue.length = 0;
  console.log('flushSchedulerQueue')
}

function queueWatcher(watcher) {
  console.log('queueWatcher')
  queue.push(watcher)
}

setTimeout(() => {
  flushSchedulerQueue()
}, 0);


obj.name = 222
obj.name = 222
obj.name = 222