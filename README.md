opal-dom: Pure DOM library for Opal
===================================

opal-dom is a dom library for opal to be used in the browser.

## Document

The `Document` module has methods available for interacting with the
native document object. 

### ready?

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

### Creating Elements

Passing a tag name (or no argument which defaults to 'div') will create
a new dom element internally and set that as the context of the new
instance.

```ruby
Element.new       # => <div></div>
Element.new 'p'   # => <p></p>
```

### Wrapping existing elements

It is obviously useful to wrap preexisting elements, which is easily
done by passing the raw element directly into `.new()`.

```ruby
Element.new(`document.getElementById('foo')`)
# => <div id="foo"></div>
```

### Parsing HTML string

When dealing with modern web apps which use templates, it is useful to
parse a string of html into a new element. A raw html string can be
passed into the constructor which will then wrap the first html element
it parses.

```ruby
Element.new('<div id="foo">Hey there</div>')
# => <div id="foo">

Element.new('<p id="lol"></p><p id="hah"></p>')
# => <div id="lol">
```

It is important to note that only the first element will be parsed, and
all subsequent elements will be ignored. Elements inside the first
element will also be parsed just fine and become children of this new
element.