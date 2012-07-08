# `Element` wraps a native DOM element as a ruby object. The native
# element is stored as the private `el` ivar, but it shouldn't be
# accessed directly.
#
# There are various traversal methods here which mostly ignore non
# element nodes (i.e. text nodes etc will not be returned).
class Element

  # Creates a new instance of Element either by tag name, a real dom
  # element or a string of html content to parse. This method will
  # set the priavte `el` property of this instance to the created
  # element.
  #
  # ## By tag name
  #
  # If no argument is given, or the given string is a tag name, then
  # a new element will be created internally and will be set as the
  # context of this element instance.
  #
  #   Element.new       # => <div>
  #   Element.new 'p'   # => <p>
  #
  # ## With a real native element
  #
  # You can pass a real native dom element into this constructor which
  # will simply make that element the context of this Element instance.
  #
  #   Element.new(`document.getElementById('foo')`) # => <div id="foo">
  #
  # ## Parsing from raw html string
  #
  # Passing a string of html content will result in the first element
  # being parsed from the string content and becoming the context of
  # this instance.
  #
  #   Element.new('<div id="bar"></div>')   # => <div id="bar">
  #
  # If there is more than 1 outer element in the string content, then
  # only the first element will be used. All text/whitespace are also
  # ignored.
  #
  #   Element.new('  <div></div><p></p>')   # => <div>
  #
  # @param [HTMLElement, String] el string or element content
  # @return [Element]
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

  # Get a dom attribute by name.
  #
  #   Document['#foo'][:title]  # => "Some title"
  #
  # @param [Symbol, String] name attribute name to get
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

  def css(name, value = undefined)
    %x{
      if (value == null) {
        return this.el.style[name];
      }

      return this.el.style[name] = value;
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

  # Hides this element by setting the 'display' style property to
  # 'none'.
  #
  # @return [Element] returns receiver
  def hide
    %x{
      this.el.style.display = 'none';
      return this;
    }
  end

  def html
    `this.el.innerHTML`
  end

  # Updates the html content of this element with the given string of
  # html. This will remove any existing html content, replacing it with
  # the given html, finally returning the receiver.
  #
  # Assuming the dom structure:
  #
  #   ```html
  #   <div id="foo">Hello world!</div>
  #   ```
  #
  # Simple text content can be replaced:
  #
  #   Document['#foo'].html = "Toodle pip"
  #   Document['#foo'].html
  #   # => "Toodle pip"
  #
  # HTML strings can be set:
  #
  #   Document['#foo'].html = '<p class="apples">Hello</p>'
  #   Document['#foo'].html
  #   # => '<p class="apples">Hello</p>'
  #
  # Multiple child elements can also be set:
  #
  #   Document['#foo'].html = "<div>Hello</div><div>Lemons</div>"
  #   Document['#foo'].html
  #   # => "<div>Hello</div><div>Lemons</div>"
  #
  # @param [String] html string of html to set
  # @return [Element] returns receiver
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

  # Returns the id of this element, or an empty string if it does not
  # have an id attribute set.
  #
  # Given the html:
  #
  #   ```html
  #   <div id="foo"></div>
  #   <div>Hello</div>
  #   ```
  #
  # The following ruby:
  #
  #   Document['#foo'].id
  #   # => "foo"
  #
  #   Document['#foo'].next.id
  #   # => ""
  #
  # @return [String] element id
  def id
    `this.el.id || ''`
  end

  # Returns string version of this element. The returned string will
  # list the tag name for all elements, as well as an id and class
  # name if set on the receiver.
  #
  # Given the html:
  #
  #   ```html
  #   <div id="foo"></div>
  #   <div id="bar" class="apples"></div>
  #   <div class="foo"></div>
  #   ```
  #
  # This method will result in:
  #
  #   Document['#foo'].inspect
  #   # => '<div id="foo">'
  #
  # @return [String]
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
  #   elem.next     # => Element instance
  #   elem.next     # => nil
  #
  # An optional selector may be passed which will return the next
  # sibling that matches the given css selector.
  #
  #   elem.next('.foo')   # => elem or nil
  #
  # If no element matches the selector then nil will be returned.
  #
  # @param [String] selector optional selector to match
  # @return [Element, nil] next Element if it exists
  def next(selector = undefined)
    sibling :nextSibling, selector
  end

  # Add the given block `handler` as a listener for the event `type`.
  #
  #   Document['#foo'].on :click do |e|
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
        else {
          el.attachEvent('on' + type, listener);
        }
      }

      handlers.push(handler);

      return handler;
    }
  end

  # Remove an event listener.
  def off(type, &handler)
    # ...
  end

  def parent
    sibling :parentNode
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

  # Removes this element from its parent (if it has one) and then
  # returns self. This does not destroy the element, it simply
  # detaches it from the dom.
  #
  # Given the html:
  #
  #   ```html
  #   <div id="outer">
  #     <p>Hello</p>
  #     <p id="foo">Goodbye</p>
  #     <p>Toodle Pip</p>
  #   </div>
  #   ```
  # 
  # and the given ruby:
  # 
  #   Document['#foo'].remove
  #
  # will result in the dom:
  #
  #   ```html
  #   <div id="outer">
  #     <p>Hello</p>
  #     <p>Toodle Pip</p>
  #   </div>
  #   ```
  #
  # @return [Element] returns self
  def remove
    %x{
      var el = this.el, parent = el.parentNode;

      if (parent) {
        parent.removeChild(el);
      }

      return this;
    }
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

  # Removes any inline 'display' property that is being used to hide
  # this element. This will not affect any elements hidden by a css
  # rule by their class name/id.
  #
  # @return [Element] returns receiver
  def show
    %x{
      this.el.style.display = '';
      return this;
    }
  end

  # @param [String] type should be native type (e.g. 'nextSibling')
  def sibling(type, selector = undefined)
    %x{
      var el = this.el;

      while (el = el[type]) {
        if (el.nodeType !== 1) {
          continue;
        }

        if (!selector || Sizzle.matchesSelector(el, selector)) {
          return #{ Element.new `el` }
        }
      }

      return nil;
    }
  end

  alias succ next

  # Returns the tagname of this element
  # @return [String]
  def tag
    `this.el.tagName.toLowerCase()`
  end

  def text
    `Sizzle.getText(this.el)`
  end

  def text=(str)
    self.clear
    `this.el.appendChild(document.createTextNode(str))`
    self
  end

  alias to_s inspect

  # If this element is currently visible, then this will hide the
  # elements, otherwise as the element is hidden it will become
  # visible.
  #
  # @return [Element] returns receiver
  def toggle
    visible? ? hide : show
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

  # Returns true if this element is visible, false otherwise. This
  # relies on the element's display style attribute. Setting the
  # display with a css class will not make this method work as
  # expected.
  #
  # @return [true, false]
  def visible?
    `this.el.style.display !== 'none'`
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