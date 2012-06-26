opal-dom: Pure DOM library for Opal
===================================

opal-dom is based around the `DOM` class which wraps a native dom
element.

## Finding Elements

Assuming the HTML:

```html
<div id="foo"></div>
<div id="bar"></div>
```

```ruby
DOM('#foo')
# => <div id="foo">

DOM('#bleh')
# => nil

DOM('#bar').class
# => DOM
```

## CSS Classes

```html
<div id="foo" class="apples"></div>
```

```ruby
foo = DOM '#foo'

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