class Element

  # Alias for `Kernel#Element()`
  # @param [String] str id, selector or html string
  def self.[](str)
    Element(str)
  end

  # Parses the given html string into a new element. Only the first
  # element will be returned. If no elements are found then an error
  # will be raised.
  def self.parse(str)
    %x{
      var nodes = nodes_from_html_string('div', str), node;

      for (var i = 0, length = nodes.length; i < length; i++) {
        node = nodes[i];

        if (node.nodeType === 1) {
          return #{ Element.new `node` }
        }
      }

      #{ raise "no Element node in content" }
    }
  end

  # Create new `Element` instance either by passing a string which
  # represents a tag name to create, or by passing a native Element
  # Element which will then be wrapped by this new instance. Any
  # other argument type will result in an error.
  #
  # @example
  #
  #   Element.new
  #   # => <div>
  #
  #   Element.new 'p'
  #   # => <p>
  #
  #   Element.new `document.getElementById('foo')
  #   # => <div id="foo">
  #
  # @param [String, HTMLElement] el tag name or native Element to create
  # @return [Element] returns self
  def initialize(el = :div)
    %x{
      if (typeof(el) === 'string') {
        el = document.createElement(el);
      }

      if (!el || (el.nodeType !== 1)) {
        #{ raise "not a valid Element" }
      }

      this.el = el;
      return this;
    }
  end

  def <<(content)
    %x{
      // content is a Element instance
      if (content.el && content.el.nodeType) {
        this.el.appendChild(content.el);
        return this;
      }

      // assume content to be a string
      var tag   = this.el.tagName.toLowerCase(),
          nodes = nodes_from_html_string(tag, content);

      // add all nodes (including element, text, etc)
      for (var i = 0, length = nodes.length; i < length; i++) {
        this.el.appendChild(nodes[i]);
      }

      return this;
    }
  end

  alias append <<

  def append_to_body
    %x{
      document.body.appendChild(this.el);
      return this;
    }
  end

  def append_to_head
    %x{
      document.getElementsByTagName('head')[0].appendChild(this.el);
      return this;
    }
  end

  # Adds the given classname `name` to this Element. This method has no
  # effect if the Element already has the given classname.
  #
  # @example
  #
  #   Element('#foo').add_class 'bar'
  #
  # @param [String] name classname to add
  # @return [Element] returns self
  def add_class(name)
    %x{
      var el = this.el, className = el.className;

      if (!className) {
        el.className = name;
      }
      else if((' ' + className + ' ').indexOf(' ' + name + ' ') === -1) {
        el.className += (' ' + name);
      }

      return this;
    }
  end

  # Returns `true` if this Element has the given classname in its set
  # of classes, `false` otherwise.
  #
  # @example
  #
  #   # <div id="foo" class="apples"></div>
  #
  #   Element('#foo').has_class?('apples')    # => true
  #   Element('#foo').has_class?('oranges')   # => false
  #
  # @param [String] name the classname to check for
  # @return [true, false]
  def has_class?(name)
    %x{
      var el = this.el;

      if ((' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1) {
        return true;
      }

      return false;
    }
  end

  def id
    `this.el.id || ''`
  end

  def inspect
    %x{
      var el, str, result = [];

      el  = this.el;
      str = "<" + el.tagName.toLowerCase();

      if (val = el.id) str += (' id="' + val + '"');
      if (val = el.className) str += (' class="' + val + '"');

      return str + '>';
    }
  end

  def class_name
    `this.el.className || ''`
  end

  def class_name=(name)
    %x{
      this.el.className = name;
      return this;
    }
  end

  # Returns the next sibling of this Element. Text nodes are ignored,
  # and if there is no next Element then `nil` is returned.
  #
  # @example
  #
  #   elem.next     # => Element instance
  #   elem.next     # => nil
  #
  # @return [Element, nil] next Element if it exists
  def next
    sibling :nextSibling
  end

  # Returns the previous sibling of this Element. Text nodes are
  # ignored, and if no Element is found then `nil` is returned.
  #
  # @example
  #
  #   elem.prev     # => Element instance
  #   elem.prev     # => nil
  #
  # @return [Element, nil] previous Element or nil
  def prev
    sibling :previousSibling
  end

  # Removes the given classname from this Elements' class. There is no
  # effect if this Element does not have the given classname.
  #
  # @example
  #
  #   Element('#foo').remove_class 'apples'
  #
  # @param [String] name classname to remove
  # @return [Element] returns self
  def remove_class(name)
    %x{
      var el = this.el, className = ' ' + el.className + ' ';

      className = className.replace(' ' + name + ' ', ' ');
      className = className.replace(/^\\s+/, '').replace(/\\s+$/, '');

      el.className = className;

      return this;
    }
  end

  def remove
    %x{
      var el = this.el, parent = el.parentNode;

      if (parent) {
        parent.removeChild(el);
      }

      return this;
    }
  end

  # @param [String] type should be native type (e.g. 'nextSibling')
  def sibling(type)
    %x{
      var el = this.el;

      while (el = el[type]) {
        if (el.nodeType !== 1) {
          continue;
        }

        return #{ Element.new `el` }
      }

      return nil;
    }
  end

  alias succ next

  def hide
    %x{
      this.el.style.display = 'none';
      return this;
    }
  end

  def show
    %x{
      this.el.style.display = '';
      return this;
    }
  end

  # Remove all child nodes from this Element. Returns self.
  #
  # @example
  #
  #   Element('#foo').clear       # => <div id="foo">
  #
  # @return self
  def clear
    %x{
      var el = this.el;

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      return this;
    }
  end

  def css(name, value = undefined)
    %x{
      if (value == null) {
        return this.el.style[name];
      }

      return this.el.style[name] = value;
    }
  end

  # Returns a string representing the html content inside this Element.
  #
  # @example
  #
  #   Element('#title').html
  #   # => "<p>Hello world</p>"
  #
  # @return [String]
  def html
    `this.el.innerHTML`
  end

  # Set the inner html of this Element to the given string.
  #
  # @example
  #
  #   e = Element.new
  #   e.html = "<p>hello</p>"
  #   # => "<div><p>hello</p></div>"
  #
  # @param [String] html the string to set
  # @return [Element] returns self
  def html=(html)
    %x{
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
    }
  end

  def text
    `text_value(this.el)`
  end

  def text=(str)
    self.clear
    `this.el.appendChild(document.createTextNode(str))`
    self
  end

  # Add the given block `handler` as a listener for the event `type`.
  #
  # @example
  #
  #   Element('#foo').on :click do |e|
  #     puts "foo was clicked"
  #   end
  #
  # @param [String] type the event type to listen for
  # @return [Proc] returns the handlder
  def on(type, &handler)
    %x{
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
        else {
          el.attachEvent('on' + type, listener);
        }
      }

      handlers.push(handler);

      return handler;
    }
  end

  def off(type, &handler)
    # ...
  end

  def parent
    sibling :parentNode
  end

  # JS HELPERS
  # ==========

  # Magic property set on elements to retrieve their custom data.
  # Stored data is a map of store_id => {}, where object holds that
  # elements data and events etc.
  `var magic_key = 'opal-3-142', store_id = 1, stored_data = {};`

  # Return storage object for given element. One is created and uid set
  # if not already existing.
  %x{
    function storage_for(el) {
      var id = el[magic_key];

      if (id) {
        return stored_data[id];
      } else {
        id = el[magic_key] = store_id++;
        return stored_data[id] = {};
      }
    }
  }

  # Detect if innerHTML is buggy (internet explorer). This info is used
  # when creating elements from strings, and updating the contents of
  # elements.
  %x{
    var supports_inner_html = true;
    try {
      var table = document.createElement('table');
      table.innerHTML = "<tr><td></td></tr>";
    }
    catch (err) {
      supports_inner_html = false;
    }
  }

  # Parse the given html string into an array of dom nodes. The given
  # tag is the name of the wrapping element where it will be inserted
  # which is useful for overcoming some awkward IE bugs
  %x{
    function nodes_from_html_string(tag, string) {
      // FIXME: temp fix for IE not parsing <style> tags etc if there
      // is no leading content
      string = '_' + string;

      var div = document.createElement(tag), arr = [];
      div.innerHTML = string;

      for (var i = 0, n = div.childNodes, l = n.length; i < l; i++) {
        arr[i] = n[i];
      }

      for (var i = 0, length = arr.length; i < length; i++) {
        div.removeChild(arr[i]);
      }

      // FIXME: we don't use first child as we inserted a fake node
      // above ('_' as text node);
      arr.shift();

      return arr;
    }
  }

  # Remove all children of element and cleanup their events. This will
  # leave the actual passed element alone
  %x{
    function cleanup_element_children(elem) {
      var all = elem.getElementsByTagName('*'), el, uid;

      for (var i = 0, length = all.length; i < length; i++) {
        el = all[i];

        if (uid = el[magic_key]) {
          // cleanup based on uid
        }
      }
    }
  }

  # Recursively gather all the text contents of this element and its
  # children.
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
end