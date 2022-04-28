let mediator = (function () {
    let topics = {};

    let subscribe = function (topic, fn) {
        if (!topics[topic]) {
            topics[topic] = []
        }

        topics[topic].push({ context: this, callback: fn })

        return this
    }

    let publish = function (topic) {
        let args;

        if (!topics[topic]) {
            return false
        }

        args = Array.prototype.slice.call(arguments, 1);
        for (let i = 0; i < topics[topic].length; i++) {
            let subscription = topics[topic][i];

            subscription.callback.apply(subscription.context, args)
        }
        return this
    }

    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function (obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    }
}())