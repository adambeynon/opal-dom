Document.ready? do
  # Simple event binding test
  count  = 0

  Element('#target').click do
    count += 1
    Element('#count').html = "Click count: #{count}"
  end

  # Preventing default
  Element('#default').click do |e|
    e.stop
    alert "event should be stopped"
  end

  # Key clicks (shift, ctrl, alt, meta)
  Element('#key-clicks').click do |e|
    str = []
    str << 'shift' if e.shift?
    str << 'ctrl'  if e.ctrl?
    str << 'alt'   if e.alt?
    str << 'meta'  if e.meta?

    e.stop

    DOM('#key-clicks-out').html = str.join(', ')
  end
end