-- user_table

DROP TABLE IF EXISTS `user_table`;
CREATE TABLE IF NOT EXISTS `user_table` (
  `ID` int(11) NOT NULL comment '用户ID' AUTO_INCREMENT,
  `photo` varchar(64) comment '头像' DEFAULT '',
  `nickname` varchar(32) NOT NULL comment '昵称(默认为手机号)',
  `signature` text comment '个签',
  `sex` varchar(32) comment '性别' DEFAULT '保密',
  `tel` char(11) NOT NULL comment '手机号',
  `mail` varchar(100) comment '邮箱号',
  `passwd` varchar(100) NOT NULL comment '密码',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


INSERT INTO `user_table` (`nickname`, `tel`, `passwd`) VALUES
( '18740570591', 18740570591, 123456 );
