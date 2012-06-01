<?php
/**
 * pusher.php -- designed to be run as a cron once a minute. Will check for pending notifications and send them.
 */

$now = new \DateTime();

/* We have good inputs. Now we need to include some libraries that handle the hard work for us. */
include_once 'lib/config.inc';
include_once 'lib/iosPush.inc';

$db = new \mysqli($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['database']);

$selectSQL = "SELECT `notificationID`, `token`, `notificationDate`, `sent` FROM `timecop_notifications` WHERE `notificationDate` <= ? AND `sent` = 0 LIMIT 0,1";
$selectSTMT = $db->prepare($selectSQL);
$selectSTMT->bind_param('s', $now->format('Y-m-d H:i:s'));
$selectSTMT->bind_result($notificationID, $token, $notificationDate, $sent);

$updateSQL = "UPDATE `timecop_notifications` SET `sent` = 1  WHERE `notificationID` = ?";
$updateSTMT = $db->prepare($updateSQL);
$updateSTMT->bind_param('i', $notificationID); //Not set yet. We set it in the loop.

$pusher = new TimeCop\iosPush();
$pusher->useProduction = ($pushServer == 'production')?TRUE:FALSE;
$pusher->pemFile = $pemFile;

while (1) {
    if (!$selectSTMT->execute()) {
        break;
    }
    if ($selectSTMT->num_rows == 1) {
        $updateSTMT->execute(); // mark our notification as sent so that we don't try to send it from a different invocation of this process.

        $pusher->token = $token;
        $pusher->alert = 'TimeCop Alert for: '.$notificationDate;

        if (!$pusher->send()) {
            break;
        }
        
    } else {
        break;
    }
}