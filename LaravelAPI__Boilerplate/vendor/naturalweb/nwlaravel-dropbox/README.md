NwLaravel Dropbox
=================

[![Build Status](https://travis-ci.org/naturalweb/NwLaravel-Dropbox.svg?branch=master)](https://travis-ci.org/naturalweb/NwLaravel-Dropbox)
[![Coverage Status](https://coveralls.io/repos/naturalweb/NwLaravel-Dropbox/badge.png?branch=master)](https://coveralls.io/r/naturalweb/NwLaravel-Dropbox?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/naturalweb/NwLaravel-Dropbox/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/naturalweb/NwLaravel-Dropbox/?branch=master)
[![SensioLabsInsight](https://insight.sensiolabs.com/projects/59a0cc06-dab6-42b5-b76d-2e083c47f867/mini.png)](https://insight.sensiolabs.com/projects/59a0cc06-dab6-42b5-b76d-2e083c47f867)

This is a service provider for the Laravel PHP Framework, for usage client the of sdk-dropbox. [Core API](https://www.dropbox.com/developers/core/start/php)

### Requirements:
  * PHP 5.3+, [with 64-bit integers](http://stackoverflow.com/questions/864058/how-to-have-64-bit-integer-on-php)
  * PHP [cURL extension](http://php.net/manual/en/curl.installation.php) with SSL enabled (it's usually built-in).
  * Must not be using [`mbstring.func_overload`](http://www.php.net/manual/en/mbstring.overload.php) to overload PHP's standard string functions.

[SDK API docs.](http://dropbox.github.io/dropbox-sdk-php/api-docs/v1.1.x)

### Installation

- [API on Packagist](https://packagist.org/packages/naturalweb/nwlaravel-dropbox)
- [API on GitHub](https://github.com/naturalweb/NwLaravel-Dropbox)

In the `require` key of `composer.json` file add the following

    "naturalweb/nwlaravel-dropbox": "~0.1"

Run the Composer update comand

    $ composer update

In your `config/app.php` add `'NwLaravel\Dropbox\DropboxServiceProvider'` to the end of the `$providers` array

```php
'providers' => array(

    'Illuminate\Foundation\Providers\ArtisanServiceProvider',
    'Illuminate\Auth\AuthServiceProvider',
    ...
    'NwLaravel\Dropbox\DropboxServiceProvider',

),
```

At the end of `config/app.php` add `'Dropbox'    => 'NwLaravel\Dropbox\DropboxFacade'` to the `$aliases` array

```php
'aliases' => array(

    'App'        => 'Illuminate\Support\Facades\App',
    'Artisan'    => 'Illuminate\Support\Facades\Artisan',
    ...
    'Dropbox'    => 'NwLaravel\Dropbox\DropboxFacade',

),
```

### Configuration

Publish config using artisan CLI.

~~~
php artisan config:publish naturalweb/nwlaravel-dropbox
~~~

The configuration to `app/config/packages/naturalweb/nwlaravel-dropbox/config/dropbox.php`. This file will look somewhat like:

```php
<?php

/*
|--------------------------------------------------------------------------
| Configuration Dropbox
|--------------------------------------------------------------------------
*/

return array(
    'token'  => 'your-token',
    'app'    => 'your-app',
);
```

### Usage
```php
Dropbox::getAccountInfo();
```
