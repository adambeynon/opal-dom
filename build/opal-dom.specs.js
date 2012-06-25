// file spec/element/add_class_spec.rb
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
// file spec/element/has_class_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"has-class-spec\">\n        <div id=\"foo\" class=\"apples\"></div>\n        <div id=\"bar\" class=\"lemons bananas\"></div>\n\n        <div id=\"buz\" class=\"adam\"></div>\n        <div id=\"biz\" class=\"tom\"></div>\n        <div id=\"boz\" class=\"ben\"></div>\n        <div id=\"bez\" class=\"tom arthur\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#foo").$has_class$p("apples").$should(this.$be_true());
      this.$Element("#foo").$has_class$p("oranges").$should(this.$be_false());
      return this.$Element("#bar").$has_class$p("lemons").$should(this.$be_true());
    }, __a._s = this, __a), __b.$it("should return true if the element has the given class"));
  }, __a._s = self, __a), __b.$describe("Element#has_class?"))
})();
// file spec/element/next_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"next-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#foo").$next().$id().$should().$eq$("bar")
    }, __a._s = this, __a), __b.$it("should return the next sibling"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#bar").$next().$should(this.$be_nil())
    }, __a._s = this, __a), __b.$it("should return nil when no next element"));
  }, __a._s = self, __a), __b.$describe("Element#next"))
})();
// file spec/element/prev_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"prev-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#bar").$prev().$id().$should().$eq$("foo")
    }, __a._s = this, __a), __b.$it("should return the prev sibling"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#foo").$prev().$should(this.$be_nil())
    }, __a._s = this, __a), __b.$it("should return nil when no prev element"));
  }, __a._s = self, __a), __b.$describe("Element#prev"))
})();
// file spec/element/remove_class_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"remove-class-spec\">\n        <div id=\"foo\"></div>\n\n        <div id=\"bar\" class=\"lemons\"></div>\n        <div id=\"baz\" class=\"apples oranges\"></div>\n        <div id=\"buz\" class=\"pineapples mangos\"></div>\n\n        <div id=\"bleh\" class=\"fruit\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      var foo = nil;
      
      foo = this.$Element("#foo");
      foo.$class_name().$should().$eq$("");
      foo.$remove_class("blah");
      return foo.$class_name().$should().$eq$("");
    }, __a._s = this, __a), __b.$it("should have no effect on elements without class"));
    return (__b = this, __b.$it._p = (__a = function() {

      var bar = nil, baz = nil, buz = nil;
      
      bar = this.$Element("#bar");
      bar.$remove_class("lemons");
      bar.$class_name().$should().$eq$("");
      baz = this.$Element("#baz");
      baz.$remove_class("lemons");
      baz.$class_name().$should().$eq$("apples oranges");
      baz.$remove_class("apples");
      baz.$class_name().$should().$eq$("oranges");
      buz = this.$Element("#buz");
      buz.$remove_class("mangos");
      buz.$class_name().$should().$eq$("pineapples");
      buz.$remove_class("pineapples");
      return buz.$class_name().$should().$eq$("");
    }, __a._s = this, __a), __b.$it("should remove the given class from the element"));
  }, __a._s = self, __a), __b.$describe("Element#remove_class"))
})();
// file spec/element/succ_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"succ-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#foo").$succ().$id().$should().$eq$("bar")
    }, __a._s = this, __a), __b.$it("should return the succ sibling"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#bar").$succ().$should(this.$be_nil())
    }, __a._s = this, __a), __b.$it("should return nil when no succ element"));
  }, __a._s = self, __a), __b.$describe("Element#succ"))
})();
// file spec/spec_helper.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;

  nil
})();
