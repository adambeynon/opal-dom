class DOM

  # Alias for `Kernel#DOM()`
  # @param [String] str id, selector or html string
  def self.[](str)
    DOM(str)
  end

  def self.parse(str)
    %x{
      var el = document.createElement('div');
      // awkward IE
      el.innerHTML = "_" + str;

      var child = el.firstChild;

      while (child) {
        if (child.nodeType !== 1) {
          child = child.nextSibling
          continue;
        }

        return #{ DOM.new `child` }
      }

      #{ raise "no DOM node in content" }
    }
  end

  # Create new `DOM` instance either by passing a string which
  # represents a tag name to create, or by passing a native DOM
  # DOM which will then be wrapped by this new instance. Any
  # other argument type will result in an error.
  #
  # @example
  #
  #   DOM.new
  #   # => <div>
  #
  #   DOM.new 'p'
  #   # => <p>
  #
  #   DOM.new `document.getDOMById('foo')
  #   # => <div id="foo">
  #
  # @param [String, HTMLElement] el tag name or native DOM to create
  # @return [DOM] returns self
  def initialize(el = :div)
    %x{
      if (typeof(el) === 'string') {
        el = document.createElement(el);
      }

      if (!el || !el.nodeType) {
        throw new Error('not a valid DOM');
      }

      this[0] = el;
      this.length = 1;
    }
  end

  def <<(content)
    `this[0].appendChild(content[0])`
  end

  alias append <<

  def append_to_body
    %x{
      document.body.appendChild(this[0]);
      return this;
    }
  end

  def append_to_head
    %x{
      document.getElementsByTagName('head')[0].appendChild(this[0]);
      return this;
    }
  end

  # Adds the given classname `name` to this DOM. This method has no
  # effect if the DOM already has the given classname.
  #
  # @example
  #
  #   DOM('#foo').add_class 'bar'
  #
  # @param [String] name classname to add
  # @return [DOM] returns self
  def add_class(name)
    %x{
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
    }
  end

  # Returns `true` if this DOM has the given classname in its set
  # of classes, `false` otherwise.
  #
  # @example
  #
  #   # <div id="foo" class="apples"></div>
  #
  #   DOM('#foo').has_class?('apples')    # => true
  #   DOM('#foo').has_class?('oranges')   # => false
  #
  # @param [String] name the classname to check for
  # @return [true, false]
  def has_class?(name)
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        var el = this[i];

        if ((' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1) {
          return true;
        }
      }

      return false;
    }
  end

  def id
    `(this[0] && this[0].id) || ''`
  end

  def inspect
    %x{
      var val, el, str, result = [];

      for (var i = 0, length = this.length; i < length; i++) {
        el  = this[i];
        str = "<" + el.tagName.toLowerCase();

        if (val = el.id) str += (' id="' + val + '"');
        if (val = el.className) str += (' class="' + val + '"');

        result.push(str + '>');
      }

      return '(' + result.join(', ') + ')';
    }
  end

  def class_name
    `this[0] ? this[0].className || '' : ''`
  end

  def class_name=(name)
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        this[i].className = name;
      }

      return this;
    }
  end

  # Returns the number of elements in this collection.
  # @return [Numeric]
  def length
    `this.length`
  end

  # Returns the next sibling of this DOM. Text nodes are ignored,
  # and if there is no next DOM then `nil` is returned.
  #
  # @example
  #
  #   elem.next     # => DOM instance
  #   elem.next     # => nil
  #
  # @return [DOM, nil] next DOM if it exists
  def next
    sibling :nextSibling
  end

  # Returns the previous sibling of this DOM. Text nodes are
  # ignored, and if no DOM is found then `nil` is returned.
  #
  # @example
  #
  #   elem.prev     # => DOM instance
  #   elem.prev     # => nil
  #
  # @return [DOM, nil] previous DOM or nil
  def prev
    sibling :previousSibling
  end

  # Removes the given classname from this DOMs' class. There is no
  # effect if this DOM does not have the given classname.
  #
  # @example
  #
  #   DOM('#foo').remove_class 'apples'
  #
  # @param [String] name classname to remove
  # @return [DOM] returns self
  def remove_class(name)
    %x{
      var el = this[0], className = ' ' + el.className + ' ';

      className = className.replace(' ' + name + ' ', ' ');
      className = className.replace(/^\\s+/, '').replace(/\\s+$/, '');

      el.className = className;

      return this;
    }
  end

  def remove
    %x{
      var el = this[0], parent = el.parentNode;

      if (parent) {
        parent.removeChild(el);
      }

      return this;
    }
  end

  # @param [String] type should be native type (e.g. 'nextSibling')
  def sibling(type)
    %x{
      var el = this[0];

      while (el = el[type]) {
        if (el.nodeType !== 1) {
          continue;
        }

        return #{ DOM.new `el` }
      }

      return nil;
    }
  end

  alias size length

  alias succ next

  def hide
    %x{
      this[0].style.display = 'none';
      return this;
    }
  end

  def show
    %x{
      this[0].style.display = '';
      return this;
    }
  end

  # Remove all child nodes from this DOM. Returns self.
  #
  # @example
  #
  #   DOM('#foo').clear       # => <div id="foo">
  #
  # @return self
  def clear
    %x{
      var el = this[0];

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      return this;
    }
  end

  def css(name, value = undefined)
    %x{
      if (value == null) {
        return this[0].style[name];
      }

      return this[0].style[name] = value;
    }
  end

  # Returns a string representing the html content inside this DOM.
  #
  # @example
  #
  #   DOM('#title').html
  #   # => "<p>Hello world</p>"
  #
  # @return [String]
  def html
    `this[0].innerHTML`
  end

  # Set the inner html of this DOM to the given string.
  #
  # @example
  #
  #   e = DOM.new
  #   e.html = "<p>hello</p>"
  #   # => "<div><p>hello</p></div>"
  #
  # @param [String] html the string to set
  # @return [DOM] returns self
  def html=(html)
    %x{
      this[0].innerHTML = html;

      return this;
    }
  end

  ##
  # start: detect IE innerHTML bugs
    supports_inner_html = true
    %x{
      try {
        var table = document.createDOM('table');
        table.innerHTML = "<tr><td></td></tr>";
      } catch (err) {
        supports_inner_html = false;
      }
    }

    unless supports_inner_html
      def html=(html)
        `this[0].innerHTML = html;`
        self
      end
    end
  # end: detect IE innerHTML bugs
  ##

  def text
    `text_value(this[0])`
  end

  def text=(str)
    self.clear
    `this[0].appendChild(document.createTextNode(str))`
    self
  end

  %x{
    function text_value(el) {
      var type = el.nodeType, result = '';

      if (type === 1 || type === 9 || type === 11) {
        if (typeof(el.textContent) === 'string') {
          return el.textContent;
        }
        else if (typeof(el.innerText) === 'string') {
          return el.innerText.replace(/\\r/g, '');
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
  }

  # Storage - to allow multiple instances of DOM to deal with the same
  # element, we give each element a magic property that allows us to
  # uniquely identify it. Events, data etc are then stored on an
  # external object so it can be accessed by different instances.
  %x{
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
  }

  # Add the listener to a specific element. This is done once per
  # element per type. Once a listener is registered, it will be
  # called by the first handler.
  %x{
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

          var e = #{ Event.new `event` }

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
  }

  # Add the given block `handler` as a listener for the event `type`.
  #
  # @example
  #
  #   DOM('#foo').on :click do |e|
  #     puts "foo was clicked"
  #   end
  #
  # @param [String] type the event type to listen for
  # @return [Proc] returns the handlder
  def on(type, &handler)
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        add_listener(this[i], type, handler);
      }

      return handler;
    }
  end

  def off(type, &handler)
    # ...
  end
end