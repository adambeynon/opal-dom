opal-dom: Pure DOM library for Opal
===================================

opal-dom is a dom library for opal to be used in the browser.

## Document

The `Document` module has methods available for interacting with the
native document object. 

### Document.ready?

This method is used to run code once the document is ready and
resources have loaded. Passing a block to this method ensures that
the document body has also loaded.

```ruby
Document.ready? do
  puts "document is ready!"
end
```

You can of course write code outside of `ready?` blocks, but it is
then down to you to ensure the document has actually loaded.

### Document[]

`Document[]` is the main method used for searching the document for
elements with a given id, or elements with the given css selector.

#### Finding elements by id

Elements can be searched for by id, and if found, will be returned as
an instance of the `Element` class. If no matching element is found
then `nil` is returned.

```ruby
Document['#foo']    # => <div id="foo">
Document['#bar']    # => nil
```

#### Finding elements by css selector

Alternatively, to find generic elements by any valid css selector, just
pass the selector into this method. The result is an array containing
the matched elements.

```ruby
Document['.my-class']     # => [<div class="my-class">, ...]
```

If no elements are found then an empty array will be returned.

## Element

The `Element` class is used to wrap native DOM elements as a ruby
object. The native element is stored as a private `.el` property on
the object.

In most of the methods outlined here, only real element objects will
be stored inside an `Element` instance, and usually text nodes etc
will be ignored.

### Element.new

The `Element.new` method can do 3 specific tasks depending on the
argument: create a new dom element, wrap a passed native element or
parse a given html string into a new element.

#### Creating Elements

Passing a tag name (or no argument which defaults to 'div') will create
a new dom element internally and set that as the context of the new
instance.

```ruby
Element.new       # => <div></div>
Element.new 'p'   # => <p></p>
```

#### Wrapping existing elements

It is obviously useful to wrap preexisting elements, which is easily
done by passing the raw element directly into `.new()`.

```ruby
Element.new(`document.getElementById('foo')`)
# => <div id="foo"></div>
```

#### Parsing HTML string

When dealing with modern web apps which use templates, it is useful to
parse a string of html into a new element. A raw html string can be
passed into the constructor which will then wrap the first html element
it parses.

```ruby
Element.new('<div id="foo">Hey there</div>')
# => <div id="foo">

Element.new('<p id="lol"></p><p id="hah"></p>')
# => <p id="lol">
```

It is important to note that only the first element will be parsed, and
all subsequent elements will be ignored. Elements inside the first
element will also be parsed just fine and become children of this new
element.

### CSS classes

#### Element#class_name

Simple returns the css classname for this element. If no classname
exists, then an empty string will be returned.

```html
<div id="foo" class="user"></div>
<div id="bar"></div>
```

```ruby
Document['#foo'].class_name     # => "user"
Document['#bar'].class_name     # => ""
```

#### Element#class_name=

Used to set the css classname. This will overwrite any classnames that
already exist on the element.

```html
<div id="foo" class="apples"></div>
```

```ruby
foo = Document['#foo']
foo.class_name
# => "apples"

foo.class_name = "oranges"
foo.class_name
# => "oranges"
```

#### Element#add_class

Adds the given css classname to the element. This does not override
any existing classnames, but just appends to it.

```html
<div id="foo" class="apples"></div>
```

```ruby
foo = Document['#foo']
foo.class_name
# => "apples"

foo.add_class "oranges"
foo.class_name
# => "apples oranges"

foo.add_class "apples"
foo.class_name
# => "apples oranges"
```

As seen here it is clear that classnames will not be duplicated on the
element.

#### Element#remove_class

Used to remove an existing css classname from the element. If the
element doesn't actually have the class name then there is no effect.

```html
<div id="foo" class="apples oranges"></div>
```

```ruby
foo = Document['#foo']

foo.remove_class 'apples'
foo.class_name
# => "oranges"

foo.remove_class "oranges"
foo.remove_class "apples"
foo.class_name
# => ""
```

### Element manipulation

#### Element#html

Returns the html content of the element. The result will be a string
of all the contents inside this element.

```html
<div id="foo"><p>Hello world</p></div>
```

```ruby
Document['#foo'].html
# => "<p>Hello World</p>"
```

#### Element#html=

Sets the html content of this element to the given string. Any existing
content is removed from the element first.

```html
<!-- initial -->
<div id="foo"><p>Hello</p></div>
```

```ruby
Document['#foo'].html = '<a href="example.com">Click me</a>'
```

```html
<!-- result -->
<div id="foo"><a href="example.com">Click me</a></div>
```

