
-- Our notification table is rather simple:

CREATE TABLE IF NOT EXISTS `timecop_notifications` (
  `notificationID` int(64) NOT NULL AUTO_INCREMENT,
  `token` varchar(64) NOT NULL,
  `notificationDate` datetime NOT NULL,
  `sent` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`notificationID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;