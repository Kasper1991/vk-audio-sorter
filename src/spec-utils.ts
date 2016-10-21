let expect = require('chai').expect;

export function checkLengthChangeAsync(item: any, promise: Promise<void>, step: number = 1) : Promise<void> {
    let prevLength = item.length;

    return promise.then(() => {
        expect(item.length).to.equals(prevLength + step);
    })
}
