const template = require("art-template")

const ret = template.render("hello {{ name }}", {
    name: "Jack"
})

console.log(ret)