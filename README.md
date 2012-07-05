opal-dom: Pure DOM library for Opal
===================================

opal-dom is a dom library for opal to be used in the browser.

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
rake dependencies spec build
```

Open `spec/index.html` in the browser.

## License

Released under the MIT license