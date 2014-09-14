<?php
namespace NwLaravel\Dropbox;

use Dropbox\Client;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;


class DropboxServiceProvider extends BaseServiceProvider
{
    protected $config;

    /**
     * Bootstrap the service provider.
     *
     * @return void
     */
    public function boot()
    {
        $this->package('naturalweb/nwlaravel-dropbox');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('nwlaravel.dropbox', function($app){
            $config = $app['config']->get('nwlaravel-dropbox::dropbox');

            return new Client($config['token'], $config['app']);
        });
    }
}