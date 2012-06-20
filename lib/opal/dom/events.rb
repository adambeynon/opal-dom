class Element

  EVENTS = %w[click mousedown mouseup]

  EVENTS.each do |evt|
    define_method(evt) do |&handler|
      add_listener evt, &handler
    end
  end

  # @method click(&handler)
  #
  # Register the given block as a handler for the `:click` event. The
  # handler is returned as it should be used for unregistering the
  # event with `#remove_listener`.
  #
  # @example
  #
  #   Element('#foo').click { |e| puts "foo was clicked!" }
  #
  # @return handler

  # @method mousedown(&handler)
  #
  # @example
  #
  #   Element('#foo').mousedown { puts "mousedown on foo" }
  #
  # @return handler

  # @method mouseup(&handler)
  #
  # @example
  #
  #   Element('#foo').mouseup { puts "mouseup on foo" }
  #
  # @return handler

  # Add the given block `handler` as a listener for the event `type`.
  #
  # @example
  #
  #   Element('#foo').add_listener :click do |e|
  #     puts "foo was clicked"
  #   end
  #
  # @param [String] type the event type to listen for
  # @return [Proc] returns the handlder
  def add_listener(type, &handler)
    %x{
      var el = this.el, responder = function(event) {
        if (!event) {
          var event = window.event;
        }
        var evt = #{ Event.new `event` };
        return handler.call(handler._s, evt);
      };

      if (el.addEventListener) {
        el.addEventListener(type, responder, false);
      }
      else if (el.attachEvent) {
        el.attachEvent('on' + type, responder);
      }

      return handler;
    }
  end

  def remove_listener(type, &handler)
    # ...
  end
end