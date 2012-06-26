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
// file lib/opal/dom/element.rb
(function() {
var __opal = Opal, self = __opal.top, __scope = __opal, nil = __opal.nil, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;

  return (function(__base, __super){
    // line 1, lib/opal/dom/element.rb, class Element
    function Element() {};
    Element = __klass(__base, __super, "Element", Element);
    var Element_prototype = Element.prototype, __scope = Element._scope, TMP_1, TMP_2;

    // line 5, lib/opal/dom/element.rb, Element.[]
    Element.$aref$ = function(str) {
      
      return this.$Element(str)
    };

    // line 12, lib/opal/dom/element.rb, Element.parse
    Element.$parse = function(str) {
      
      
      var nodes = nodes_from_html_string('div', str), node;

      for (var i = 0, length = nodes.length; i < length; i++) {
        node = nodes[i];

        if (node.nodeType === 1) {
          return __scope.Element.$new(node)
        }
      }

      this.$raise("no Element node in content")
    
    };

    // line 46, lib/opal/dom/element.rb, Element#initialize
    Element_prototype.$initialize = function(el) {
      if (el == null) {
        el = "div"
      }
      
      if (typeof(el) === 'string') {
        el = document.createElement(el);
      }

      if (!el || (el.nodeType !== 1)) {
        this.$raise("not a valid Element")
      }

      this.el = el;
      return this;
    
    };

    // line 61, lib/opal/dom/element.rb, Element#<<
    Element_prototype.$lshft$ = function(content) {
      
      
      // content is a Element instance
      if (content.el && content.el.nodeType) {
        this.el.appendChild(content.el);
        return this;
      }

      // assume content to be a string
      var tag   = this.el.tagName.toLowerCase(),
          nodes = nodes_from_html_string(tag, content);

      for (var i = 0, length = nodes.length; i < length; i++) {
        this.el.appendChild(nodes[i]);
      }

      return this;
    
    };

    Element_prototype.$append = Element_prototype.$lshft$;

    // line 83, lib/opal/dom/element.rb, Element#append_to_body
    Element_prototype.$append_to_body = function() {
      
      
      document.body.appendChild(this.el);
      return this;
    
    };

    // line 90, lib/opal/dom/element.rb, Element#append_to_head
    Element_prototype.$append_to_head = function() {
      
      
      document.getElementsByTagName('head')[0].appendChild(this.el);
      return this;
    
    };

    // line 106, lib/opal/dom/element.rb, Element#add_class
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

    // line 133, lib/opal/dom/element.rb, Element#has_class?
    Element_prototype.$has_class$p = function(name) {
      
      
      var el = this.el;

      if ((' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1) {
        return true;
      }

      return false;
    
    };

    // line 145, lib/opal/dom/element.rb, Element#id
    Element_prototype.$id = function() {
      
      return this.el.id || '';
    };

    // line 149, lib/opal/dom/element.rb, Element#inspect
    Element_prototype.$inspect = function() {
      
      
      var el, str, result = [];

      el  = this.el;
      str = "<" + el.tagName.toLowerCase();

      if (val = el.id) str += (' id="' + val + '"');
      if (val = el.className) str += (' class="' + val + '"');

      return str + '>';
    
    };

    // line 163, lib/opal/dom/element.rb, Element#class_name
    Element_prototype.$class_name = function() {
      
      return this.el.className || '';
    };

    // line 167, lib/opal/dom/element.rb, Element#class_name=
    Element_prototype.$class_name$e = function(name) {
      
      
      this.el.className = name;
      return this;
    
    };

    // line 183, lib/opal/dom/element.rb, Element#next
    Element_prototype.$next = function() {
      
      return this.$sibling("nextSibling");
    };

    // line 196, lib/opal/dom/element.rb, Element#prev
    Element_prototype.$prev = function() {
      
      return this.$sibling("previousSibling");
    };

    // line 209, lib/opal/dom/element.rb, Element#remove_class
    Element_prototype.$remove_class = function(name) {
      
      
      var el = this.el, className = ' ' + el.className + ' ';

      className = className.replace(' ' + name + ' ', ' ');
      className = className.replace(/^\s+/, '').replace(/\s+$/, '');

      el.className = className;

      return this;
    
    };

    // line 222, lib/opal/dom/element.rb, Element#remove
    Element_prototype.$remove = function() {
      
      
      var el = this.el, parent = el.parentNode;

      if (parent) {
        parent.removeChild(el);
      }

      return this;
    
    };

    // line 235, lib/opal/dom/element.rb, Element#sibling
    Element_prototype.$sibling = function(type) {
      
      
      var el = this.el;

      while (el = el[type]) {
        if (el.nodeType !== 1) {
          continue;
        }

        return __scope.Element.$new(el)
      }

      return nil;
    
    };

    Element_prototype.$succ = Element_prototype.$next;

    // line 253, lib/opal/dom/element.rb, Element#hide
    Element_prototype.$hide = function() {
      
      
      this.el.style.display = 'none';
      return this;
    
    };

    // line 260, lib/opal/dom/element.rb, Element#show
    Element_prototype.$show = function() {
      
      
      this.el.style.display = '';
      return this;
    
    };

    // line 274, lib/opal/dom/element.rb, Element#clear
    Element_prototype.$clear = function() {
      
      
      var el = this.el;

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      return this;
    
    };

    // line 286, lib/opal/dom/element.rb, Element#css
    Element_prototype.$css = function(name, value) {
      
      
      if (value == null) {
        return this.el.style[name];
      }

      return this.el.style[name] = value;
    
    };

    // line 304, lib/opal/dom/element.rb, Element#html
    Element_prototype.$html = function() {
      
      return this.el.innerHTML;
    };

    // line 318, lib/opal/dom/element.rb, Element#html=
    Element_prototype.$html$e = function(html) {
      
      
      var el = this.el, tag = el.tagName.toLowerCase();

      // cleanup event listeners etc from all children
      cleanup_element_children(el);

      // well behaved browsers
      if (supports_inner_html) {
        el.innerHTML = html;
      }
      else {
        console.log("innerHTML broken, workaround.");
      }

      return this;
    
    };

    // line 337, lib/opal/dom/element.rb, Element#text
    Element_prototype.$text = function() {
      
      return text_value(this.el);
    };

    // line 341, lib/opal/dom/element.rb, Element#text=
    Element_prototype.$text$e = function(str) {
      
      this.$clear();
      this.el.appendChild(document.createTextNode(str));
      return this;
    };

    // line 357, lib/opal/dom/element.rb, Element#on
    Element_prototype.$on = TMP_1 = function(type) {
      var __context, handler;
      handler = TMP_1._p || nil, __context = handler._s, TMP_1._p = null;
      
      
      var el       = this.el, 
          data     = storage_for(el),
          events   = data.events || (data.events = {}),
          handlers = events[type];

      if (!handler) {
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
        else {
          el.attachEvent('on' + type, listener);
        }
      }

      handlers.push(handler);

      return handler;
    
    };

    // line 397, lib/opal/dom/element.rb, Element#off
    Element_prototype.$off = TMP_2 = function(type) {
      var __context, handler;
      handler = TMP_2._p || nil, __context = handler._s, TMP_2._p = null;
      
      return nil;
    };

    var magic_key = 'opal-3-142', store_id = 1, stored_data = {};

    
    function storage_for(el) {
      var id = el[magic_key];

      if (id) {
        return stored_data[id];
      } else {
        id = el[magic_key] = store_id++;
        return stored_data[id] = {};
      }
    }
  

    
    var supports_inner_html = true;
    try {
      var table = document.createElement('table');
      table.innerHTML = "<tr><td></td></tr>";
    }
    catch (err) {
      supports_inner_html = false;
    }
  

    
    function nodes_from_html_string(tag, string) {
      var div = document.createElement(tag), arr = [];
      div.innerHTML = string;

      for (var i = 0, n = div.childNodes, l = n.length; i < l; i++) {
        arr[i] = n[i];
      }

      return arr;
    }
  

    
    function cleanup_element_children(elem) {
      var all = elem.getElementsByTagName('*'), el, uid;

      for (var i = 0, length = all.length; i < length; i++) {
        el = all[i];

        if (uid = el[magic_key]) {
          // cleanup based on uid
        }
      }
    }
  

    
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
  
    ;Element._donate(["$initialize", "$lshft$", "$append", "$append_to_body", "$append_to_head", "$add_class", "$has_class$p", "$id", "$inspect", "$class_name", "$class_name$e", "$next", "$prev", "$remove_class", "$remove", "$sibling", "$succ", "$hide", "$show", "$clear", "$css", "$html", "$html$e", "$text", "$text$e", "$on", "$off"]);    ;Element._sdonate(["$aref$", "$parse"]);
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

    // line 13, lib/opal/dom/kernel.rb, Kernel#Element
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
      else if (/\s*</.test(selector)) {
        return __scope.Element.$parse(selector);
      } 
      else {
        var el = document.querySelectorAll(selector), res = __scope.Element.$allocate();

        for (var i = 0, length = el.length; i < length; i++) {
          res[i] = el[i];
        }

        res.length = el.length;
        return res;
      }

      return nil;
    
    };

    // line 53, lib/opal/dom/kernel.rb, Kernel#alert
    Kernel_prototype.$alert = function(msg) {
      
      alert(msg);
      return this;
    };
        ;Kernel._donate(["$Element", "$alert"]);
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
