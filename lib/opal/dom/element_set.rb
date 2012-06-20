# An array like class (similar to jquery/zepto) which contains 0 or
# more elements that have matched a particular selector.
#
# Internally, each element is stored as a native DOM element. Calling
# `#each` will yield each member as an `Element` instance, as well as
# using the `#at()` method.
#
# When dealing with a single element, e.g. by id, then it is always
# recomended to use a single `Element` class as it should be faster
# than looping over a single element with a for-loop each time.
class ElementSet

  # @example
  #
  #   ElementSet.new('.foo')      # => (<div class="foo">, <p class="foo">)
  #
  # @param [String] selector
  # @param [Element] context
  def initialize(selector, context)
    # Sizzle(), querySelectorAll() ...
    @length = 0
  end

  def each(&block)
    `for (var i = 0, length = this.length; i < length; i++) {`
      yield `this[i]`
    `}`

    self
  end

  def length
    `this.length`
  end

  alias size length
end