# ePCR-System

Temporary note:

Havng troubles with being authorized in the remote database on MySQL Workbench, so cannot update the database tables.

Please update to the following before trying to test charts.

users table

-- CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), phone VARCHAR(12), name VARCHAR(50));


-- ALTER TABLE users ADD privilege varchar(10) DEFAULT 'standard';

charts table

-- CREATE TABLE `charts` (
  `id` INT(11) AUTO_INCREMENT,
  `date` VARCHAR(45) NULL,
  `call` TINYTEXT NULL,
  `detail` TINYTEXT NULL,
  `medications` VARCHAR(45) NULL,
  `procedures` VARCHAR(45) NULL,
  `notes` MEDIUMTEXT NULL,
  `patientID` VARCHAR(45) NULL,
  `userID` VARCHAR(45) NULL,
  `times` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  
  patient table
  
-- CREATE TABLE patients ( id INT(11) AUTO_INCREMENT, name VARCHAR(255) NULL, birth VARCHAR(45), gender VARCHAR(10), weight VARCHAR(10) NULL, address VARCHAR(255) NULL, phone VARCHAR(12) NULL, history MEDIUMTEXT NULL, PRIMARY KEY (id));

-- ALTER TABLE `patients` 
ADD COLUMN `lname` VARCHAR(255) NULL AFTER `fname`,
ADD COLUMN `classify` VARCHAR(45) NULL DEFAULT 'Adult' AFTER `weight`,
ADD COLUMN `bcolor` VARCHAR(45) NULL AFTER `classify`,
CHANGE COLUMN `name` `fname` VARCHAR(255) NULL DEFAULT NULL ;
