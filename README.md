# ePCR-System

Temporary note:

Havng troubles with being authorized in the remote database on MySQL Workbench, so cannot update the database tables.

Please update to the following before trying to test charts.

users table

-- CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), phone VARCHAR(12), name VARCHAR(50));


**-- ALTER TABLE users ADD privilege varchar(10) DEFAULT 'standard';**

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

**-- ALTER TABLE `patients` 
ADD COLUMN `lname` VARCHAR(255) NULL AFTER `fname`,
ADD COLUMN `classify` VARCHAR(45) NULL DEFAULT 'Adult' AFTER `weight`,
ADD COLUMN `bcolor` VARCHAR(45) NULL AFTER `classify`,
CHANGE COLUMN `name` `fname` VARCHAR(255) NULL DEFAULT NULL ;**

**-- ALTER TABLE `charts` 
ADD COLUMN `nature` VARCHAR(45) NULL AFTER `location`,
ADD COLUMN `disposition` VARCHAR(45) NULL AFTER `nature`,
ADD COLUMN `destination` VARCHAR(45) NULL AFTER `disposition`,
ADD COLUMN `agency` TINYTEXT NULL AFTER `destination`,
ADD COLUMN `trauma` VARCHAR(45) NULL AFTER `agency`,
ADD COLUMN `mci` VARCHAR(45) NULL AFTER `trauma`,
ADD COLUMN `va` VARCHAR(255) NULL AFTER `mci`,
CHANGE COLUMN `call` `incident` TINYTEXT NULL DEFAULT NULL ,
CHANGE COLUMN `detail` `location` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `times` `times` TINYTEXT NULL DEFAULT NULL ;**
