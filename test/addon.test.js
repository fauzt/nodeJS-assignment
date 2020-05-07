const assert = require('assert');
const myAddon = require('bindings')('myaddon')

describe('myAddon.cpp tests', () => {
    describe('myAddon.pyWrapped() Test', () => {
        it('should return product 12', () => {
            const result = myAddon.pyWrapped(3,4,"py/mult");
            assert.equal(result, 12);
        })
        it('should return product with default path', () => {
            const result = myAddon.pyWrapped(3,5,"mult.py");
            assert.equal(result, 15);
        })
        it('should return product with directory with "/" in front', () => {
            const result = myAddon.pyWrapped(-3,5,"/py/mult.py");
            assert.equal(result, -15);
        })
    })
})