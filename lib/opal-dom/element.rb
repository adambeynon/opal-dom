# `Element` wraps a native DOM element as a ruby object. The native
# element is stored as the private `el` ivar, but it shouldn't be
# accessed directly.
#
# There are various traversal methods here which mostly ignore non
# element nodes (i.e. text nodes etc will not be returned).
class Element

  def initialize(el = :div)
    %x{
      if (typeof(el) === 'string') {
        // passing html string?
        if (/\\s*</.test(el)) {
          var nodes = nodes_from_html_string('div', el);

          for (var i = 0, length = nodes.length; i < length; i++) {
            el = nodes[i];

            if (el.nodeType === 1) {
              break;
            }
          }
        }
        else {
          // otherwise try and create element by tag name
          el = document.createElement(el);
        }
      }

      if (!el || (el.nodeType !== 1)) {
        #{ raise "not a valid Element" }
      }

      this.el = el;
      return this;
    }
  end

  def [](name)
    %x{
      if (name === 'href') {
        return this.el.getAttribute(name, 2) || '';
      }
      else {
        return this.el.getAttribute(name) || '';
      }
    }
  end

  def []=(name, value)
    `this.el.setAttribute(name, value)`
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

  # Find all elements within the scope of this element that match
  # the given selector. This method will always return an array which
  # will contain 0 or more matching elements.
  #
  #   elem.all('.foo')    # => []
  #
  # @param [String] selector css selector to search for
  # @return [Array<Element>] matching elements
  def all(selector)
    %x{
      var result = [], set = Sizzle(selector);

      for (var i = 0, length = set.length; i < length; i++) {
        result.push(#{ Element.new `set[i]` });
      }

      return result;
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

  # Remove all child nodes from this element, and return the receiver.
  # This will remove text nodes as well as real elements.
  #
  #   Document['#foo'].clear
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

  # Finds the first element matching the given selector that is within
  # the scope of this element. If no matching element is found, then
  # `nil` is returned.
  #
  #   elem.find('.bar')     # => element or nil
  #
  # @param [String] selector css selector to search for
  # @return [Element, nil] matching element or nil
  def find(selector)
    %x{
      var res = Sizzle(selector, this.el);

      if (res.length) {
        return #{ Element.new `res[0]` }
      }

      return nil;
    }
  end

  # Returns true if this element has a css class matching the given
  # name, false otherwise.
  #
  #   elem.has_class? 'foo'     # => true or false
  #
  # @param [String] name css classname to check for
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

  def css(name, value = undefined)
    %x{
      if (value == null) {
        return this.el.style[name];
      }

      return this.el.style[name] = value;
    }
  end

  def html
    `this.el.innerHTML`
  end

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
        #{ raise "innerHTML broken, workaround." };
      }

      return this;
    }
  end

  def text
    `Sizzle.getText(this.el)`
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

  # Returns the tagname of this element
  # @return [String]
  def tag
    `this.el.tagName.toLowerCase()`
  end

  # Returns this elements' parent if it exists.
  #
  #   Document['#foo'].up     # => element
  #
  # If a selector is given then the first parent matching the given
  # selector will be returned.
  #
  #   Document['#foo'].up('.title') # => element
  #
  # In both cases, if no element is found then `nil` will be returned.
  #
  # @param [String] selector optional selector to use
  # @return [Element, nil]
  def up(selector = undefined)
    %x{
      var el = this.el;

      if (selector == null) {
        if (el = el.parentNode) {
          return #{ Element.new `el` };
        }

        return nil;
      }

      while (el = el.parentNode) {
        if (el.nodeType !== 1) {
          continue;
        }

        if (Sizzle.matchesSelector(el, selector)) {
          return #{ Element.new `el` };
        }
      }

      return nil;
    }
  end

  def value
    `this.el.value`
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
end