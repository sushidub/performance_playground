const Benchmark = require('benchmark');
const {
  noopList, iterations, create_test_array, single_val_arr
} = require('./tests/function-call-syntax.js'); // TODO: require argument should be passed in when invoking the node repl
const test_array = !create_test_array 
  ? !single_val_arr 
    ? null
    : single_val_arr
  : create_test_array(iterations);
const test_val = test_array;
const suite = new Benchmark.Suite;

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
console.info('running %d perf tests', noopList.length);
noopList.forEach( (fn) => {
  suite.add(`${fn.name}`, function() {
    fn(test_val)
  })
});

// add listeners
suite
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('The most efficient method is \x1b[36m[' + this.filter('fastest').map('name') + ']\x1b[0m');
  })
  // run async or not
  .run({ 'async': false });
