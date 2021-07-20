"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepAssign = require('deep-assign');
const chai_1 = require("chai");
describe('deep-assign', function () {
    it('simple object deep assign', () => {
        const result = deepAssign({}, { test: true });
        chai_1.expect(result.hasOwnProperty('test')).to.be.equal(true);
    });
    it('simple array deep assign', () => {
        const result = deepAssign([], [0, 1]);
        result.forEach((item, index) => {
            chai_1.expect(item).to.be.equal(index);
        });
    });
    it('simple array undefined deep assign', () => {
        chai_1.expect(() => deepAssign(undefined, [0, 1])).to.be.throws();
    });
    it('simple array deep assign with potential conflict ', () => {
        deepAssign([10, 20, 2], [0, 1]).forEach((item, index) => {
            chai_1.expect(item).to.be.equal(index);
        });
    });
});
