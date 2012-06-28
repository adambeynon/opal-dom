module Document

  def self.[](selector)
    %x{
      if (selector.charAt(0) === '#') {
        var el = document.getElementById(selector.substr(1));

        if (el) {
          return #{ Element.new `el` }
        }

        return nil;
      }
      else {
        return __slice.call(document.querySelectorAll(selector));
      }
    }
  end

  def self.ready?(&block)
    `setTimeout(function() { block.call(block._s); }, 0)`
  end
end