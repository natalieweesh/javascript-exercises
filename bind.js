Function.prototype.bind = function(obj, args) {
  // 'this' is the function object it's being called on
  return function() {
    this.apply(obj, args)
  };
}

// Test code

// This bit is the same:
function times(num, fun) {
  for (var i = 0; i < 10; i++) {
    // call the function
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  age_one_year: function () {
    this.age += 1;
  }
};

console.log(cat.age);

// This bit is different:
times(10, function () {
  cat.age_one_year();
});

console.log(cat.age);