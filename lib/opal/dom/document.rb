module Document
  def self.body_ready?
    `!!(document && document.body)`
  end

  def self.ready?(&block)
    `setTimeout(function() { block.call(block._s); }, 0)`
  end
end