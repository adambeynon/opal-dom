// file lib/opal/dom/document.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module;

  return (function(__base){
    // line 1, lib/opal/dom/document.rb, module Document
    function Document() {};
    Document = __module(__base, "Document", Document);
    var Document_prototype = Document.prototype, __scope = Document._scope, TMP_1;

    // line 2, lib/opal/dom/document.rb, Document.body_ready?
    Document.$body_ready$p = function() {
      
      return !!(document && document.body);
    };

    // line 6, lib/opal/dom/document.rb, Document.ready?
    Document.$ready$p = TMP_1 = function() {
      var __context, block;
      block = TMP_1._p || nil, __context = block._s, TMP_1._p = null;
      
      setTimeout(function() { block.call(block._s); }, 0)
    };
        ;Document._sdonate(["$body_ready$p", "$ready$p"]);
  })(self)
})();
// file lib/opal/dom/dom.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;

  return (function(__base, __super){
    // line 1, lib/opal/dom/dom.rb, class DOM
    function DOM() {};
    DOM = __klass(__base, __super, "DOM", DOM);
    var supports_inner_html = nil, DOM_prototype = DOM.prototype, __scope = DOM._scope, __a, TMP_1, TMP_2;

    // line 5, lib/opal/dom/dom.rb, DOM.[]
    DOM.$aref$ = function(str) {
      
      return this.$DOM(str)
    };

    // line 9, lib/opal/dom/dom.rb, DOM.parse
    DOM.$parse = function(str) {
      
      
      var el = document.createElement('div');
      // awkward IE
      el.innerHTML = "_" + str;

      var child = el.firstChild;

      while (child) {
        if (child.nodeType !== 1) {
          child = child.nextSibling
          continue;
        }

        return __scope.DOM.$new(child)
      }

      this.$raise("no DOM node in content")
    
    };

    // line 48, lib/opal/dom/dom.rb, DOM#initialize
    DOM_prototype.$initialize = function(el) {
      if (el == null) {
        el = "div"
      }
      
      if (typeof(el) === 'string') {
        el = document.createElement(el);
      }

      if (!el || !el.nodeType) {
        throw new Error('not a valid DOM');
      }

      this[0] = el;
      this.length = 1;
    
    };

    // line 63, lib/opal/dom/dom.rb, DOM#<<
    DOM_prototype.$lshft$ = function(content) {
      
      return this[0].appendChild(content[0]);
    };

    DOM_prototype.$append = DOM_prototype.$lshft$;

    // line 69, lib/opal/dom/dom.rb, DOM#append_to_body
    DOM_prototype.$append_to_body = function() {
      
      
      document.body.appendChild(this[0]);
      return this;
    
    };

    // line 76, lib/opal/dom/dom.rb, DOM#append_to_head
    DOM_prototype.$append_to_head = function() {
      
      
      document.getElementsByTagName('head')[0].appendChild(this[0]);
      return this;
    
    };

    // line 92, lib/opal/dom/dom.rb, DOM#add_class
    DOM_prototype.$add_class = function(name) {
      
      
      for (var i = 0, length = this.length; i < length; i++) {
        var el = this[i], className = el.className;

        if (!className) {
          el.className = name;
        }
        else if((' ' + className + ' ').indexOf(' ' + name + ' ') === -1) {
          el.className += (' ' + name);
        }
      }

      return this;
    
    };

    // line 121, lib/opal/dom/dom.rb, DOM#has_class?
    DOM_prototype.$has_class$p = function(name) {
      
      
      for (var i = 0, length = this.length; i < length; i++) {
        var el = this[i];

        if ((' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1) {
          return true;
        }
      }

      return false;
    
    };

    // line 135, lib/opal/dom/dom.rb, DOM#id
    DOM_prototype.$id = function() {
      
      return (this[0] && this[0].id) || '';
    };

    // line 139, lib/opal/dom/dom.rb, DOM#inspect
    DOM_prototype.$inspect = function() {
      
      
      var val, el, str, result = [];

      for (var i = 0, length = this.length; i < length; i++) {
        el  = this[i];
        str = "<" + el.tagName.toLowerCase();

        if (val = el.id) str += (' id="' + val + '"');
        if (val = el.className) str += (' class="' + val + '"');

        result.push(str + '>');
      }

      return '(' + result.join(', ') + ')';
    
    };

    // line 157, lib/opal/dom/dom.rb, DOM#class_name
    DOM_prototype.$class_name = function() {
      
      return this[0] ? this[0].className || '' : '';
    };

    // line 161, lib/opal/dom/dom.rb, DOM#class_name=
    DOM_prototype.$class_name$e = function(name) {
      
      
      for (var i = 0, length = this.length; i < length; i++) {
        this[i].className = name;
      }

      return this;
    
    };

    // line 173, lib/opal/dom/dom.rb, DOM#length
    DOM_prototype.$length = function() {
      
      return this.length;
    };

    // line 186, lib/opal/dom/dom.rb, DOM#next
    DOM_prototype.$next = function() {
      
      return this.$sibling("nextSibling");
    };

    // line 199, lib/opal/dom/dom.rb, DOM#prev
    DOM_prototype.$prev = function() {
      
      return this.$sibling("previousSibling");
    };

    // line 212, lib/opal/dom/dom.rb, DOM#remove_class
    DOM_prototype.$remove_class = function(name) {
      
      
      var el = this[0], className = ' ' + el.className + ' ';

      className = className.replace(' ' + name + ' ', ' ');
      className = className.replace(/^\s+/, '').replace(/\s+$/, '');

      el.className = className;

      return this;
    
    };

    // line 225, lib/opal/dom/dom.rb, DOM#remove
    DOM_prototype.$remove = function() {
      
      
      var el = this[0], parent = el.parentNode;

      if (parent) {
        parent.removeChild(el);
      }

      return this;
    
    };

    // line 238, lib/opal/dom/dom.rb, DOM#sibling
    DOM_prototype.$sibling = function(type) {
      
      
      var el = this[0];

      while (el = el[type]) {
        if (el.nodeType !== 1) {
          continue;
        }

        return __scope.DOM.$new(el)
      }

      return nil;
    
    };

    DOM_prototype.$size = DOM_prototype.$length;

    DOM_prototype.$succ = DOM_prototype.$next;

    // line 258, lib/opal/dom/dom.rb, DOM#hide
    DOM_prototype.$hide = function() {
      
      
      this[0].style.display = 'none';
      return this;
    
    };

    // line 265, lib/opal/dom/dom.rb, DOM#show
    DOM_prototype.$show = function() {
      
      
      this[0].style.display = '';
      return this;
    
    };

    // line 279, lib/opal/dom/dom.rb, DOM#clear
    DOM_prototype.$clear = function() {
      
      
      var el = this[0];

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      return this;
    
    };

    // line 291, lib/opal/dom/dom.rb, DOM#css
    DOM_prototype.$css = function(name, value) {
      
      
      if (value == null) {
        return this[0].style[name];
      }

      return this[0].style[name] = value;
    
    };

    // line 309, lib/opal/dom/dom.rb, DOM#html
    DOM_prototype.$html = function() {
      
      return this[0].innerHTML;
    };

    // line 323, lib/opal/dom/dom.rb, DOM#html=
    DOM_prototype.$html$e = function(html) {
      
      
      this[0].innerHTML = html;

      return this;
    
    };

    supports_inner_html = true;

    
      try {
        var table = document.createDOM('table');
        table.innerHTML = "<tr><td></td></tr>";
      } catch (err) {
        supports_inner_html = false;
      }
    

    if ((__a = supports_inner_html) === false || __a === nil) {
      // line 344, lib/opal/dom/dom.rb, DOM#html=
      DOM_prototype.$html$e = function(html) {
        
        this[0].innerHTML = html;
        return this;
      }
    };

    // line 352, lib/opal/dom/dom.rb, DOM#text
    DOM_prototype.$text = function() {
      
      return text_value(this[0]);
    };

    // line 356, lib/opal/dom/dom.rb, DOM#text=
    DOM_prototype.$text$e = function(str) {
      
      this.$clear();
      this[0].appendChild(document.createTextNode(str));
      return this;
    };

    
    function text_value(el) {
      var type = el.nodeType, result = '';

      if (type === 1 || type === 9 || type === 11) {
        if (typeof(el.textContent) === 'string') {
          return el.textContent;
        }
        else if (typeof(el.innerText) === 'string') {
          return el.innerText.replace(/\r/g, '');
        }
        else {
          for (var c = el.firstChild; c; c = c.nextSibling) {
            result += text_value(c);
          }
        }
      }
      else if (type === 3 || type === 4) {
        return el.nodeValue;
      }

      return result;
    }
  

    
    // FIXME: make this dynamic
    var magic_key   = 'opal-3-142',
        store_id    = 1,
        stored_data = {};

    function storage_for(el) {
      var id;

      id = el[magic_key];
      console.log("got magic: " + id);

      if (id) {
        console.log("id is: ... " + id);
        return stored_data[id];
      } else {
        id = el[magic_key] = store_id++;
        console.log("id is: " + id);
        return stored_data[id] = {};
      }
    }
  

    
    function add_listener(el, type, handler) {
      var data     = storage_for(el),
          events   = data.events || (data.events = {}),
          handlers = events[type];

      if (!handlers) {
        handlers = events[type] = [];

        var listener = function(event) {
          if (!event) {
            var event = window.event;
          }

          var e = __scope.Event.$new(event)

          for (var i = 0, length = handlers.length; i < length; i++) {
            var h = handlers[i];

            if (h.call(h._s, e) === false) {
              return false;
            }
          }
        };

        if (el.addEventListener) {
          el.addEventListener(type, listener, false);
        }
        else if (el.attachEvent) {
          el.attachEvent('on' + type, listener);
        }
      } 

      handlers.push(handler);
    }
  

    // line 464, lib/opal/dom/dom.rb, DOM#on
    DOM_prototype.$on = TMP_1 = function(type) {
      var __context, handler;
      handler = TMP_1._p || nil, __context = handler._s, TMP_1._p = null;
      
      
      for (var i = 0, length = this.length; i < length; i++) {
        add_listener(this[i], type, handler);
      }

      return handler;
    
    };

    // line 474, lib/opal/dom/dom.rb, DOM#off
    DOM_prototype.$off = TMP_2 = function(type) {
      var __context, handler;
      handler = TMP_2._p || nil, __context = handler._s, TMP_2._p = null;
      
      return nil;
    };
    ;DOM._donate(["$initialize", "$lshft$", "$append", "$append_to_body", "$append_to_head", "$add_class", "$has_class$p", "$id", "$inspect", "$class_name", "$class_name$e", "$length", "$next", "$prev", "$remove_class", "$remove", "$sibling", "$size", "$succ", "$hide", "$show", "$clear", "$css", "$html", "$html$e", "$html$e", "$text", "$text$e", "$on", "$off"]);    ;DOM._sdonate(["$aref$", "$parse"]);
  })(self, null)
})();
// file lib/opal/dom/event.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;

  return (function(__base, __super){
    // line 1, lib/opal/dom/event.rb, class Event
    function Event() {};
    Event = __klass(__base, __super, "Event", Event);
    var Event_prototype = Event.prototype, __scope = Event._scope;
    Event_prototype.alt = Event_prototype.ctrl = Event_prototype.meta = Event_prototype.shift = nil;

    // line 2, lib/opal/dom/event.rb, Event#initialize
    Event_prototype.$initialize = function(evt) {
      
      
      this.evt = evt;

      this.alt   = evt.altKey;
      this.ctrl  = evt.ctrlKey;
      this.meta  = evt.metaKey;
      this.shift = evt.shiftKey;
    
    };

    // line 13, lib/opal/dom/event.rb, Event#alt?
    Event_prototype.$alt$p = function() {
      
      return this.alt;
    };

    // line 17, lib/opal/dom/event.rb, Event#ctrl?
    Event_prototype.$ctrl$p = function() {
      
      return this.ctrl;
    };

    // line 21, lib/opal/dom/event.rb, Event#meta?
    Event_prototype.$meta$p = function() {
      
      return this.meta;
    };

    // line 35, lib/opal/dom/event.rb, Event#stop
    Event_prototype.$stop = function() {
      
      this.$prevent_default();
      return this.$stop_propagation();
    };

    // line 40, lib/opal/dom/event.rb, Event#prevent_default
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

    // line 55, lib/opal/dom/event.rb, Event#shift?
    Event_prototype.$shift$p = function() {
      
      return this.shift;
    };

    // line 59, lib/opal/dom/event.rb, Event#stop_propagation
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
// file lib/opal/dom/http.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;

  return (function(__base, __super){
    // line 1, lib/opal/dom/http.rb, class HTTP
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
  

    // line 22, lib/opal/dom/http.rb, HTTP#initialize
    HTTP_prototype.$initialize = function() {
      
      
      this.xhr = make_xhr();
    
    };

    // line 28, lib/opal/dom/http.rb, HTTP#ok?
    HTTP_prototype.$ok$p = function() {
      
      return this.status >= 200 && this.status < 300;
    };
    ;HTTP._donate(["$initialize", "$ok$p"]);
  })(self, null)
})();
// file lib/opal/dom/kernel.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module;

  return (function(__base){
    // line 1, lib/opal/dom/kernel.rb, module Kernel
    function Kernel() {};
    Kernel = __module(__base, "Kernel", Kernel);
    var Kernel_prototype = Kernel.prototype, __scope = Kernel._scope;

    // line 13, lib/opal/dom/kernel.rb, Kernel#DOM
    Kernel_prototype.$DOM = function(selector) {
      
      
      var el

      if (selector.charAt(0) === '#') {
        el = document.getElementById(selector.substr(1));

        if (el) {
          return __scope.DOM.$new(el);
        }
        else {
          var res = __scope.DOM.$allocate();
          res.length = 0;
          return res;
        }
      }
      else if (/\s*</.test(selector)) {
        return __scope.DOM.$parse(selector);
      } 
      else {
        var el = document.querySelectorAll(selector), res = __scope.DOM.$allocate();

        for (var i = 0, length = el.length; i < length; i++) {
          res[i] = el[i];
        }

        res.length = el.length;
        return res;
      }

      return nil;
    
    };

    // line 55, lib/opal/dom/kernel.rb, Kernel#alert
    Kernel_prototype.$alert = function(msg) {
      
      alert(msg);
      return this;
    };
        ;Kernel._donate(["$DOM", "$alert"]);
  })(self)
})();
// file lib/opal/dom/version.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;

  return (function(__base, __super){
    // line 1, lib/opal/dom/version.rb, class DOM
    function DOM() {};
    DOM = __klass(__base, __super, "DOM", DOM);
    var DOM_prototype = DOM.prototype, __scope = DOM._scope;

    __scope.VERSION = "0.0.1"

  })(self, null)
})();
