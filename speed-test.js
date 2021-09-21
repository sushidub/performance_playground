// bench tests are exported as a list array (testList) from a separate js file
const {
  testList, iterations, create_test_array, single_val_arr, displayReturns
} = require('./tests/test-method-template.js'); // TODO: require argument should be passed in when invoking the node repl
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

  // console.info("\n\n_____________ %s ______________", func.name);
  console.log("starting %s(...%d arguments) x %d iterations", func.name, test_val.length, iterations);

  for(let i=0; i < iterations; i++) {
    funcResult = func.call(func, test_val);
  }
  
  const after = performance.now();
  const elapsed = after - before;
  
  // log results from the tests last iteration
  if (displayReturns) console.log("last iteration returned: %O\n\n", funcResult);

  return elapsed.toFixed(6);
}

// run each test in the test list
console.log('\n\nrunning %d speed tests \x1b[33m%s\x1b[0m times each with the following arguments:\n\n%O\n\n', testList.length, iterations.toLocaleString(), test_val);
testList.forEach( (fn) => {
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
console.info("\n\nSpeed Results");
standings.forEach( (result,idx) => {
  console.log('%d \x1b[36m%s\x1b[0m: \x1b[33m%dms\x1b[0m', idx+1, result[0], results[result[0]]);
});
