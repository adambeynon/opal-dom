class DOM
  def self.parse(str)
    %x{
      var el = document.createElement('div');
      el.innerHTML = str;

      var child = el.firstChild;

      while (child) {
        if (child.nodeType !== 1) {
          child = child.nextSibling
          continue;
        }

        return #{ Element.new `child` }
      }

      #{ raise "no DOM node in content" }
    }
  end
end