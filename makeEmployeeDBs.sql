DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  deptname VARCHAR(30) NOT NULL,
  
  PRIMARY KEY (id)
);



CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  rolename VARCHAR(30) NOT NULL,
  salary DECIMAL(4,2),
  department_id INT(10) NOT NULL
  
  PRIMARY KEY (id)
);


CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NOT NULL
    PRIMARY KEY (id)

);