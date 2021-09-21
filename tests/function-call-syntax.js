function _arrowSyntax() {
  return () => {};
}

function _babelSyntax() {
  return function () {};
}

function _prototypeSyntax() {
  return Function.prototype();
}

const iterations = 10000000 // 10 million

function create_test_array(arr_size) {
  let test_array = [];
  for (let i = 1; i <= arr_size; i++) {
    test_array.push(`${i+1234567890123456}.hdb`);
  }
  return test_array;
}

const noopList = [_arrowSyntax, _babelSyntax, _prototypeSyntax];

module.exports = {
  iterations,
  create_test_array,
  noopList
};
