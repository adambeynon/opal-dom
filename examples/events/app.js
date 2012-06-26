(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = __scope.Document, __b.$ready$p._p = (__a = function() {

    var count = nil, __a, __b;
    
    count = 0;
    (__b = this.$Element("#target"), __b.$on._p = (__a = function() {

      
      
      count = count.$plus$(1);
      return this.$Element("#count").$html$e("Click count: " + count);
    }, __a._s = this, __a), __b.$on("click"));
    (__b = this.$Element("#default"), __b.$on._p = (__a = function(e) {

      
      if (e == null) e = nil;

      e.$stop();
      return this.$alert("event should be stopped");
    }, __a._s = this, __a), __b.$on("click"));
    return (__b = this.$Element("#key-clicks"), __b.$on._p = (__a = function(e) {

      var str = nil, __a;
      if (e == null) e = nil;

      str = [];
      if ((__a = e.$shift$p()) !== false && __a !== nil) {
        str.$lshft$("shift")
      };
      if ((__a = e.$ctrl$p()) !== false && __a !== nil) {
        str.$lshft$("ctrl")
      };
      if ((__a = e.$alt$p()) !== false && __a !== nil) {
        str.$lshft$("alt")
      };
      if ((__a = e.$meta$p()) !== false && __a !== nil) {
        str.$lshft$("meta")
      };
      e.$stop();
      return this.$Element("#key-clicks-out").$html$e(str.$join(", "));
    }, __a._s = this, __a), __b.$on("click"));
  }, __a._s = self, __a), __b.$ready$p())
})();