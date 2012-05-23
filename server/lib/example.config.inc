<?php
/**
 * TimeCop server configuration. Modify and rename to config.inc.
 * Beware, you should make this file unreadable by your webserver or someone could acquire your sensitive information.
 */
global $dbConfig, $pushServer, $pemFile;

/**
 * dbConfig -- set your database connection information here.
 */


$dbConfig = array(
    'host' => '',
    'user' => '',
    'password' => '',
    'database'
);

/**
 * Push Server to use. 'production' or 'sandbox'
 */

$pushServer = 'sandbox';

/**
 * Location of certificate PEM file relative to pusher.php. Remember to change this
 * when switching between production and sandbox modes.
 */

$pemFile = 'apns-cert.pem';
