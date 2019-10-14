const o1 = { name: 'Object A' };
const o2 = new Object(); o2.name = 'Object B';
const o3 = Object(); Object.defineProperty(o3, 'name', { value: 'Object C', enumerable: true });
const o4 = Object.assign({}, { name: 'Object D' });
const o5 = Object.fromEntries([['name', 'Object E']]);
const o6 = Object.create({}, { name: { value: 'Object F', enumerable: true } });

[o1, o2, o3, o4, o5, o6].forEach((obj) => {
    console.log(obj);
});