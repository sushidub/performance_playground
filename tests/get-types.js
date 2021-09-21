// efficiency in getting a useful type from a token argument

function _typeof(token) {
  return typeof(token);
}

function _prototypeOf(token) {
  return Object.getPrototypeOf(token);
}

function _symbol(token) {
  return token[Symbol.toStringTag]
}

const iterations = 100000; // (10000000, 10 million)

function create_test_array(arr_size) {
  let test_array = [];
  for (let i = 1; i <= arr_size; i++) {
    test_array.push(["e","w"],{e: "e",w: "w"},"e",1234,1234.002,Date.now());
  }
  return test_array;
}

const noopList = [_typeof, _prototypeOf, _symbol];

module.exports = {
  iterations,
  create_test_array,
  noopList
};
