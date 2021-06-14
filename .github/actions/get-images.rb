#!/usr/bin/env ruby
require 'json'

images = Dir['images/macos/templates/*.json']
images += Dir['images/linux/*.json']
images = images.map{|f| File.basename(f, '.json')}

puts JSON.pretty_generate(images)
