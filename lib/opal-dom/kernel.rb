module Kernel
 
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