class DOM
  def self.find(selector)
    nil
  end

  def initialize(type = :div)
    %x{
      if (typeof(type) === 'string') {
        type = document.createElement(type);
      }

      if (!type || !type.nodeType) {
        throw new Error('not a valid element');
      }

      this[0] = type;
      this.length = 1;
    }
  end

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

  def class_name
    %x{
      if (this.length === 0) {
        return '';
      }

      return this[0].className || '';
    }
  end

  def class_name=(name)
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        this[i].className = name;
      }

      return name;
    }
  end

  def remove_class(name)
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        var el = this[i], className = ' ' + el.className + ' ';

        className = className.replace(' ' + name + ' ', ' ');
        className = className.replace(/^\\s+/, '').replace(/\\s+$/, '');

        el.className = className;
      }

      return this;
    }
  end

  def remove
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        var el = this[i], parent = el.parentNode;

        if (parent) {
          parent.removeChild(el);
        }
      }

      return this;
    }
  end

  def hide
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        this[i].style.display = 'none';
      }

      return this;
    }
  end

  def show
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        this[i].style.display = '';
      }

      return this;
    }
  end

  def clear
    %x{
      for (var i = 0, length = this.length; i < length; i++) {
        var el = this[i];

        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      }

      return this;
    }
  end

  def html=(html)
    %x{
      if (this.length) {
        this[0].innerHTML = html;
      }

      return this;
    }
  end

  def append(content)
    %x{
      this;
    }
  end
end