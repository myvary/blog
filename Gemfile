source 'https://rubygems.org'
#source "https://gems.ruby-china.com"
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 5.2'
gem 'pg', '~> 0.18'
gem 'puma', '~> 4.3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'bootstrap'
gem 'jquery-rails'
gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'font-awesome-sass', '~> 5.0.9'
gem 'capistrano'
gem 'capistrano-bundler'
gem 'capistrano-rails'
gem 'capistrano-rbenv'
gem 'friendly_id', '~> 5.1.0'
gem 'simple_form'
gem 'hirb'
gem 'bootsnap'
# 分页
gem "kaminari"
gem 'api-pagination'

## 构建api
gem 'grape'
gem 'grape-swagger'
gem 'grape-swagger-rails'
## 搜索
gem 'ransack'
gem 'seo_helper'
## 网站性能分析
gem 'newrelic_rpm'
gem 'bootstrap-tagsinput-rails'
## SEO 优化
gem 'meta-tags'
## 缓存
gem 'second_level_cache'
gem 'dalli'
# 

# gem 'wdm', '>= 0.1.0'
group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do

  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end


gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
