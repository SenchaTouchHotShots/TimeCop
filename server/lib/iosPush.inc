<?php
namespace TimeCop;

/**
 * Simple class for accessing Apple's Push Notification service.
 */
class iosPush {

    /**
     * Token of the device to send the notification to.
     * @var string
     */
    public $token;

    /**
     * Alert text to send.
     * @var string
     */
    public $alert;

    /**
     * Number to put in the badge on the app icon.
     * @var integer
     */
    public $badge;

    /**
     * Name of the sound to play on the device.
     * @var string
     */
    public $sound = "default";

    /**
     * Additional information to send.
     * @var array
     */
    public $additionalInformation = array();

    /**
     * Location of the PEM formatted certificate file.
     * @var string
     */
    public $pemFile;

    /**
     * PEM certificate passphrase (if any).
     * @var string
     */
    public $pemPassPhrase;

    /**
     * Hostname of the public push server.
     * @var string
     */
    public $apnsPublicHost = 'gateway.push.apple.com';

    /**
     * Hostname of the public push server.
     * @var string
     */
    public $apnsSandboxHost = 'gateway.sandbox.push.apple.com';

    /**
     * Port for the push server.
     * @var integer
     */

    public $apnsPort = 2195;

    /**
     * Whether or not to use the production host. Set false to use sandbox.
     * @var bool
     */

    public $useProduction = true;

    /**
     * Error result if any.
     * @var string
     */
    public $error;

    /**
     * The connection to the apns service;
     * @var resource
     */
    private $_connection;

    public function send() {
        $payload = $this->generatePayload();
        if (strlen($payload) > 256) {
            $this->error = 'Payload length of '.strlen($payload).' exceeds 256 byte limit.';
            return false;
        }

        if ($this->useProduction) {
            $host = $this->apnsPublicHost;
        } else {
            $host = $this->apnsSandboxHost;
        }

        if ($this->connect($host, $this->apnsPort)) {
            $message = chr(0).chr(0).chr(32).pack('H*', str_replace(' ','', $this->token)).chr(0).chr(strlen($payload)).$payload;
            fwrite($this->_connection, $message);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Generate the payload string.
     * @return string
     */
    protected function generatePayload() {
        $payload = array('aps' => array() );

        if (isset($this->alert)) {
            $payload['aps']['alert'] = $this->alert;
        }

        if (isset($this->badge)) {
            $payload['aps']['badge'] = $this->badge;
        }

        if (isset($this->sound)) {
            $payload['aps']['sound'] = $this->sound;
        }

        if (is_array($this->additionalInformation) && count($this->additionalInformation) > 0) {
            $payload = array_merge($this->additionalInformation, $payload);
        }

        return json_encode($payload);
    }

    /**
     * Connect to the Apple Push service.
     * @param $host hostname to connect to.
     * @param $port port to connect to.
     * @return bool True for successful connection, false on error.
     */
    protected function connect($host, $port) {
        if (!is_resource($this->_connection)) {
        $ctxt = stream_context_create();
        stream_context_set_option($ctxt, 'ssl', 'local_cert', $this->pemFile);
        if (isset($this->pemPassPhrase)) {
            stream_context_set_option($ctxt, 'ssl', 'passphrase', $this->pemPassPhrase);
        }
        $this->_connection = stream_socket_client('ssl://'.$host.':'.$port, $errno, $error, 60, STREAM_CLIENT_CONNECT, $ctxt);

        if ($this->_connection === FALSE) {
            $this->error = "Connection to push service failed: ($errno) $error";
            return FALSE;
        } else {
            return TRUE;
        }
        } else {
            return TRUE;
        }
    }

    public function __destruct() {
        if (is_resource($this->_connection)) {
            socket_close($this->_connection);
            fclose($this->_connection);
        }
    }
}