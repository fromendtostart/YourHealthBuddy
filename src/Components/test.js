const a = "a, b, c, d"
const b = a.split(",").map((arg) => ({"workout" : arg, "number" : 0}))

console.log(b);