<?php
/**
 * This is the api endpoint for our basic TimeCop server. It will take a token and an interval and save them to the database.
 */

/**
 * This is the token given to the device by apple. See: https://developer.apple.com/library/ios/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/ApplePushService/ApplePushService.html
 */
$token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_SPECIAL_CHARS);

/**
 * How long from now, in minutes, to send the message.
 */
$interval = filter_input(INPUT_POST, 'interval', FILTER_VALIDATE_INT);

$returnValue = array();

if ($token !== false && !is_null($token)) {

    if ($interval !== false && is_numeric($interval)) {

        $notificationDate = new \DateTime();
        $adjustDateInterval = new \DateInterval('PT'.$interval.'M'); // To adjust the time by 5 minutes, the string is PT5M.

        $notificationDate->add($adjustDateInterval);

        /* We have good inputs. Now we need to include some libraries that handle the hard work for us. */
        include_once 'lib/config.inc';

        $db = new \mysqli($dbConfig['host'], $dbConfig['user'], $dbConfig['password'], $dbConfig['database']);

        $sql = "INSERT INTO `timecop_notifications (`notificationID`, `token`, `notificationDate`, `sent`) VALUES (NULL, ?, ?, 0);";
        $statement = $db->prepare($sql);
        $statement->bind_param('ss', $token, $notificationDate->format('Y-m-d H:i:s'));

        if ($statement->execute()) {

            $returnValue['success'] = true;
            $returnValue['notificationID'] = $statement->insert_id;

        } else {

            $returnValue['success'] = false;
            $returnValue['error'] = 'Database Error: '.$statement->error;

        }

    } else {

        $returnValue['success'] = false;
        $returnValue['error'] = 'Invalid interval.';

    }

} else {

    $returnValue['success'] = false;
    $returnValue['error'] = 'Invalid token.';

}

echo json_encode($returnValue);
exit;