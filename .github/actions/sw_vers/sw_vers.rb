#!/usr/bin/env ruby

if `sw_vers`.match(/^ProductVersion:\s*(.*)$/)
  puts $1
else
  abort 'Could not extract macOS version'
end
