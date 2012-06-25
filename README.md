opal-dom: Pure DOM library for Opal
===================================

opal-dom is based around the `Element` class which wraps a native dom
element, and the `ElementSet` class that contains 0 or more `Element`
instances. `ElementSet` can be used to perform "mass" operations on
collections of DOM elements.

## Finding Elements

Assuming the HTML:

```html
<div id="foo"></div>
<div id="bar"></div>
```

```ruby
Element('#foo')
# => <div id="foo">

Element('#bleh')
# => nil

Element('#bar').class
# => Element
```

## CSS Classes

```html
<div id="foo" class="apples"></div>
```

```ruby
foo = Element '#foo'

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