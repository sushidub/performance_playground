const iterations = 5;
const testList = [_test1,_test2,_test3];
let create_test_array = null; // falsy
let single_val_arr = null; // falsy
let displayReturns = true;

function _test1(...arghs) {
  // test 1 bizness
  return arghs[0].map( argh => `${typeof(argh)} : ${argh}` );
}

function _test2(...arghs) {
  // test 2 bizness
  return arghs[0].map( argh => `${Object.getPrototypeOf(argh)} : ${argh}` );
}

function _test3(...arghs) {
  // test 3 bizness
  return arghs[0].map( argh => `${Reflect.getPrototypeOf(Object(argh))} : ${argh}` );
}

// comment the following out to leave the create_test_array export as falsy
/**
  create_test_array = function (arr_size) {
    let test_array = [];
    for (let i = 1; i <= arr_size; i++) {
      test_array.push(`${i+1234567890123456}.hdb`);
    }
    return test_array;
  }
*/

// comment the following out to leave the single_val_arr export as falsy
single_val_arr = [
  [ 'e', 'w' ],
  { e: 'e', w: 'w' },
  'e',
  1234,
  1234.002,
  Date.now(),
  Date.now,
  this
];

module.exports = {
  iterations,
  testList,
  create_test_array,
  single_val_arr,
  displayReturns
};