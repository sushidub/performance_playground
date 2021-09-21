// bench tests are exported as a list array (noopList) from a separate js file
const {
  noopList, iterations, create_test_array
} = require('./tests/get-types'); // TODO: require argument should be passed in when invoking the node repl

test_array = create_test_array(iterations);
const single_val_arr = [];
const test_val = test_array;


// safely check for the performance module
try {
  performance.now();
} catch (error) {
  performance = require('perf_hooks').performance;
}


// the biz dev
const performanceTest = (func, iterations) => { 
  const before = performance.now();
  
  for(let i = 0; i < iterations; i++) {
    func(test_val);
  }
  
  const after = performance.now();
  const elapsed = after - before;
  
  return elapsed.toFixed(6);
}
const results = {};


// run each test in the test list
console.info('running %d speed tests \x1b[33m%s\x1b[0m times each...\n', noopList.length, iterations.toLocaleString());
noopList.forEach( (fn) => {
  results[fn.name] = (performanceTest(fn,iterations));
  // console.info('\x1b[36m%s()\x1b[0m \x1b[33m%s\x1b[0m', [fn.name], results[fn.name]);
});


// sort the results for display output
var standings = Object.entries(results);
standings.sort(function (a, b) {
  let thing_a, thing_b;

  if (a instanceof Array) {
    // since a and b are Object.entries,
    // the object key will be a[0], and its value will be a[1]
    thing_a = a[1]; // our test returns results in a value of [x]milliseconds
    thing_b = b[1]; // so a and b are assumed to be float types here
  }

  if (thing_a < thing_b) {
    return -1;
  }

  if (thing_a > thing_b) {
    return 1;
  }

  return 0;     // thing_a and thing_b must be equal at this point

});


// display results
console.info("Speed Results");
standings.forEach( (result,idx) => {
  console.info('%d \x1b[36m[%s()]\x1b[0m: \x1b[33m%dms\x1b[0m', idx+1, result[0], results[result[0]]);
});
