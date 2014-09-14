<?php
namespace NwLaravel\Dropbox;

use Illuminate\Support\Facades\Facade as BaseFacade;

class DropboxFacade extends BaseFacade
{
    protected static function getFacadeAccessor()
    {
        return 'nwlaravel.dropbox';
    }
}