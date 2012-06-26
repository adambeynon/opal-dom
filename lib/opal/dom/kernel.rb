module Kernel

  # Main selector interface.
  #
  # @example
  #
  #   # returning single elements by id (or nil if they don't exist)
  #   DOM('#foo')       # => <div id="foo">
  #   DOM('#bar')       # => nil
  #
  # @param [String] selector id or css selector to find
  # @return [DOM, nil] found element or nil
  def DOM(selector)
    %x{
      var el

      if (selector.charAt(0) === '#') {
        el = document.getElementById(selector.substr(1));

        if (el) {
          return #{ DOM.new `el` };
        }
        else {
          var res = #{ DOM.allocate };
          res.length = 0;
          return res;
        }
      }
      else if (/\\s*</.test(selector)) {
        return #{ DOM.parse selector };
      } 
      else {
        var el = document.querySelectorAll(selector), res = #{ DOM.allocate };

        for (var i = 0, length = el.length; i < length; i++) {
          res[i] = el[i];
        }

        res.length = el.length;
        return res;
      }

      return nil;
    }
  end

  # Simple alert dialog
  #
  # @example
  #
  #   alert 'foo'
  #
  # @param [String] msg message to display in alert
  # @return returns receiver
  def alert(msg)
    `alert(msg)`
    self
  end
end