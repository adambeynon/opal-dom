class Event
  def initialize(evt)
    %x{
      this.evt = evt;

      this.alt   = evt.altKey;
      this.ctrl  = evt.ctrlKey;
      this.meta  = evt.metaKey;
      this.shift = evt.shiftKey;
    }
  end

  def alt?
    @alt
  end

  def ctrl?
    @ctrl
  end

  def meta?
    @meta
  end

  # Stops propagation as well as the events default. This is the same
  # as calling both methods individually.
  #
  # @example
  #
  #   DOM('#foo').click do |e|
  #     e.stop # prevent default and propagation
  #   end
  #
  # @return [Event] returns self
  def stop
    prevent_default
    stop_propagation
  end

  def prevent_default
    %x{
      var evt = this.evt;

      if (evt.preventDefault) {
        evt.preventDefault()
      }
      else {
        evt.returnValue = false;
      }

      return this;
    }
  end

  def shift?
    @shift
  end

  def stop_propagation
    %x{
      var evt = this.evt;

      if (evt.stopPropagation) {
        evt.stopPropagation();
      }
      else {
        evt.cancelBubble = true;
      }

      return this;
    }
  end
end