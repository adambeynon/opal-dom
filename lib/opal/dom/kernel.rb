module Kernel

  # Main selector interface.
  #
  # @example
  #
  #   # returning single elements by id (or nil if they don't exist)
  #   Element('#foo')       # => <div id="foo">
  #   Element('#bar')       # => nil
  #
  # @param [String] selector id or css selector to find
  # @return [Element, nil] found element or nil
  def Element(selector)
    %x{
      var el

      if (selector.charAt(0) === '#') {
        el = document.getElementById(selector.substr(1));

        if (el) {
          return #{ Element.new `el` };
        }
        else {
          return nil;
        }
      }
      else {
        return #{ DOM.parse selector }
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