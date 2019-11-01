-- user_table

DROP TABLE IF EXISTS `user_table`;
CREATE TABLE IF NOT EXISTS `user_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(64) DEFAULT '',
  `nickname` varchar(32) NOT NULL,
  `signature` text,
  `sex` varchar(32) DEFAULT '保密',
  `tel` char(11) NOT NULL,
  `mail` varchar(100),
  `passwd` varchar(100) NOT NULL,
  `token` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `token_expires` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


INSERT INTO `user_table` (`nickname`, `tel`, `passwd`, `token`,  `token_expires`) VALUES
( '18740570591', 18740570591, 111111, '', 0 );

