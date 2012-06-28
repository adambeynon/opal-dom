opal-dom: Pure DOM library for Opal
===================================

opal-dom is a dom library for opal to be used in the browser.

## Interacting with the DOM

### Finding Elements

Assuming the HTML:

```html
<div id="foo"></div>
<div id="bar"></div>
```

```ruby
Document['#foo']
# => <div id="foo">

Document['#bleh']
# => nil

Document['#bar'].class
# => Element
```

### Ensuring the DOM is ready

If your scripts run before the document is fully loaded, you may not
have access to the entire dom. To avoid this, use the `ready?` method:

```ruby
Document.ready? do
  puts "DOM is now ready to use!"
end
```

## Element class

### CSS classnames

```html
<div id="foo" class="apples"></div>
```

```ruby
foo = Document['#foo']

foo.class_name
# => 'apples'

foo.add_class 'oranges'

foo.class_name
# => 'apples oranges'

foo.has_class? 'apples'
# => true

foo.remove_class 'apples'

foo.has_class? 'apples'
# => false
```

### Events

The `Element` class has two methods, `Element#on` for registering
events, and `Element#off` for removing them. These methods handle cross
browser differences.

```ruby
Document['#mydiv'].on :click  { puts "div was clicked!" }
```

The event passed into the block is an instance of the `Event` class,
which wraps a native browser event.

```ruby
Document['#mydiv'].on :mousedown do |evt|
  evt.meta?   # => was meta key used
  evt.shift?  # => was shift key used

  evt.stop    # => stop propagation and default action
end
```