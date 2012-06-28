module Document

  # When given an element id, of the form `#foo`, then this will return
  # a new Element instance wrapping that given element. If the element
  # does not actually exist then nil will be returned.
  #
  # If a generic CSS selector is given, then an array of matching
  # elements will be returned, even if the array is empty.
  #
  # @example
  #
  #   # finding by id
  #   Document['#foo']    # => <div id="foo">
  #   Document['#bar']    # => nil
  #
  #   # finding by css selector
  #   Document['.my_class']   # => [...]
  #
  # @param [String] selector element id or css selector
  # @return [Element, Array<Element>]
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
        var el = document.querySelectorAll(selector), res = #{ Element.allocate };

        for (var i = 0, length = el.length; i < length; i++) {
          res[i] = el[i];
        }

        res.length = el.length;
        return res;
      }
    }
  end

  def self.ready?(&block)
    `setTimeout(function() { block.call(block._s); }, 0)`
  end
end