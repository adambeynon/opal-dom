class Element

  # Alias for `Kernel#Element()`
  # @param [String] str id, selector or html string
  def self.[](str)
    Element(str)
  end

  # Create new `Element` instance either by passing a string which
  # represents a tag name to create, or by passing a native DOM
  # element which will then be wrapped by this new instance. Any
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
  # @param [String, HTMLElement] el tag name or native element to create
  # @return [Element] returns self
  def initialize(el = :div)
    %x{
      if (typeof(el) === 'string') {
        el = document.createElement(el);
      }

      if (!el || !el.nodeType) {
        throw new Error('not a valid element');
      }

      this.el = el;
    }
  end

  def <<(content)
    `console.log("appending: ");`
    `console.log(content);`
    `this.el.appendChild(content.el)`
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
      document.head.appendChild(this.el);
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

  def has_class?(name)
    %x{
      (' ' + this.el.className + ' ').indexOf(' ' + name + ' ') !== -1
    }
  end

  def inspect
    %x{
      var val, el = this.el, str = '<' + el.tagName.toLowerCase();

      if (val = el.id) str += (' id="' + val + '"');
      if (val = el.className) str += (' class="' + val + '"');

      return str + '>';
    }
  end

  def class_name
    %x{
      return this.el.className || '';
    }
  end

  def class_name=(name)
    %x{
      return this.el.className = name;
    }
  end

  def next
    sibling :nextSibling
  end

  # Returns the previous sibling of this element. Text nodes are
  # ignored, and if no element is found then `nil` is returned.
  #
  # @example
  #
  #   elem.prev     # => element instance
  #   elem.prev     # => nil
  #
  # @return [Element, nil] previous element or nil
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
        if (el.nodeType !== -1) {
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

  # Remove all child nodes from this element. Returns self.
  #
  # @example
  #
  #   DOM('#foo').clear       # => <div id="foo">
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

  def html=(html)
    %x{
      this.el.innerHTML = html;

      return this;
    }
  end
end