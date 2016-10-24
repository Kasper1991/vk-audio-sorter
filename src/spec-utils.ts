let expect = require('chai').expect;

export function checkLengthChangeAsync(item: any, promise: Promise<void>, step: number = 1) : Promise<void> {
    let prevLength = item.length;

    console.log(prevLength);

    return promise.then(() => {
        console.log(item.length);
        expect(item.length).to.equals(prevLength + step);
    })
}

export function checkLengthChange(item: any, doChange: () => void, step: number = 1) : void {
    let prevLength = item.length;

    doChange();
    expect(item.length).to.equals(prevLength + step);
}
