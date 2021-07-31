-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: homease.cg5idmygnvsl.ap-south-1.rds.amazonaws.com    Database: mega_shop
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `images` text,
  `price` float NOT NULL,
  `offerPrice` varchar(45) DEFAULT NULL,
  `quantity` int NOT NULL,
  `cat_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `description` text,
  `stock_flag` varchar(255) DEFAULT '0',
  `packet` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_ibfk_1` (`cat_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `weight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (80,'Banana','image-1606403560124.jpg',NULL,30,NULL,39,1,1,NULL,'0','',NULL),(81,'Orange','image-1606403680606.jpg',NULL,50,NULL,14,1,2,NULL,'0','1000',NULL),(82,'Watermelon','image-1606403734315.jpg',NULL,40,NULL,13,1,2,NULL,'0','100',NULL),(83,'Cauliflower','image-1606403762786.jpg',NULL,25,NULL,0,2,2,NULL,'0','500',NULL),(86,'Cabbage','image-1606403797145.jpg',NULL,15,'20',0,2,2,NULL,'0','500',NULL),(87,'Tomato','image-1606403825594.jpg',NULL,10,'15',10,2,2,NULL,'0','500',NULL),(106,'mango','image-1610214716716.png',NULL,90,NULL,13,1,2,NULL,'0','4000',NULL),(130,'test','image-1611051588916.jpg',NULL,2,NULL,80,1,2,NULL,'0','3000',NULL),(131,'Milk','image-1612770639664.jpg',NULL,45,'55',72,3,2,NULL,'0','1000',NULL),(136,'kiwi','image-1613584396201.png',NULL,80,'90',0,1,2,NULL,'0','250',NULL),(137,'mango ','image-1613585444785.png',NULL,60,'40',93,1,2,NULL,'0','1000',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-21 13:15:27
