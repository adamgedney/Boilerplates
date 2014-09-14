<?php


class User extends Eloquent{

	protected $table = "user";

	protected $fillable = array('theme', 'username', 'email', 'birthMonth', 'birthDay', 'birthYear', 'title', 'full_name', 'avatar', 'password', 'deleted_at', 'registered_with', 'plus_id', 'gender', 'display_name', 'plus_etag');



}