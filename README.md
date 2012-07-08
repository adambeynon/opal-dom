opal-dom: DOM library for Opal
===================================

opal-dom is a dom library for opal to be used in the browser.

## Usage

Add to your Gemfile:

```ruby
# Gemfile
gem "opal-dom"
```

Add to opal builder task:

```ruby
# Rakefile
Opal::RakeTask.new do |t|
  t.dependencies = ['opal-dom']
end
```

Finally, require it in your opal app:

```ruby
# app.rb
require 'opal-dom'

Document.ready? do
  alert "document is ready!"
end
```

## HTTP

The `HTTP` class is a wrapper around the native browser 
`XMLHttpRequest`.

Usage example:

```ruby
HTTP.get("api/users/1") do |res|
  alert res.body
end
```

The response can be easily parsed from json using the `json`
convenience method.

```ruby
HTTP.get("api/users/1.json") do |res|
  puts res.json
end

# => {"name" => "Adam Beynon", "age" => 26, ...}
```

## Running specs

Clone repo:

```
git clone git://github.com/adambeynon/opal-dom.git
```

Get gems:

```
bundle install
```

Build opal-spec, opal-dom and the actual specs:

```
rake opal
```

Open `spec/index.html` in the browser.

## License

Released under the MIT license