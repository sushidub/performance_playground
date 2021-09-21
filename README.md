# performance_playground

Read my blog post using this repo - [Performance Testing Javascript & Node with Benchmark.js ](https://dev.to/sljohnsondev/performance-testing-javascript-node-with-benchmark-js-4g1f)

---

At HarperDB, we’re working to build the best distributed database solution from the edge to the cloud. As a software developer on the team, I spend most of my time thinking about how to increase the stability and speed of our codebase – ideally, any work I’m doing achieves both of these priorities.

### Using Benchmark.js to Test Functions in Node
The purpose of this post is to share one way I use Benchmark.js as a framework for quickly testing the most performant way to complete an operation in our code. In our upcoming release slated for late October, we spent a lot of time pulling out our file system code and putting it behind a data layer facade. This allowed me many opportunities to look at more performant options for things both big and small.

The example I’ve chosen to use below is a simple one I created when working through new ways to strip the .hdb file extension from the hash values we retrieve when searching for data in the file system. You can learn more about how we use FS in our patented data model in my last blog post here.

### Setting Up a Benchmark Project
In order to make this as easy as possible, I have a project saved locally that allows me to quickly setup a performance test. I’ve created a sample repo on Github to give you an idea of what this looks like.

When I’m looking to test a new way to complete an operation in the code I’m writing, I create a new directory with a performance-test and test-methods files (or overwrite existing ones) in the “performance-playground” project I have saved locally.

1. In the `test-methods` file, I write up the different functions I am looking to test with a descriptive function name. Usually, I include the initial method as a reference point. If I’m working on refactoring only a small part of a larger function, I will break it out to ensure I’m only testing the specific operation I’m thinking about/working on.
![](blog_assets/SettingUpBenchmark1.png)

2. Once that’s done, I build out the performance-test to run each of the methods I’m testing with the same data I’ve manually set directly in the module, or a larger data set I’ve built out in a loop like the `create_test_array` method above.
![](blog_assets/SettingUpBenchmark2.png)

3. Once I’ve got my test setup, I can run the performance test in my terminal with `npm test` or by manually running the module in WebStorm. I get the following results…
![](blog_assets/SettingUpBenchmark3.png)

### Evaluating the Benchmark Results
The above test clearly shows that `slice()` is the most performant way to remove the `.hdb` file extension from a string. With a clear direction to go, I would normally start thinking about other aspects of the method I’m working on and whether are other ways to tune for performance, but in this instance, updating the method to use `map()` and `slice()` will provide a big performance improvement over the existing method.

While this example is simple, I think it provides a clear, easy-to-use framework for quickly testing different theories around the most performant way to code an operation in JavaScript. There are numerous ways this can be built out to test more robust functions and also with asynchronous methods in Node – e.g. I’ve used this to test different ways of using the async methods in the FS module.
