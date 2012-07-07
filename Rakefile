require 'bundler'
Bundler.setup

require 'fileutils'
require 'opal'

def build_to(file, &code)
  File.open("build/#{file}.js", 'w+') { |o| o.puts code.call }
end

desc "Build opal-dom, dependencies and specs"
task :build do
  FileUtils.mkdir_p 'build'

  build_to('opal') { Opal.runtime }
  build_to('opal-spec') { Opal.build_gem 'opal-spec' }
  build_to('opal-dom') { Opal.build_files 'lib' }
  build_to('specs') { Opal.build_files 'spec' }
end

desc "Build all examples"
task :examples do
  Dir['examples/**/*.rb'].each do |s|
    out = s.chomp(File.extname(s)) + '.js'
    puts "#{s} => #{out}"
    File.open(out, 'w+') do |o|
      o.write Opal.parse(File.read s)
    end
  end
end