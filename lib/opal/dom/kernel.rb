module Kernel

  # @depreciated
  def Element(selector)
    puts "Kernel#Element is depreciated. Use Document[selector]"
    Document[selector]
  end

  alias DOM Element
 
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