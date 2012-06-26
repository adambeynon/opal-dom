// file spec/dom/add_class_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"add-class-spec\">\n        <div id=\"foo\" class=\"apples\"></div>\n        <div id=\"bar\"></div>\n        <div id=\"baz\" class=\"lemons bananas\"></div>\n        <div id=\"buz\" class=\"mangos\"></div>\n\n        <div id=\"lunch\" class=\"pie beef\"></div>\n        <div id=\"dinner\" class=\"pie chicken\"></div>\n      </div>\n    ");
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
// file spec/dom/append_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"append-spec\">\n        <div id=\"woosh\"></div>\n        <div id=\"kapow\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      (__b = this, __b.$it._p = (__a = function() {

        var woosh = nil;
        
        woosh = this.$Element("#woosh");
        woosh.$append("<p>Hey there</p>");
        return woosh.$html().$should().$eq$("<p>Hey there</p>");
      }, __a._s = this, __a), __b.$it("should append the dom nodes in the string into the element"));
      return (__b = this, __b.$it._p = (__a = function() {

        var kapow = nil;
        
        kapow = this.$Element("#kapow");
        kapow.$append("<p>Hello</p><p>World</p>");
        return kapow.$html().$should().$eq$("<p>Hello</p><p>World</p>");
      }, __a._s = this, __a), __b.$it("should append multiple elements from html string"));
    }, __a._s = this, __a), __b.$describe("when given string content"));
  }, __a._s = self, __a), __b.$describe("Element#append"))
})();
// file spec/dom/class_name_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"class-name-spec\">\n        <div id=\"foo\" class=\"whiskey\"></div>\n        <div id=\"bar\" class=\"scotch brandy\"></div>\n        <div id=\"baz\" class=\"\"></div>\n        <div id=\"buz\"></div>\n\n        <div class=\"red dark\"></div>\n        <div class=\"red light\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#foo").$class_name().$should().$eq$("whiskey");
      return this.$Element("#bar").$class_name().$should().$eq$("scotch brandy");
    }, __a._s = this, __a), __b.$it("should return the Elements' classname"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#baz").$class_name().$should().$eq$("");
      return this.$Element("#buz").$class_name().$should().$eq$("");
    }, __a._s = this, __a), __b.$it("should return an empty string for Elements with no classname"));
  }, __a._s = self, __a), __b.$describe("Element#class_name"));
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"set-class-name-spec\">\n        <div id=\"foo\" class=\"\"></div>\n        <div id=\"bar\" class=\"oranges\"></div>\n\n        <div id=\"baz\" class=\"banana\"></div>\n        <div id=\"buz\" class=\"banana\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#foo").$class_name$e("apples");
      return this.$Element("#foo").$class_name().$should().$eq$("apples");
    }, __a._s = this, __a), __b.$it("should set the given class name on the Element"));
    return (__b = this, __b.$it._p = (__a = function() {

      var bar = nil;
      
      bar = this.$Element("#bar");
      bar.$class_name().$should().$eq$("oranges");
      bar.$class_name$e("lemons");
      return bar.$class_name().$should().$eq$("lemons");
    }, __a._s = this, __a), __b.$it("should replace any existing classname"));
  }, __a._s = self, __a), __b.$describe("Element#class_name="));
})();
// file spec/dom/has_class_spec.rb
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
    }, __a._s = this, __a), __b.$it("should return true if the Element has the given class"));
  }, __a._s = self, __a), __b.$describe("Element#has_class?"))
})();
// file spec/dom/html_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"html-spec\">\n        <div id=\"foo\">Hey there</div>\n        <div id=\"bar\"><p>Erm</p></div>\n\n        <div class=\"bridge\">Hello</div>\n        <div class=\"bridge\">Hello as well</div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#foo").$html().$should().$eq$("Hey there");
      return this.$Element("#bar").$html().$should().$eq$("<p>Erm</p>");
    }, __a._s = this, __a), __b.$it("should return the html content of the Element"));
  }, __a._s = self, __a), __b.$describe("Element#html"))
})();
// file spec/dom/id_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"Element-id-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#foo").$id().$should().$eq$("foo");
      return this.$Element("#bar").$id().$should().$eq$("bar");
    }, __a._s = this, __a), __b.$it("should return the Element's id"));
  }, __a._s = self, __a), __b.$describe("Element#id"))
})();
// file spec/dom/inspect_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"inspect-spec\">\n        <div id=\"foo\"></div>\n        <div class=\"bar\"></div>\n        <p id=\"lol\" class=\"bar\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      this.$Element("#foo").$inspect().$should().$eq$("<div id=\"foo\">");
      return this.$Element("#lol").$inspect().$should().$eq$("<p id=\"lol\" class=\"bar\">");
    }, __a._s = this, __a), __b.$it("should return a string representation of the element"));
  }, __a._s = self, __a), __b.$describe("Element#inspect"))
})();
// file spec/dom/next_spec.rb
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
    }, __a._s = this, __a), __b.$it("should return nil when no next Element"));
  }, __a._s = self, __a), __b.$describe("Element#next"))
})();
// file spec/dom/prev_spec.rb
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
    }, __a._s = this, __a), __b.$it("should return nil when no prev Element"));
  }, __a._s = self, __a), __b.$describe("Element#prev"))
})();
// file spec/dom/remove_class_spec.rb
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
    }, __a._s = this, __a), __b.$it("should have no effect on Elements without class"));
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
    }, __a._s = this, __a), __b.$it("should remove the given class from the Element"));
  }, __a._s = self, __a), __b.$describe("Element#remove_class"))
})();
// file spec/dom/succ_spec.rb
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
    }, __a._s = this, __a), __b.$it("should return nil when no succ Element"));
  }, __a._s = self, __a), __b.$describe("Element#succ"))
})();
// file spec/dom/text_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"text-spec\">\n        <div id=\"foo\">Hey there</div>\n        <div id=\"bar\"></div>\n        <div id=\"baz\"><p>Hey </p>over<span> there</span></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#foo").$text().$should().$eq$("Hey there")
    }, __a._s = this, __a), __b.$it("should return the text content for simple Element nodes"));
    (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#bar").$text().$should().$eq$("")
    }, __a._s = this, __a), __b.$it("should return an empty string when no text content"));
    return (__b = this, __b.$it._p = (__a = function() {

      
      
      return this.$Element("#baz").$text().$should().$eq$("Hey over there")
    }, __a._s = this, __a), __b.$it("should return the text content from multiple child nodes"));
  }, __a._s = self, __a), __b.$describe("Element#text"));
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"set-text-spec\">\n        <div id=\"foo\"></div>\n        <div id=\"bar\">woosh</div>\n        <div id=\"baz\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$it._p = (__a = function() {

      var foo = nil;
      
      foo = this.$Element("#foo");
      foo.$text$e("Hello world");
      return foo.$text().$should().$eq$("Hello world");
    }, __a._s = this, __a), __b.$it("should set simple text contents on Elements"));
    (__b = this, __b.$it._p = (__a = function() {

      var bar = nil;
      
      bar = this.$Element("#bar");
      bar.$text().$should().$eq$("woosh");
      bar.$text$e("kapow");
      return bar.$text().$should().$eq$("kapow");
    }, __a._s = this, __a), __b.$it("should replace any current content in the Element"));
    return (__b = this, __b.$it._p = (__a = function() {

      var baz = nil;
      
      baz = this.$Element("#baz");
      baz.$text$e("<div><p>lol</p></div>");
      return baz.$text().$should().$eq$("<div><p>lol</p></div>");
    }, __a._s = this, __a), __b.$it("should escape contents correctly"));
  }, __a._s = self, __a), __b.$describe("Element#text="));
})();
// file spec/kernel/Element_spec.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;
var __a, __b;
  return (__b = self, __b.$describe._p = (__a = function() {

    var __a, __b;
    
    (__b = this, __b.$before._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      this.div = this.$Element("      <div id=\"element-spec\">\n        <div id=\"foo\" class=\"bar\"></div>\n        <div class=\"woosh\"></div>\n        <div class=\"woosh\"></div>\n      </div>\n    ");
      return this.div.$append_to_body();
    }, __a._s = this, __a), __b.$before());
    (__b = this, __b.$after._p = (__a = function() {

      
      if (this.div == null) this.div = nil;

      
      return this.div.$remove()
    }, __a._s = this, __a), __b.$after());
    (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      (__b = this, __b.$it._p = (__a = function() {

        
        
        return this.$Element("#foo").$class_name().$should().$eq$("bar")
      }, __a._s = this, __a), __b.$it("should return a new Element with found element"));
      return (__b = this, __b.$it._p = (__a = function() {

        
        
        return this.$Element("#bad-id").$should(this.$be_nil())
      }, __a._s = this, __a), __b.$it("should return nil when no element found"));
    }, __a._s = this, __a), __b.$describe("when given an element id"));
    (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      (__b = this, __b.$it._p = (__a = function() {

        var woosh = nil;
        
        woosh = this.$Element(".woosh");
        woosh.$should(this.$be_kind_of(__scope.Element));
        return woosh.$size().$should().$eq$(2);
      }, __a._s = this, __a), __b.$it("return a new Element with all matching elements"));
      return (__b = this, __b.$it._p = (__a = function() {

        var empty = nil;
        
        empty = this.$Element(".no-maching-classnames");
        empty.$should(this.$be_kind_of(__scope.Element));
        return empty.$size().$should().$eq$(0);
      }, __a._s = this, __a), __b.$it("returns an empty Element collection for no matching elements"));
    }, __a._s = this, __a), __b.$describe("when given a generic CSS selector"));
    return (__b = this, __b.$describe._p = (__a = function() {

      var __a, __b;
      
      return (__b = this, __b.$it._p = (__a = function() {

        var el = nil;
        
        el = this.$Element("<div id=\"foo-bar-baz\" class=\"woosh\"></div>");
        el.$should(this.$be_kind_of(__scope.Element));
        el.$id().$should().$eq$("foo-bar-baz");
        el.$class_name().$should().$eq$("woosh");
        return el.$size().$should().$eq$(1);
      }, __a._s = this, __a), __b.$it("should parse it and make it a member of the Element collection"))
    }, __a._s = this, __a), __b.$describe("when given a string of HTML content"));
  }, __a._s = self, __a), __b.$describe("Kernel#Element"))
})();
// file spec/spec_helper.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice;

  nil
})();
