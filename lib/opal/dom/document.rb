# Document represents the main document object in the browser.
module Document

  # This is the main method used for searching the document for
  # elements with a given id, or elements with a given css selector.
  #
  # Elements can be searched for by id, and if found, will be returned
  # as an instance of the `Element` class. If no matching element is
  # found then `nil` is returned.
  #
  #     Document['#foo']    # => <div id="foo">
  #     Document['#bar']    # => nil
  #
  # Alternatively, to search for elements by a generic css selector,
  # just pass the css selector into this method. The result will be an
  # array containing the matched elements.
  #
  #     Document['.my-class']     # => array of matched elements
  #
  # If no elements are found whne searching for css selectors, then an
  # empty array will be returned.
  #
  # @param [String] selector the element id or css selector to search
  # @return [Element, Array<Element>, nil] matched result
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

  # This method can be used to run a block of code once the document is
  # ready and resources have loaded. Passing a block to this method
  # ensures that `document.body` is also ready.
  #
  #     Document.ready? do
  #       puts "Document is now ready"
  #     end
  #
  # @return [self] returns Document module
  def self.ready?(&block)
    `setTimeout(function() { block.call(block._s); }, 0)`
    self
  end
end