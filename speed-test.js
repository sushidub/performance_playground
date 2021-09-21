// bench tests are exported as a list array (noopList) from a separate js file
const {
  noopList, iterations, create_test_array, single_val_arr
} = require('./tests/function-call-syntax.js'); // TODO: require argument should be passed in when invoking the node repl
const test_array = !create_test_array 
  ? !single_val_arr 
    ? null
    : single_val_arr
  : create_test_array(iterations);
const test_val = test_array;
const results = {};


// safely check for the performance module
try {
  performance.now();
} catch (error) {
  performance = require('perf_hooks').performance;
}


// the biz dev
const performanceTest = (func, iterations) => {
  let funcResult = null;
  const before = performance.now();
  
  for(let i = 0; i < iterations; i++) {
    funcResult = func(test_val);
  }
  
  const after = performance.now();
  const elapsed = after - before;
  
  // log results from the tests last iteration
  // console.log("\x1b[36m[%s()]\x1b[0m \t", func.name, funcResult);

  return elapsed.toFixed(6);
}


// run each test in the test list
console.log('running %d speed tests \x1b[33m%s\x1b[0m times each...\n', noopList.length, iterations.toLocaleString());
noopList.forEach( (fn) => {
  results[fn.name] = (performanceTest(fn,iterations));
});


// sort the results for display output
const standings = Object.entries(results);
standings.sort(function (a, b) {
  // a and b are object entries (e.g. [key,value])

  if (a[1] < b[1]) {
    return -1;
  }

  if (a[1] > b[1]) {
    return 1;
  }

  // a[1] and b[1] are equal? not likely this will happen
  return 0;   

});


// display results
console.info("\nSpeed Results");
standings.forEach( (result,idx) => {
  console.log('%d \x1b[36m[%s()]\x1b[0m: \x1b[33m%dms\x1b[0m', idx+1, result[0], results[result[0]]);
});
