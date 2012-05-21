<?php
/**
 * TimeCop server configuration. Beware, you should make this file unreadable by your webserver or someone could acquire your sensitive information.
 */


/**
 * dbConfig -- set your database connection information here.
 */
global $dbConfig;

$dbConfig = array(
    'host' => '',
    'user' => '',
    'password' => '',
    'database'
);

/**
 * Push Server URL. Choose one and comment out the other.
 */

// This is for the sandbox (development) push server:

$pushServer = '';

// This is for the production push server:

//$pushServer = '';