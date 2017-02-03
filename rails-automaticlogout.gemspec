# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'rails/automaticlogout/version'

Gem::Specification.new do |spec|
  spec.name          = "rails-automaticlogout"
  spec.version       = Rails::AutomaticLogout::VERSION
  spec.authors       = ["Thadeu Esteves Jr"]
  spec.email         = ["tadeuu@gmail.com"]

  spec.summary       = %q{Provides automatic session timeout in a Rails application.}
  spec.description   = %q{Provides automatic session timeout in a Rails application.}
  spec.homepage      = "http://github.com/thadeu/rails-automaticlogout"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "actionpack", "~> 3.2"
  spec.add_dependency "alertify-rails", "~> 0.2.0"
end
