set names utf8;

USE mysql;

CREATE TABLE pull_url (
  id int PRIMARY KEY auto_increment,
  title varchar(255),
  url varchar(255),
  Introduction varchar(255)
  );