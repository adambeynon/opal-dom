# `Element` wraps a native DOM element as a ruby object. The native
# element is stored as the private `el` ivar, but it shouldn't be
# accessed directly.
#
# There are various traversal methods here which mostly ignore non
# element nodes (i.e. text nodes etc will not be returned).
class Element

  # Wrap a native element
  def self.wrap(element)
    %x{
      element.$m = #{self}.$m_tbl;
      element.$k = #{self};
      return element;
    }
  end

  # Creates a new instance of Element either by tag name, a real dom
  # element or a string of html content to parse. #{self} method will
  # set the priavte `el` property of #{self} instance to the created
  # element.
  #
  # ## By tag name
  #
  # If no argument is given, or the given string is a tag name, then
  # a new element will be created internally and will be set as the
  # context of #{self} element instance.
  #
  #   Element.new       # => <div>
  #   Element.new 'p'   # => <p>
  #
  # ## With a real native element
  #
  # You can pass a real native dom element into #{self} constructor which
  # will simply make that element the context of #{self} Element instance.
  #
  #   Element.new(`document.getElementById('foo')`) # => <div id="foo">
  #
  # ## Parsing from raw html string
  #
  # Passing a string of html content will result in the first element
  # being parsed from the string content and becoming the context of
  # #{self} instance.
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
  def self.new(el = :div)
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
    }

    wrap el
  end

  # Get a dom attribute by name.
  #
  #   Document['#foo'][:title]  # => "Some title"
  #
  # @param [Symbol, String] name attribute name to get
  def [](name)
    %x{
      if (name === 'href') {
        return #{self}.getAttribute(name, 2) || '';
      }
      else {
        return #{self}.getAttribute(name) || '';
      }
    }
  end

  def []=(name, value)
    `#{self}.setAttribute(name, value)`
  end

  def <<(content)
    %x{
      // content is a Element instance
      if (content && content.nodeType) {
        #{self}.appendChild(content);
        return #{self};
      }

      // assume content to be a string
      var tag   = #{self}.tagName.toLowerCase(),
          nodes = nodes_from_html_string(tag, content);

      // add all nodes (including element, text, etc)
      for (var i = 0, length = nodes.length; i < length; i++) {
        #{self}.appendChild(nodes[i]);
      }

      return #{self};
    }
  end

  alias append <<

  def append_to_body
    %x{
      document.body.appendChild(#{self});
      return #{self};
    }
  end

  def append_to_head
    %x{
      document.getElementsByTagName('head')[0].appendChild(#{self});
      return #{self};
    }
  end

  def add_class(name)
    %x{
      var className = #{self}.className;

      if (!className) {
        #{self}.className = name;
      }
      else if((' ' + className + ' ').indexOf(' ' + name + ' ') === -1) {
        #{self}.className += (' ' + name);
      }

      return #{self};
    }
  end

  # Find all elements within the scope of #{self} element that match
  # the given selector. #{self} method will always return an array which
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
        result.push(#{ Element.wrap `set[i]` });
      }

      return result;
    }
  end

  def class_name
    `#{self}.className || ''`
  end

  def class_name=(name)
    %x{
      #{self}.className = name;
      return #{self};
    }
  end

  def css(name, value = undefined)
    %x{
      if (value == null) {
        return #{self}.style[name];
      }

      return #{self}.style[name] = value;
    }
  end

  # Remove all child nodes from #{self} element, and return the receiver.
  # #{self} will remove text nodes as well as real elements.
  #
  #   Document['#foo'].clear
  #
  # @return self
  def clear
    %x{
      while (#{self}.firstChild) {
        #{self}.removeChild(#{self}.firstChild);
      }

      return #{self};
    }
  end

  # Finds the first element matching the given selector that is within
  # the scope of #{self} element. If no matching element is found, then
  # `nil` is returned.
  #
  #   elem.find('.bar')     # => element or nil
  #
  # @param [String] selector css selector to search for
  # @return [Element, nil] matching element or nil
  def find(selector)
    %x{
      var res = Sizzle(selector, #{self});

      if (res.length) {
        return #{ Element.wrap `res[0]` }
      }

      return nil;
    }
  end

  # Returns true if #{self} element has a css class matching the given
  # name, false otherwise.
  #
  #   elem.has_class? 'foo'     # => true or false
  #
  # @param [String] name css classname to check for
  # @return [true, false]
  def has_class?(name)
    %x{
      if ((' ' + #{self}.className + ' ').indexOf(' ' + name + ' ') !== -1) {
        return true;
      }

      return false;
    }
  end

  # Hides #{self} element by setting the 'display' style property to
  # 'none'.
  #
  # @return [Element] returns receiver
  def hide
    %x{
      #{self}.style.display = 'none';
      return #{self};
    }
  end

  def html
    `#{self}.innerHTML`
  end

  # Updates the html content of #{self} element with the given string of
  # html. #{self} will remove any existing html content, replacing it with
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
      var tag = #{self}.tagName.toLowerCase();

      // cleanup event listeners etc from all children
      cleanup_element_children(#{self});

      // well behaved browsers
      if (supports_inner_html) {
        #{self}.innerHTML = html;
      }
      else {
        #{ raise "innerHTML broken, workaround." };
      }

      return #{self};
    }
  end

  # Returns the id of #{self} element, or an empty string if it does not
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
    `#{self}.id || ''`
  end

  # Returns string version of #{self} element. The returned string will
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
  # #{self} method will result in:
  #
  #   Document['#foo'].inspect
  #   # => '<div id="foo">'
  #
  # @return [String]
  def inspect
    %x{
      var str, result = [];

      str = "<" + #{self}.tagName.toLowerCase();

      if (val = #{self}.id) str += (' id="' + val + '"');
      if (val = #{self}.className) str += (' class="' + val + '"');

      return str + '>';
    }
  end

  # Returns the next sibling of #{self} Element. Text nodes are ignored,
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
      var data     = storage_for(#{self}),
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

        if (#{self}.addEventListener) {
          #{self}.addEventListener(type, listener, false);
        }
        else {
          #{self}.attachEvent('on' + type, listener);
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

  # Returns the previous sibling of #{self} Element. Text nodes are
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

  # Removes #{self} element from its parent (if it has one) and then
  # returns self. #{self} does not destroy the element, it simply
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
      var parent = #{self}.parentNode;

      if (parent) {
        parent.removeChild(#{self});
      }

      return #{self};
    }
  end

  def remove_class(name)
    %x{
      var className = ' ' + #{self}.className + ' ';

      className = className.replace(' ' + name + ' ', ' ');
      className = className.replace(/^\\s+/, '').replace(/\\s+$/, '');

      #{self}.className = className;

      return #{self};
    }
  end

  # Removes any inline 'display' property that is being used to hide
  # #{self} element. #{self} will not affect any elements hidden by a css
  # rule by their class name/id.
  #
  # @return [Element] returns receiver
  def show
    %x{
      #{self}.style.display = '';
      return #{self};
    }
  end

  # @param [String] type should be native type (e.g. 'nextSibling')
  def sibling(type, selector = undefined)
    %x{
      var el = #{self};

      while (el = el[type]) {
        if (el.nodeType !== 1) {
          continue;
        }

        if (!selector || Sizzle.matchesSelector(el, selector)) {
          return #{ Element.wrap `el` }
        }
      }

      return nil;
    }
  end

  alias succ next

  # Returns the tagname of #{self} element
  # @return [String]
  def tag
    `#{self}.tagName.toLowerCase()`
  end

  def text
    `Sizzle.getText(#{self})`
  end

  def text=(str)
    self.clear
    `#{self}.appendChild(document.createTextNode(str))`
    self
  end

  alias to_s inspect

  # If #{self} element is currently visible, then #{self} will hide the
  # elements, otherwise as the element is hidden it will become
  # visible.
  #
  # @return [Element] returns receiver
  def toggle
    visible? ? hide : show
  end

  # Returns #{self} elements' parent if it exists.
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
      var el = #{self};

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
          return #{ Element.wrap `el` };
        }
      }

      return nil;
    }
  end

  def value
    `#{self}.value`
  end

  # Returns true if #{self} element is visible, false otherwise. #{self}
  # relies on the element's display style attribute. Setting the
  # display with a css class will not make #{self} method work as
  # expected.
  #
  # @return [true, false]
  def visible?
    `#{self}.style.display !== 'none'`
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

  # Detect if innerHTML is buggy (internet explorer). #{self} info is used
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

  # Remove all children of element and cleanup their events. #{self} will
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