const { calculateTip,fahrenheitToCelsius } = require('../src/math')

test('should calculate the tip and the total',() => {
    const total = calculateTip(10,0.3)

    if(total !== 13) {
        throw new Error('total tip should be 13 and we got '+total)
    }
}) //不好的方法


test('should calculate the tip and the total better solution',() => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('for fahrenheitToCelsius',() => {
    const ans = fahrenheitToCelsius(50)
    expect(ans).toBe(10);
})


test('async test demo',(done) => {
    setTimeout(() => {
        expect(2).toBe(2)
        done()
    },2000)
    
})

function add(a,b) {
    return a+b;
}

test('should add two number',() => {
    const ans = add(3,4);
    expect(ans).toBe(7)
})