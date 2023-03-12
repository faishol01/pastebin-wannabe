CREATE TABLE `tbl_paste` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text,
  `visibility` int NOT NULL DEFAULT '1',
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `paste_author_FK` (`author_id`),
  CONSTRAINT `paste_author_FK` FOREIGN KEY (`author_id`) REFERENCES `tbl_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);