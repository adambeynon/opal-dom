require 'opal-dom'

Document.ready? do
  # Simple event binding test
  count  = 0

  Document['#target'].on :click do
    count += 1
    Document['#count'].html = "Click count: #{count}"
  end

  # Preventing default
  Document['#default'].on :click do |e|
    e.stop
    alert "event should be stopped"
  end

  # Key clicks (shift, ctrl, alt, meta)
  Document['#key-clicks'].on :click do |e|
    str = []
    str << 'shift' if e.shift?
    str << 'ctrl'  if e.ctrl?
    str << 'alt'   if e.alt?
    str << 'meta'  if e.meta?

    e.stop

    Document['#key-clicks-out'].html = str.join(', ')
  end
end