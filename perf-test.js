const Benchmark = require('benchmark');
const {
  testList, iterations, create_test_array, single_val_arr, displayReturns
} = require('./tests/test-method-template.js'); // TODO: require argument should be passed in when invoking the node repl
const test_array = !create_test_array 
  ? !single_val_arr 
    ? null
    : single_val_arr
  : create_test_array(iterations);
const test_val = test_array;
const suite = new Benchmark.Suite;

// optionally store and display the returned values for each test
suite.options.showResults = displayReturns;
suite.results = [];
suite.displayResults = (result) => {
  return console.info("returned: \t%O\n\n", result.returned);
};

// modified for output readability
Benchmark.prototype.toString = function modified_toStringBench() {
  var bench = this,
      error = bench.error,
      hz = bench.hz,
      id = bench.id,
      stats = bench.stats,
      size = stats.sample.length,
      pm = '\xb1',
      result = '\x1b[36m[' + bench.name + '()]\x1b[0m' || (_.isNaN(id) ? id : '<Test #' + id + '>');

  if (error) {
    var errorStr;
    if (!_.isObject(error)) {
      errorStr = String(error);
    } else if (!_.isError(Error)) {
      errorStr = join(error);
    } else {
      // Error#name and Error#message properties are non-enumerable.
      errorStr = join(_.assign({ 'name': error.name, 'message': error.message }, error));
    }
    result += ': ' + errorStr;
  }
  else {
    result += ' x \x1b[33m' + Benchmark.formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec\x1b[0m ' + pm +
      stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';
  }
  return result;
}

// stack and start bench tests
console.info('running %d perf tests\n', testList.length);
testList.forEach( (fn,idx) => {
  suite.add(`${fn.name}`, function() {
    if (suite.options.showResults) {
      suite.results[fn.name] = {};
      suite.results[fn.name].idx = idx;
      suite.results[fn.name].fn = testList[idx];
      suite.results[fn.name].returned = fn.call(fn, test_val);
    } else {
      // we bind our 'this' to the tests scope
      // TODO: probably need to make the 'this' binding optional
      fn.call(fn, test_val);
    }
  })
});

// add listeners
suite
  .on('cycle', function(event) {
    // OP's original individual bench metrics for each test
    console.log(String(event.target));
    
    // display returned values from each test*
    // TODO: need to add an escape or break condition for suites using create_test_array vs. single_val_arr array
    if (this.options.showResults) {
      this.displayResults(this.results[event.target.name]);
    }
  })
  .on('complete', function(event) {
    const podium = this.filter('fastest')[0];
    console.log('Perf Results\nThe most efficient method is \x1b[36m%s\x1b[0m\n\x1b[2m%s\x1b[0m\n', podium.name, testList.find(test => test.name === podium.name));
  })
  // run async or not
  .run({ 'async': false });
