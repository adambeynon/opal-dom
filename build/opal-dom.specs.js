(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"add-class-spec\">\n        <div id=\"foo\" class=\"apples\"></div>\n        <div id=\"bar\"></div>\n        <div id=\"baz\" class=\"lemons bananas\"></div>\n        <div id=\"buz\" class=\"mangos\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      var foo = nil, bar = nil;
      
      foo = this.$Element("#foo");
      foo.$class_name().$should().$eq$("apples");
      foo.$add_class("oranges");
      foo.$class_name().$should().$eq$("apples oranges");
      bar = this.$Element("#bar");
      bar.$class_name().$should().$eq$("");
      bar.$add_class("pineapples");
      return bar.$class_name().$should().$eq$("pineapples");
    }, __a._s = this, __a), __b.$it("should add the given classname onto the element"));
    (__b = this, __b.$it._p = (__a = function() {

      var baz = nil, buz = nil;
      
      baz = this.$Element("#baz");
      baz.$add_class("lemons");
      baz.$class_name().$should().$eq$("lemons bananas");
      baz.$add_class("bananas");
      baz.$class_name().$should().$eq$("lemons bananas");
      baz.$add_class("grapes");
      baz.$class_name().$should().$eq$("lemons bananas grapes");
      buz = this.$Element("#buz");
      buz.$add_class("mangos");
      buz.$class_name().$should().$eq$("mangos");
      buz.$add_class("melons");
      return buz.$class_name().$should().$eq$("mangos melons");
    }, __a._s = this, __a), __b.$it("should not add the classname if the element already has it"));
    return (__b = this, __b.$it._p = (__a = function() {

      var spec = nil;
      
      spec = this.$Element("#add-class-spec");
      return spec.$add_class("wow").$should().$eq$(spec);
    }, __a._s = this, __a), __b.$it("should return self"));
  }, __a._s = self, __a), __b.$describe("Element#add_class"))
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;

  return (__scope.Spec)._scope.Runner.$new().$run()
})();
