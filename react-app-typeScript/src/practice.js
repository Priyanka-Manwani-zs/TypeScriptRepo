// a = "3";
// console.log(this);
// function print() {
//   a = "2";
//   console.log(this.a);
// }
// print();

let a;
const obj = {
  a: 1,
  fn: function check(arg) {
    console.log(this.a + arg);
  },
};

// obj.fn.call({ a: "4" }, 8);
// obj.fn();
const ch = obj.fn.bind({ a: 4 }, 8);
obj.fn.call({ a: 4 }, 8);
const bh = obj.fn.apply({ a: 4 }, [8]);

ch();
