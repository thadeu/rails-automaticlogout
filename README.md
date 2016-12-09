# Rails Automatic Logout
By Thadeu Esteves Jr.

[![Gem Version](https://badge.fury.io/rb/rails-automaticlogout@2x.png)](https://badge.fury.io/rb/rails-automaticlogout)

Provides automatic session timeout in a Rails application. Very easy to install and configure. Have you ever wanted to force your users off your app if they go idle for a certain period of time? Many online banking sites use this technique. If your app is used on any kind of public computer system, this plugin is a necessity.

* Force your users power off session
* show for they the regressive time

## Getting started

Rails Automatic Logout works only Rails 4. You can add it to your Gemfile with:

```ruby
gem 'rails-automaticlogout'
```

Then run bundle install

## How to use?

### Configure Controller

After installing, add in your application controller, _ex:_

```ruby
class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # by default is time 1.hour
  automatic_logout_at
end
```

By default the time is _1.hour_

#### Change timeout value.

```ruby
class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # by default is time 1.hour
  automatic_logout_at time: 5.minutes
end
```

#### Change message

```ruby
class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  # by default is time 1.hour
  automatic_logout_at time: 12.hour,
                      message: 'Session expired! You will be redirect.'
end
```

### Configure View (OPTIONAL)

Use Helper in your view, for show regressive timer. Add this in your file application.html.erb

```ruby
<%= regressive_timer %>
```

## TODO
* Add translations
* Add configurations for action_view
* Add Suport for Rails 5.x


## Contributing

We have a long list of valued contributors. Check them all at: https://github.com/Thadeu/rails-automaticlogout.
