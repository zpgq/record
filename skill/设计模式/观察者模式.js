function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push( obj)
}

function Subject() {
    this.observes = new ObserverList()
}

Subject.prototype.addObserver = function (observe) {
    this.observes.add(observe)
}

function Observer() {
    this.add = function () {
        
    }
}