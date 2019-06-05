CREATE DATABASE lbta_mysql_basics CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

CREATE TABLE users (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);

//USE todo; in order to start the database and You can do 
//SELECT * from tasks;