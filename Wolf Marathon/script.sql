-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema doan_cntt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema doan_cntt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `doan_cntt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `doan_cntt` ;

-- -----------------------------------------------------
-- Table `doan_cntt`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `doan_cntt`.`user_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `highscore` INT NULL DEFAULT NULL,
  `money` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `doan_cntt`.`skins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `doan_cntt`.`skins` (
  `user_id` INT NOT NULL,
  `wolf` VARCHAR(3) NULL DEFAULT NULL,
  `cactus` VARCHAR(3) NULL DEFAULT NULL,
  `bear` VARCHAR(3) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `id`
    FOREIGN KEY (`user_id`)
    REFERENCES `doan_cntt`.`user_info` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;