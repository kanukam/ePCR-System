# ePCR-System

Temporary note:

Havng troubles with being authorized in the remote database on MySQL Workbench, so cannot update the database tables.

Please update to the following before trying to test charts.

users table

-- CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), phone VARCHAR(12), name VARCHAR(50));

charts table

-- CREATE TABLE `rescatedb`.`charts` (
  `id` INT(11) NOT NULL,
  `date` VARCHAR(45) NULL,
  `call` TINYTEXT NULL,
  `detail` TINYTEXT NULL,
  `medications` VARCHAR(45) NULL,
  `procedures` VARCHAR(45) NULL,
  `notes` MEDIUMTEXT NULL,
  `patientID` VARCHAR(45) NULL,
  `userID` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  
  patient table
  
-- CREATE TABLE rescatedb.patients ( id INT(11) AUTO_INCREMENT, name VARCHAR(255) NULL, birth VARCHAR(45), gender VARCHAR(10), weight VARCHAR(10) NULL, address VARCHAR(255) NULL, phone VARCHAR(12) NULL, history MEDIUMTEXT NULL, PRIMARY KEY (id));

Charts

-- id           INT(11)

-- date         VARCHAR(45)

-- call         TINYTEXT

-- detail       TINYTEXT

-- medications  VARCHAR(255)

-- procedures   VARCHAR(255)

-- notes        MEDIUMTEXT

-- patientID    VARCHAR(45)

-- userID       VARCHAR(45)

Patients

-- id           INT(11)

-- name         VARCHAR(255)

-- birth        VARCHAR(45)

-- gender       VARCHAR(10)

-- weight       VARCHAR(10)

-- address      VARCHAR(255)

-- phone        VARCHAR(12)

-- history      MEDIUMTEXT
