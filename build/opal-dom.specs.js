// file spec/dom/add_class_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"add-class-spec\">\n        <div id=\"foo\" class=\"apples\"></div>\n        <div id=\"bar\"></div>\n        <div id=\"baz\" class=\"lemons bananas\"></div>\n        <div id=\"buz\" class=\"mangos\"></div>\n\n        <div id=\"lunch\" class=\"pie beef\"></div>\n        <div id=\"dinner\" class=\"pie chicken\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      var foo = nil, bar = nil;
      
      foo = this.$DOM("#foo");
      foo.$class_name().$should().$eq$("apples");
      foo.$add_class("oranges");
      foo.$class_name().$should().$eq$("apples oranges");
      bar = this.$DOM("#bar");
      bar.$class_name().$should().$eq$("");
      bar.$add_class("pineapples");
      return bar.$class_name().$should().$eq$("pineapples");
    }, __a._s = this, __a), __b.$it("should add the given classname onto the element"));
    (__b = this, __b.$it._p = (__a = function() {

      var baz = nil, buz = nil;
      
      baz = this.$DOM("#baz");
      baz.$add_class("lemons");
      baz.$class_name().$should().$eq$("lemons bananas");
      baz.$add_class("bananas");
      baz.$class_name().$should().$eq$("lemons bananas");
      baz.$add_class("grapes");
      baz.$class_name().$should().$eq$("lemons bananas grapes");
      buz = this.$DOM("#buz");
      buz.$add_class("mangos");
      buz.$class_name().$should().$eq$("mangos");
      buz.$add_class("melons");
      return buz.$class_name().$should().$eq$("mangos melons");
    }, __a._s = this, __a), __b.$it("should not add the classname if the element already has it"));
    (__b = this, __b.$it._p = (__a = function() {

      var spec = nil;
      
      spec = this.$DOM("#add-class-spec");
      return spec.$add_class("wow").$should().$eq$(spec);
    }, __a._s = this, __a), __b.$it("should return self"));
    return (__b = this, __b.$it._p = (__a = function() {

      var pies = nil;
      
      pies = this.$DOM(".pie");
      pies.$size().$should().$eq$(2);
      pies.$add_class("eaten");
      this.$DOM("#lunch").$has_class$p("eaten").$should(this.$be_true());
      return this.$DOM("#dinner").$has_class$p("eaten").$should(this.$be_true());
    }, __a._s = this, __a), __b.$it("should add the class name to each element in the collection"));
  }, __a._s = self, __a), __b.$describe("DOM#add_class"))
})();
// file spec/dom/class_name_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"class-name-spec\">\n        <div id=\"foo\" class=\"whiskey\"></div>\n        <div id=\"bar\" class=\"scotch brandy\"></div>\n        <div id=\"baz\" class=\"\"></div>\n        <div id=\"buz\"></div>\n\n        <div class=\"red dark\"></div>\n        <div class=\"red light\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#foo").$class_name().$should().$eq$("whiskey");
      return this.$DOM("#bar").$class_name().$should().$eq$("scotch brandy");
    }, __a._s = this, __a), __b.$it("should return the DOMs' classname"));
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#baz").$class_name().$should().$eq$("");
      return this.$DOM("#buz").$class_name().$should().$eq$("");
    }, __a._s = this, __a), __b.$it("should return an empty string for DOMs with no classname"));
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM(".red").$class_name().$should().$eq$("red dark")
    }, __a._s = this, __a), __b.$it("should return classname of first element if length > 1"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM(".no-elements").$class_name().$should().$eq$("")
    }, __a._s = this, __a), __b.$it("should return an empty string when length == 0"));
  }, __a._s = self, __a), __b.$describe("DOM#class_name"));
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"set-class-name-spec\">\n        <div id=\"foo\" class=\"\"></div>\n        <div id=\"bar\" class=\"oranges\"></div>\n\n        <div id=\"baz\" class=\"banana\"></div>\n        <div id=\"buz\" class=\"banana\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#foo").$class_name$e("apples");
      return this.$DOM("#foo").$class_name().$should().$eq$("apples");
    }, __a._s = this, __a), __b.$it("should set the given class name on the DOM"));
    (__b = this, __b.$it._p = (__a = function() {

      var bar = nil;
      
      bar = this.$DOM("#bar");
      bar.$class_name().$should().$eq$("oranges");
      bar.$class_name$e("lemons");
      return bar.$class_name().$should().$eq$("lemons");
    }, __a._s = this, __a), __b.$it("should replace any existing classname"));
    return (__b = this, __b.$it._p = (__a = function() {

      var el = nil;
      
      el = this.$DOM(".banana");
      el.$size().$should().$eq$(2);
      el.$class_name$e("pop");
      this.$DOM("#baz").$class_name().$should().$eq$("pop");
      return this.$DOM("#buz").$class_name().$should().$eq$("pop");
    }, __a._s = this, __a), __b.$it("should set the classname on all elements in instance"));
  }, __a._s = self, __a), __b.$describe("DOM#class_name="));
})();
// file spec/dom/has_class_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"has-class-spec\">\n        <div id=\"foo\" class=\"apples\"></div>\n        <div id=\"bar\" class=\"lemons bananas\"></div>\n\n        <div id=\"buz\" class=\"adam\"></div>\n        <div id=\"biz\" class=\"tom\"></div>\n        <div id=\"boz\" class=\"ben\"></div>\n        <div id=\"bez\" class=\"tom arthur\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#foo").$has_class$p("apples").$should(this.$be_true());
      this.$DOM("#foo").$has_class$p("oranges").$should(this.$be_false());
      return this.$DOM("#bar").$has_class$p("lemons").$should(this.$be_true());
    }, __a._s = this, __a), __b.$it("should return true if the DOM has the given class"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM(".tom").$has_class$p("arthur").$should(this.$be_true())
    }, __a._s = this, __a), __b.$it("should return true if any of the elements have the given class"));
  }, __a._s = self, __a), __b.$describe("DOM#has_class?"))
})();
// file spec/dom/html_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"html-spec\">\n        <div id=\"foo\">Hey there</div>\n        <div id=\"bar\"><p>Erm</p></div>\n\n        <div class=\"bridge\">Hello</div>\n        <div class=\"bridge\">Hello as well</div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#foo").$html().$should().$eq$("Hey there");
      return this.$DOM("#bar").$html().$should().$eq$("<p>Erm</p>");
    }, __a._s = this, __a), __b.$it("should return the html content of the DOM"));
  }, __a._s = self, __a), __b.$describe("DOM#html"))
})();
// file spec/dom/id_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"DOM-id-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#foo").$id().$should().$eq$("foo");
      return this.$DOM("#bar").$id().$should().$eq$("bar");
    }, __a._s = this, __a), __b.$it("should return the DOM's id"));
  }, __a._s = self, __a), __b.$describe("DOM#id"))
})();
// file spec/dom/inspect_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"inspect-spec\">\n        <div id=\"foo\"></div>\n        <div class=\"bar\"></div>\n        <p id=\"lol\" class=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$DOM("#foo").$inspect().$should().$eq$("(<div id=\"foo\">)");
      return this.$DOM(".bar").$inspect().$should().$eq$("(<div class=\"bar\">, <p id=\"lol\" class=\"bar\">)");
    }, __a._s = this, __a), __b.$it("should return a string representation of the elements"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM(".empty-collection").$inspect().$should().$eq$("()")
    }, __a._s = this, __a), __b.$it("returns '()' when called on an empty collection"));
  }, __a._s = self, __a), __b.$describe("DOM#inspect"))
})();
// file spec/dom/next_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"next-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#foo").$next().$id().$should().$eq$("bar")
    }, __a._s = this, __a), __b.$it("should return the next sibling"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#bar").$next().$should(this.$be_nil())
    }, __a._s = this, __a), __b.$it("should return nil when no next DOM"));
  }, __a._s = self, __a), __b.$describe("DOM#next"))
})();
// file spec/dom/prev_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"prev-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#bar").$prev().$id().$should().$eq$("foo")
    }, __a._s = this, __a), __b.$it("should return the prev sibling"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#foo").$prev().$should(this.$be_nil())
    }, __a._s = this, __a), __b.$it("should return nil when no prev DOM"));
  }, __a._s = self, __a), __b.$describe("DOM#prev"))
})();
// file spec/dom/remove_class_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"remove-class-spec\">\n        <div id=\"foo\"></div>\n\n        <div id=\"bar\" class=\"lemons\"></div>\n        <div id=\"baz\" class=\"apples oranges\"></div>\n        <div id=\"buz\" class=\"pineapples mangos\"></div>\n\n        <div id=\"bleh\" class=\"fruit\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      var foo = nil;
      
      foo = this.$DOM("#foo");
      foo.$class_name().$should().$eq$("");
      foo.$remove_class("blah");
      return foo.$class_name().$should().$eq$("");
    }, __a._s = this, __a), __b.$it("should have no effect on DOMs without class"));
    return (__b = this, __b.$it._p = (__a = function() {

      var bar = nil, baz = nil, buz = nil;
      
      bar = this.$DOM("#bar");
      bar.$remove_class("lemons");
      bar.$class_name().$should().$eq$("");
      baz = this.$DOM("#baz");
      baz.$remove_class("lemons");
      baz.$class_name().$should().$eq$("apples oranges");
      baz.$remove_class("apples");
      baz.$class_name().$should().$eq$("oranges");
      buz = this.$DOM("#buz");
      buz.$remove_class("mangos");
      buz.$class_name().$should().$eq$("pineapples");
      buz.$remove_class("pineapples");
      return buz.$class_name().$should().$eq$("");
    }, __a._s = this, __a), __b.$it("should remove the given class from the DOM"));
  }, __a._s = self, __a), __b.$describe("DOM#remove_class"))
})();
// file spec/dom/succ_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"succ-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#foo").$succ().$id().$should().$eq$("bar")
    }, __a._s = this, __a), __b.$it("should return the succ sibling"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#bar").$succ().$should(this.$be_nil())
    }, __a._s = this, __a), __b.$it("should return nil when no succ DOM"));
  }, __a._s = self, __a), __b.$describe("DOM#succ"))
})();
// file spec/dom/text_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"text-spec\">\n        <div id=\"foo\">Hey there</div>\n        <div id=\"bar\"></div>\n        <div id=\"baz\"><p>Hey </p>over<span> there</span></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#foo").$text().$should().$eq$("Hey there")
    }, __a._s = this, __a), __b.$it("should return the text content for simple dom nodes"));
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#bar").$text().$should().$eq$("")
    }, __a._s = this, __a), __b.$it("should return an empty string when no text content"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$DOM("#baz").$text().$should().$eq$("Hey over there")
    }, __a._s = this, __a), __b.$it("should return the text content from multiple child nodes"));
  }, __a._s = self, __a), __b.$describe("DOM#text"));
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"set-text-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\">woosh</div>\n        <div id=\"baz\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      var foo = nil;
      
      foo = this.$DOM("#foo");
      foo.$text$e("Hello world");
      return foo.$text().$should().$eq$("Hello world");
    }, __a._s = this, __a), __b.$it("should set simple text contents on DOMs"));
    (__b = this, __b.$it._p = (__a = function() {

      var bar = nil;
      
      bar = this.$DOM("#bar");
      bar.$text().$should().$eq$("woosh");
      bar.$text$e("kapow");
      return bar.$text().$should().$eq$("kapow");
    }, __a._s = this, __a), __b.$it("should replace any current content in the DOM"));
    return (__b = this, __b.$it._p = (__a = function() {

      var baz = nil;
      
      baz = this.$DOM("#baz");
      baz.$text$e("<div><p>lol</p></div>");
      return baz.$text().$should().$eq$("<div><p>lol</p></div>");
    }, __a._s = this, __a), __b.$it("should escape contents correctly"));
  }, __a._s = self, __a), __b.$describe("DOM#text="));
})();
// file spec/kernel/DOM_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$DOM("      <div id=\"dom-spec\">\n        <div id=\"foo\" class=\"bar\"></div>\n        <div class=\"woosh\"></div>\n        <div class=\"woosh\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      (__b = this, __b.$it._p = (__a = function() {

        
        
        this.$DOM("#foo").$class_name().$should().$eq$("bar");
        return this.$DOM("#foo").$size().$should().$eq$(1);
      }, __a._s = this, __a), __b.$it("should return a new DOM with found element"));
      return (__b = this, __b.$it._p = (__a = function() {

        
        
        this.$DOM("#bad-id").$should(this.$be_kind_of(__scope.DOM));
        return this.$DOM("#bad-id").$size().$should().$eq$(0);
      }, __a._s = this, __a), __b.$it("should return an empty DOM collection when no element"));
    }, __a._s = this, __a), __b.$describe("when given an element id"));
    (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      (__b = this, __b.$it._p = (__a = function() {

        var woosh = nil;
        
        woosh = this.$DOM(".woosh");
        woosh.$should(this.$be_kind_of(__scope.DOM));
        return woosh.$size().$should().$eq$(2);
      }, __a._s = this, __a), __b.$it("return a new DOM with all matching elements"));
      return (__b = this, __b.$it._p = (__a = function() {

        var empty = nil;
        
        empty = this.$DOM(".no-maching-classnames");
        empty.$should(this.$be_kind_of(__scope.DOM));
        return empty.$size().$should().$eq$(0);
      }, __a._s = this, __a), __b.$it("returns an empty DOM collection for no matching elements"));
    }, __a._s = this, __a), __b.$describe("when given a generic CSS selector"));
    return (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      return (__b = this, __b.$it._p = (__a = function() {

        var el = nil;
        
        el = this.$DOM("<div id=\"foo-bar-baz\" class=\"woosh\"></div>");
        el.$should(this.$be_kind_of(__scope.DOM));
        el.$id().$should().$eq$("foo-bar-baz");
        el.$class_name().$should().$eq$("woosh");
        return el.$size().$should().$eq$(1);
      }, __a._s = this, __a), __b.$it("should parse it and make it a member of the DOM collection"))
    }, __a._s = this, __a), __b.$describe("when given a string of HTML content"));
  }, __a._s = self, __a), __b.$describe("Kernel#DOM"))
})();
// file spec/spec_helper.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;

  nil
})();
