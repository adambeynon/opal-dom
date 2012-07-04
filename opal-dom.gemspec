# -*- encoding: utf-8 -*-
require File.expand_path('../lib/opal/dom/version', __FILE__)

Gem::Specification.new do |s|
  s.name         = 'opal-dom'
  s.version      = Browser::VERSION
  s.author       = 'Adam Beynon'
  s.email        = 'adam@adambeynon.com'
  s.homepage     = 'http://opalrb.org'
  s.summary      = 'DOM library for Opal'
  s.description  = 'DOm library for Opal.'

  s.files          = `git ls-files`.split("\n")
  s.executables    = `git ls-files -- bin/*`.split("\n").map { |f| File.basename(f) }
  s.test_files     = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_paths  = ['lib']
end