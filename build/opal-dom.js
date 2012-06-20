(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass;

  return (function(__base, __super){
    function DOM() {};
    DOM = __klass(__base, __super, "DOM", DOM);
    var DOM_prototype = DOM.prototype, __scope = DOM._scope;

    DOM.$parse = function(str) {
      
      
      var el = document.createElement('div');
      el.innerHTML = str;

      var child = el.firstChild;

      while (child) {
        if (child.nodeType !== 1) {
          child = child.nextSibling
          continue;
        }

        return __scope.Element.$new(child)
      }

      this.$raise("no DOM node in content")
    
    }
    ;DOM._sdonate(["$parse"]);
  })(self, null)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __module = __opal.module;

  return (function(__base){
    function Document() {};
    Document = __module(__base, "Document", Document);
    var Document_prototype = Document.prototype, __scope = Document._scope, TMP_1;

    Document.$body_ready$p = function() {
      
      return !!(document && document.body);
    };

    Document.$ready$p = TMP_1 = function() {
      var __context, block;
      block = TMP_1._p || nil, __context = block._s, TMP_1._p = null;
      
      setTimeout(function() { block.call(block._s); }, 0)
    };
        ;Document._sdonate(["$body_ready$p", "$ready$p"]);
  })(self)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass, __alias = __opal.alias;

  return (function(__base, __super){
    function Element() {};
    Element = __klass(__base, __super, "Element", Element);
    var Element_prototype = Element.prototype, __scope = Element._scope;

    Element.$aref$ = function(str) {
      
      return this.$Element(str)
    };

    Element_prototype.$initialize = function(el) {
      if (el == null) {
        el = "div"
      }
      
      if (typeof(el) === 'string') {
        el = document.createElement(el);
      }

      if (!el || !el.nodeType) {
        throw new Error('not a valid element');
      }

      this.el = el;
    
    };

    Element_prototype.$lshft$ = function(content) {
      
      console.log("appending: ");
      console.log(content);
      return this.el.appendChild(content.el);
    };

    Element_prototype.$append = Element_prototype.$lshft$;

    Element_prototype.$append_to_body = function() {
      
      
      document.body.appendChild(this.el);
      return this;
    
    };

    Element_prototype.$append_to_head = function() {
      
      
      document.head.appendChild(this.el);
      return this;
    
    };

    Element_prototype.$add_class = function(name) {
      
      
      var el = this.el, className = el.className;

      if (!className) {
        el.className = name;
      }
      else if((' ' + className + ' ').indexOf(' ' + name + ' ') === -1) {
        el.className += (' ' + name);
      }

      return this;
    
    };

    Element_prototype.$has_class$p = function(name) {
      
      return 
      (' ' + this.el.className + ' ').indexOf(' ' + name + ' ') !== -1
    ;
    };

    Element_prototype.$inspect = function() {
      
      
      var val, el = this.el, str = '<' + el.tagName.toLowerCase();

      if (val = el.id) str += (' id="' + val + '"');
      if (val = el.className) str += (' class="' + val + '"');

      return str + '>';
    
    };

    Element_prototype.$class_name = function() {
      
      
      return this.el.className || '';
    
    };

    Element_prototype.$class_name$e = function(name) {
      
      
      return this.el.className = name;
    
    };

    Element_prototype.$next = function() {
      
      return this.$sibling("nextSibling");
    };

    Element_prototype.$prev = function() {
      
      return this.$sibling("previousSibling");
    };

    Element_prototype.$remove_class = function(name) {
      
      
      var el = this.el, className = ' ' + el.className + ' ';

      className = className.replace(' ' + name + ' ', ' ');
      className = className.replace(/^\s+/, '').replace(/\s+$/, '');

      el.className = className;

      return this;
    
    };

    Element_prototype.$remove = function() {
      
      
      var el = this.el, parent = el.parentNode;

      if (parent) {
        parent.removeChild(el);
      }

      return this;
    
    };

    Element_prototype.$sibling = function(type) {
      
      
      var el = this.el;

      while (el = el[type]) {
        if (el.nodeType !== -1) {
          continue;
        }

        return __scope.Element.$new(el)
      }

      return nil;
    
    };

    Element_prototype.$succ = Element_prototype.$next;

    Element_prototype.$hide = function() {
      
      
      this.el.style.display = 'none';
      return this;
    
    };

    Element_prototype.$show = function() {
      
      
      this.el.style.display = '';
      return this;
    
    };

    Element_prototype.$clear = function() {
      
      
      var el = this.el;

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      return this;
    
    };

    Element_prototype.$css = function(name, value) {
      
      
      if (value == null) {
        return this.el.style[name];
      }

      return this.el.style[name] = value;
    
    };

    Element_prototype.$html$e = function(html) {
      
      
      this.el.innerHTML = html;

      return this;
    
    };
    ;Element._donate(["$initialize", "$lshft$", "$append", "$append", "$append_to_body", "$append_to_head", "$add_class", "$has_class$p", "$inspect", "$class_name", "$class_name$e", "$next", "$prev", "$remove_class", "$remove", "$sibling", "$succ", "$succ", "$hide", "$show", "$clear", "$css", "$html$e"]);    ;Element._sdonate(["$aref$"]);
  })(self, null)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass, __alias = __opal.alias;

  return (function(__base, __super){
    function ElementSet() {};
    ElementSet = __klass(__base, __super, "ElementSet", ElementSet);
    var ElementSet_prototype = ElementSet.prototype, __scope = ElementSet._scope, TMP_1;

    ElementSet_prototype.$initialize = function(selector, context) {
      
      return this.length = 0;
    };

    ElementSet_prototype.$each = TMP_1 = function() {
      var __context, block;
      block = TMP_1._p || nil, __context = block._s, TMP_1._p = null;
      
      for (var i = 0, length = this.length; i < length; i++) {
      if (block.call(__context, this[i]) === __breaker) return __breaker.$v;
      };
      return this;
    };

    ElementSet_prototype.$length = function() {
      
      return this.length;
    };

    ElementSet_prototype.$size = ElementSet_prototype.$length;
    ;ElementSet._donate(["$initialize", "$each", "$length", "$size", "$size"]);
  })(self, null)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass;

  return (function(__base, __super){
    function Event() {};
    Event = __klass(__base, __super, "Event", Event);
    var Event_prototype = Event.prototype, __scope = Event._scope;
    Event_prototype.alt = Event_prototype.ctrl = Event_prototype.meta = Event_prototype.shift = nil;

    Event_prototype.$initialize = function(evt) {
      
      
      this.evt = evt;

      this.alt   = evt.altKey;
      this.ctrl  = evt.ctrlKey;
      this.meta  = evt.metaKey;
      this.shift = evt.shiftKey;
    
    };

    Event_prototype.$alt$p = function() {
      
      return this.alt;
    };

    Event_prototype.$ctrl$p = function() {
      
      return this.ctrl;
    };

    Event_prototype.$meta$p = function() {
      
      return this.meta;
    };

    Event_prototype.$stop = function() {
      
      this.$prevent_default();
      return this.$stop_propagation();
    };

    Event_prototype.$prevent_default = function() {
      
      
      var evt = this.evt;

      if (evt.preventDefault) {
        evt.preventDefault()
      }
      else {
        evt.returnValue = false;
      }

      return this;
    
    };

    Event_prototype.$shift$p = function() {
      
      return this.shift;
    };

    Event_prototype.$stop_propagation = function() {
      
      
      var evt = this.evt;

      if (evt.stopPropagation) {
        evt.stopPropagation();
      }
      else {
        evt.cancelBubble = true;
      }

      return this;
    
    };
    ;Event._donate(["$initialize", "$alt$p", "$ctrl$p", "$meta$p", "$stop", "$prevent_default", "$shift$p", "$stop_propagation"]);
  })(self, null)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass;

  return (function(__base, __super){
    function Element() {};
    Element = __klass(__base, __super, "Element", Element);
    var Element_prototype = Element.prototype, __scope = Element._scope, __a, __b, TMP_2, TMP_3;

    __scope.EVENTS = ["click", "mousedown", "mouseup"];

    (__b = __scope.EVENTS, __b.$each._p = (__a = function(evt) {

      var TMP_1, __a, __b;
      if (evt == null) evt = nil;

      return (__b = this, __b.$define_method._p = (__a = TMP_1 = function() {

        var handler, __context, __a;
        
        handler = TMP_1._p || nil, __context = handler._s, TMP_1.p = null;
        
        return (__a = this, __a.$add_listener._p = handler.$to_proc(), __a.$add_listener(evt))
      }, __a._s = this, __a), __b.$define_method(evt))
    }, __a._s = Element, __a), __b.$each());

    Element_prototype.$add_listener = TMP_2 = function(type) {
      var __context, handler;
      handler = TMP_2._p || nil, __context = handler._s, TMP_2._p = null;
      
      
      var el = this.el, responder = function(event) {
        if (!event) {
          var event = window.event;
        }
        var evt = __scope.Event.$new(event);
        return handler.call(handler._s, evt);
      };

      if (el.addEventListener) {
        el.addEventListener(type, responder, false);
      }
      else if (el.attachEvent) {
        el.attachEvent('on' + type, responder);
      }

      return handler;
    
    };

    Element_prototype.$remove_listener = TMP_3 = function(type) {
      var __context, handler;
      handler = TMP_3._p || nil, __context = handler._s, TMP_3._p = null;
      
      return nil;
    };
    ;Element._donate(["$add_listener", "$remove_listener"]);
  })(self, null)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass;

  return (function(__base, __super){
    function HTTP() {};
    HTTP = __klass(__base, __super, "HTTP", HTTP);
    var HTTP_prototype = HTTP.prototype, __scope = HTTP._scope;

    
    var make_xhr = function() {
      if (typeof XMLHttpRequest !== 'undefined' && (window.location.protocol !== 'file:' || !window.ActiveXObject)) {
        return new XMLHttpRequest();
      } else {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        } catch(e) { }
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        } catch(e) { }
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) { }
      }

      HTTP.$raise("Cannot make request");
    }
  

    HTTP_prototype.$initialize = function() {
      
      
      this.xhr = make_xhr();
    
    };

    HTTP_prototype.$ok$p = function() {
      
      return this.status >= 200 && this.status < 300;
    };
    ;HTTP._donate(["$initialize", "$ok$p"]);
  })(self, null)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __module = __opal.module;

  return (function(__base){
    function Kernel() {};
    Kernel = __module(__base, "Kernel", Kernel);
    var Kernel_prototype = Kernel.prototype, __scope = Kernel._scope;

    Kernel_prototype.$Element = function(selector) {
      
      
      var el

      if (selector.charAt(0) === '#') {
        el = document.getElementById(selector.substr(1));

        if (el) {
          return __scope.Element.$new(el);
        }
        else {
          return nil;
        }
      }
      else {
        return __scope.DOM.$parse(selector)
      }

      return nil;
    
    };

    Kernel_prototype.$alert = function(msg) {
      
      alert(msg);
      return this;
    };
        ;Kernel._donate(["$Element", "$alert"]);
  })(self)
})();
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __donate = __opal.donate, __klass = __opal.klass;

  return (function(__base, __super){
    function DOM() {};
    DOM = __klass(__base, __super, "DOM", DOM);
    var DOM_prototype = DOM.prototype, __scope = DOM._scope;

    __scope.VERSION = "0.0.1"

  })(self, null)
})();
