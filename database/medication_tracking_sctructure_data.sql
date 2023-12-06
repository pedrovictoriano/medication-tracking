CREATE DATABASE  IF NOT EXISTS `medication_tracking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `medication_tracking`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: database-mysql-medication-tracking.clcmkyos9rjc.sa-east-1.rds.amazonaws.com    Database: medication_tracking
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_movimentacao_id` int DEFAULT NULL,
  `documento` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data_movimentacao` datetime DEFAULT NULL,
  `data_atualizacao` datetime DEFAULT NULL,
  `observacoes` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `tipo_movimentacao_id` (`tipo_movimentacao_id`),
  CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`tipo_movimentacao_id`) REFERENCES `tipos_movimentacoes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (1,1,'NF123','2023-12-01 15:10:28',NULL,NULL),(2,2,'P123','2023-12-03 11:13:00',NULL,NULL),(3,5,'Prontuario João','2023-12-03 18:06:00',NULL,NULL),(4,5,'Prontuario Maria','2023-12-03 18:13:00',NULL,'Teste de obs'),(5,14,'NF123','2023-12-04 17:52:00',NULL,'Nenhuma'),(6,2,'teste ','2023-01-21 15:00:00',NULL,'teste '),(7,1,'teste ','2023-01-21 18:56:00',NULL,'Inserir etiqueta '),(8,14,'NF2132143242','2023-12-04 21:23:00',NULL,'Entrada de Obs'),(9,5,'Prontuario 20','2023-12-04 21:39:00',NULL,'Saida para João, com infarto'),(10,14,'teste','2023-12-04 21:47:00',NULL,'teste'),(11,14,'wwrwer','2023-12-04 21:59:00',NULL,'teste'),(12,1,'teste','2023-12-04 22:00:00',NULL,'r'),(13,1,'sdwq','2023-12-04 22:05:00',NULL,'dfwe'),(15,1,'fds','2023-12-04 22:14:00',NULL,'dfwerr34'),(17,5,'Teste','2023-12-05 17:55:00',NULL,''),(18,5,'teste','2023-12-05 18:05:00',NULL,''),(19,5,'Nota de teste','2002-11-18 19:30:00',NULL,''),(20,5,'ProntuarioXXXX','2023-12-05 18:17:00',NULL,'Paciente com mal subto'),(21,5,'NF123','2023-12-05 18:21:00',NULL,'Teste'),(22,14,'NF4359834','2023-12-05 12:00:00',NULL,'COnferido');
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque_itens`
--

DROP TABLE IF EXISTS `estoque_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque_itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estoque_id` int DEFAULT NULL,
  `lote_id` int DEFAULT NULL,
  `medicamento_id` int DEFAULT NULL,
  `qtd` int DEFAULT NULL,
  `localizacao_id` int DEFAULT NULL,
  `observacoes` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `estoque_id` (`estoque_id`),
  KEY `lote_id` (`lote_id`),
  KEY `medicamento_id` (`medicamento_id`),
  KEY `localizacao_id` (`localizacao_id`),
  CONSTRAINT `estoque_itens_ibfk_1` FOREIGN KEY (`estoque_id`) REFERENCES `estoque` (`id`),
  CONSTRAINT `estoque_itens_ibfk_2` FOREIGN KEY (`lote_id`) REFERENCES `lotes` (`id`),
  CONSTRAINT `estoque_itens_ibfk_3` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`id`),
  CONSTRAINT `estoque_itens_ibfk_4` FOREIGN KEY (`localizacao_id`) REFERENCES `localizacoes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque_itens`
--

LOCK TABLES `estoque_itens` WRITE;
/*!40000 ALTER TABLE `estoque_itens` DISABLE KEYS */;
INSERT INTO `estoque_itens` VALUES (4,10,1,4,10,5,'teste'),(5,11,1,4,1,1,'1'),(6,12,2,5,2,2,'3'),(7,13,1,4,10,1,'wqeqw'),(8,15,1,4,4,15,'43543'),(9,11,2,4,1,5,NULL),(10,17,1,4,1,1,''),(11,18,1,4,1,1,''),(12,19,1,4,1,2,''),(13,20,1,4,1,5,'Urgente'),(14,21,2,4,1,5,''),(15,22,1,4,1,1,''),(16,10,121,24,1,5,NULL);
/*!40000 ALTER TABLE `estoque_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabricantes`
--

DROP TABLE IF EXISTS `fabricantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabricantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabricantes`
--

LOCK TABLES `fabricantes` WRITE;
/*!40000 ALTER TABLE `fabricantes` DISABLE KEYS */;
INSERT INTO `fabricantes` VALUES (1,'Laboratórios Teuto',1,'2023-10-30 13:16:05',NULL),(2,'Pfizer',1,'2023-10-30 13:16:05',NULL),(3,'Roche',1,'2023-10-30 13:16:05',NULL),(4,'Novartis',1,'2023-10-30 13:16:05',NULL),(5,'Sanofi',1,'2023-10-30 13:16:05',NULL),(6,'Bayer',1,'2023-10-30 13:16:05',NULL),(7,'AstraZeneca',1,'2023-10-30 13:16:05',NULL),(8,'Johnson & Johnson',1,'2023-10-30 13:16:05',NULL),(9,'Merck',1,'2023-10-30 13:16:05',NULL),(10,'Gilead Sciences',1,'2023-10-30 13:16:05',NULL);
/*!40000 ALTER TABLE `fabricantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formas_farmaceuticas`
--

DROP TABLE IF EXISTS `formas_farmaceuticas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_farmaceuticas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `abreviatura` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `diluida` tinyint(1) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_farmaceuticas`
--

LOCK TABLES `formas_farmaceuticas` WRITE;
/*!40000 ALTER TABLE `formas_farmaceuticas` DISABLE KEYS */;
INSERT INTO `formas_farmaceuticas` VALUES (1,'Pacote(s)','Pac',0,'2023-10-30 13:27:38',NULL),(2,'Comprimido(s)','Comp',0,'2023-10-30 13:56:33',NULL),(3,'Ampola(s)','Amp',0,'2023-10-30 13:56:33',NULL),(4,'Frasco(s)','Fras',0,'2023-10-30 13:56:33',NULL),(5,'Cápsula(s)','Caps',0,'2023-10-30 13:56:33',NULL),(6,'Bisnaga(s)','Bis',0,'2023-10-30 13:56:33',NULL),(7,'Caixa(s)','Cx',0,'2023-10-30 13:56:33',NULL);
/*!40000 ALTER TABLE `formas_farmaceuticas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localizacoes`
--

DROP TABLE IF EXISTS `localizacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localizacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localizacoes`
--

LOCK TABLES `localizacoes` WRITE;
/*!40000 ALTER TABLE `localizacoes` DISABLE KEYS */;
INSERT INTO `localizacoes` VALUES (1,'UTI Cardiológica','UTI',1),(2,'Farmácia Central','Farmácia Hospitalar',1),(3,'Enfermaria Geral','Enfermaria',1),(4,'UTI Neonatal','UTI',1),(5,'Sala de Cirurgia 1','Centro Cirúrgico',1),(6,'Farmácia Central','Farmácia Hospitalar',1),(7,'Laboratório de Análises Clínicas','Laboratório',1),(8,'Almoxarifado Principal','Almoxarifado',1),(9,'Consultório Dr. Smith','Consultório',1),(10,'Setor de Radiologia','Radiologia',1),(11,'Pronto Socorro','Emergência',1),(12,'Recepção Principal','Recepção',1),(13,'Administração Hospitalar','Administração',1),(14,'Ambulatório de Especialidades','Ambulatório',1),(15,'Cozinha Hospitalar','Área de Apoio',1),(16,'Estacionamento Visitantes','Estacionamento',1),(17,'Farmácia Satélite 1º Andar','Estacionamento',1);
/*!40000 ALTER TABLE `localizacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lotes`
--

DROP TABLE IF EXISTS `lotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_lote` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `data_fabricacao` date NOT NULL,
  `data_validade` date NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_lote` (`numero_lote`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lotes`
--

LOCK TABLES `lotes` WRITE;
/*!40000 ALTER TABLE `lotes` DISABLE KEYS */;
INSERT INTO `lotes` VALUES (1,'201942-135','2023-11-15','2023-11-20','2023-11-15 14:57:22',NULL),(2,'135454-135','2022-10-01','2025-01-01','2023-11-15 15:29:42',NULL),(3,'196361-561','2022-06-09','2024-01-01','2023-11-15 15:38:20','2023-11-15 16:15:36'),(4,'839982-615','2022-01-09','2024-02-01','2023-11-15 15:38:20','2023-11-15 16:17:15'),(5,'639010-395','2022-07-24','2022-10-28','2023-11-15 15:38:20',NULL),(6,'140472-850','2022-01-28','2022-03-26','2023-11-15 15:38:20',NULL),(7,'347196-388','2022-11-29','2022-12-21','2023-11-15 15:38:20',NULL),(8,'701214-508','2022-09-16','2022-10-08','2023-11-15 15:38:20',NULL),(9,'504054-202','2022-02-11','2022-10-29','2023-11-15 15:38:20',NULL),(10,'517966-134','2022-02-24','2022-04-30','2023-11-15 15:38:20',NULL),(11,'316330-214','2022-09-01','2022-12-09','2023-11-15 15:38:20',NULL),(12,'989670-380','2022-06-15','2022-07-26','2023-11-15 15:38:20',NULL),(13,'994011-737','2022-08-12','2022-08-17','2023-11-15 15:38:20',NULL),(14,'152639-897','2022-12-23','2022-12-31','2023-11-15 15:38:20',NULL),(15,'859185-402','2022-08-21','2022-12-01','2023-11-15 15:38:20',NULL),(16,'882877-766','2022-10-29','2022-10-31','2023-11-15 15:38:20',NULL),(17,'500995-685','2022-10-09','2022-11-07','2023-11-15 15:38:20',NULL),(18,'621455-124','2022-03-06','2022-06-12','2023-11-15 15:38:20',NULL),(19,'193887-327','2022-01-15','2022-02-11','2023-11-15 15:38:20',NULL),(20,'739785-528','2022-04-11','2022-06-10','2023-11-15 15:38:20',NULL),(21,'526642-537','2022-05-02','2022-09-02','2023-11-15 15:38:20',NULL),(22,'832659-916','2022-04-24','2022-12-04','2023-11-15 15:38:20',NULL),(23,'435378-455','2022-12-05','2022-12-14','2023-11-15 15:38:20',NULL),(24,'753794-428','2022-12-20','2022-12-25','2023-11-15 15:38:20',NULL),(25,'972219-914','2022-08-21','2022-09-18','2023-11-15 15:38:20',NULL),(26,'823070-440','2022-10-26','2022-11-08','2023-11-15 15:38:20',NULL),(27,'865992-129','2022-12-31','2023-01-01','2023-11-15 15:38:20',NULL),(28,'226392-529','2022-04-22','2022-09-23','2023-11-15 15:38:20',NULL),(29,'814913-511','2022-05-20','2022-07-18','2023-11-15 15:38:20',NULL),(30,'914417-573','2022-04-01','2022-10-21','2023-11-15 15:38:21',NULL),(31,'310001-276','2022-03-25','2022-12-11','2023-11-15 15:38:21',NULL),(32,'392156-709','2022-12-29','2022-12-31','2023-11-15 15:38:21',NULL),(33,'726631-916','2022-01-06','2022-04-27','2023-11-15 15:38:21',NULL),(34,'728463-511','2022-12-11','2022-12-19','2023-11-15 15:38:21',NULL),(35,'476184-612','2022-11-14','2022-11-22','2023-11-15 15:38:21',NULL),(36,'344390-831','2022-01-27','2022-03-20','2023-11-15 15:38:21',NULL),(37,'514087-647','2022-02-05','2022-02-27','2023-11-15 15:38:21',NULL),(38,'265581-362','2022-01-12','2022-03-23','2023-11-15 15:38:21',NULL),(39,'510115-183','2022-05-06','2022-05-13','2023-11-15 15:38:21',NULL),(40,'722265-237','2022-06-04','2022-12-05','2023-11-15 15:38:21',NULL),(41,'584385-245','2022-07-25','2022-10-21','2023-11-15 15:38:21',NULL),(42,'812604-434','2022-11-04','2022-12-12','2023-11-15 15:38:21',NULL),(43,'561543-410','2022-07-14','2022-10-03','2023-11-15 15:38:21',NULL),(44,'243232-835','2022-01-11','2022-06-19','2023-11-15 15:38:21',NULL),(45,'395460-805','2022-11-24','2022-12-02','2023-11-15 15:38:21',NULL),(46,'205466-426','2022-06-10','2022-10-09','2023-11-15 15:38:21',NULL),(47,'710877-313','2022-01-11','2022-03-03','2023-11-15 15:38:21',NULL),(48,'978245-144','2022-08-16','2022-11-27','2023-11-15 15:38:21',NULL),(49,'295043-994','2022-12-05','2022-12-15','2023-11-15 15:38:21',NULL),(50,'203634-957','2022-06-03','2022-09-23','2023-11-15 15:38:21',NULL),(51,'887745-655','2022-07-19','2022-08-12','2023-11-15 15:38:21',NULL),(52,'540983-472','2022-12-18','2022-12-22','2023-11-15 15:38:21',NULL),(53,'712037-910','2022-07-16','2022-07-24','2023-11-15 15:38:21',NULL),(54,'367004-324','2022-12-27','2022-12-27','2023-11-15 15:38:21',NULL),(55,'928093-556','2022-10-11','2022-10-31','2023-11-15 15:38:21',NULL),(56,'976880-742','2022-11-06','2022-12-16','2023-11-15 15:38:21',NULL),(57,'731800-832','2022-06-14','2022-12-23','2023-11-15 15:38:21',NULL),(58,'587016-793','2022-04-13','2022-04-21','2023-11-15 15:38:21',NULL),(59,'676442-847','2022-01-27','2022-01-29','2023-11-15 15:38:21',NULL),(60,'381052-364','2022-06-30','2022-07-02','2023-11-15 15:38:21',NULL),(61,'507903-687','2022-11-14','2022-12-15','2023-11-15 15:38:21',NULL),(62,'351629-253','2022-08-10','2022-10-29','2023-11-15 15:38:21',NULL),(63,'566686-744','2022-10-31','2022-12-15','2023-11-15 15:38:21',NULL),(64,'255494-464','2022-03-03','2022-06-29','2023-11-15 15:38:21',NULL),(65,'501305-986','2022-05-20','2022-12-26','2023-11-15 15:38:21',NULL),(66,'455361-968','2022-01-23','2022-03-28','2023-11-15 15:38:21',NULL),(67,'950482-476','2022-11-25','2022-12-01','2023-11-15 15:38:21',NULL),(68,'990960-471','2022-02-24','2022-10-30','2023-11-15 15:38:21',NULL),(69,'898016-383','2022-07-20','2022-10-23','2023-11-15 15:38:21',NULL),(70,'443138-672','2022-07-10','2022-10-01','2023-11-15 15:38:21',NULL),(71,'978847-182','2022-06-24','2022-11-10','2023-11-15 15:38:21',NULL),(72,'809954-324','2022-12-23','2022-12-29','2023-11-15 15:38:21',NULL),(73,'786609-600','2022-11-19','2022-12-20','2023-11-15 15:38:21',NULL),(74,'917044-963','2022-10-25','2022-12-09','2023-11-15 15:38:21',NULL),(75,'332592-200','2022-05-14','2022-06-14','2023-11-15 15:38:21',NULL),(76,'289164-294','2022-09-25','2022-12-21','2023-11-15 15:38:21',NULL),(77,'594809-145','2022-10-07','2022-10-12','2023-11-15 15:38:21',NULL),(78,'216164-393','2022-02-16','2022-11-06','2023-11-15 15:38:21',NULL),(79,'825689-251','2022-04-12','2022-10-14','2023-11-15 15:38:21',NULL),(80,'666117-453','2022-01-19','2022-02-23','2023-11-15 15:38:21',NULL),(81,'358336-160','2022-08-19','2022-12-08','2023-11-15 15:38:21',NULL),(82,'833561-538','2022-03-15','2022-08-16','2023-11-15 15:38:21',NULL),(83,'462695-622','2022-04-08','2022-06-09','2023-11-15 15:38:21',NULL),(84,'935881-195','2022-05-13','2022-07-17','2023-11-15 15:38:21',NULL),(85,'331021-405','2022-12-22','2022-12-26','2023-11-15 15:38:21',NULL),(86,'829196-567','2022-04-19','2022-11-17','2023-11-15 15:38:21',NULL),(87,'923404-211','2022-04-24','2022-12-04','2023-11-15 15:38:21',NULL),(88,'813808-147','2022-08-28','2022-11-15','2023-11-15 15:38:21',NULL),(89,'178948-741','2022-08-31','2022-10-23','2023-11-15 15:38:21',NULL),(90,'270348-343','2022-12-28','2022-12-28','2023-11-15 15:38:21',NULL),(91,'618709-288','2022-04-13','2022-07-12','2023-11-15 15:38:21',NULL),(92,'303064-324','2022-06-29','2022-07-15','2023-11-15 15:38:21',NULL),(93,'150233-665','2022-10-31','2022-11-17','2023-11-15 15:38:21',NULL),(94,'520171-964','2022-04-21','2022-10-07','2023-11-15 15:38:21',NULL),(95,'922125-270','2022-08-10','2022-11-21','2023-11-15 15:38:21',NULL),(96,'752289-330','2022-04-10','2022-12-22','2023-11-15 15:38:21',NULL),(97,'901334-364','2022-08-09','2022-11-16','2023-11-15 15:38:21',NULL),(98,'309549-106','2022-10-31','2022-12-27','2023-11-15 15:38:21',NULL),(99,'648018-359','2022-06-21','2022-11-04','2023-11-15 15:38:21',NULL),(100,'710745-198','2022-06-28','2022-09-14','2023-11-15 15:38:21',NULL),(101,'911341-518','2022-01-03','2022-01-26','2023-11-15 15:38:21',NULL),(102,'239653-871','2022-01-06','2022-04-27','2023-11-15 15:38:21',NULL),(103,'AAABB123','2022-01-06','2022-04-27','2023-11-17 18:09:06','2023-11-24 17:23:06'),(104,'qwer2e4r','2002-11-24','2025-11-17','2023-11-24 17:29:00',NULL),(105,'Lote de teste','2023-01-01','2024-01-01','2023-11-24 17:45:44',NULL),(108,'lote de teste 2','2032-12-11','2023-11-23','2023-11-24 17:48:17',NULL),(109,'1','2023-10-17','2023-11-23','2023-11-24 17:48:55',NULL),(111,'AAABB123324','2023-10-17','2023-11-17','2023-11-24 17:51:59',NULL),(113,'werwerwe','2023-10-17','2021-11-17','2023-11-24 18:46:08',NULL),(114,'aaaaaaa','2023-10-17','2021-11-17','2023-11-24 18:46:55',NULL),(115,'as23423','2023-10-17','2021-11-17','2023-11-26 15:35:58',NULL),(116,'24234','2023-10-17','2021-11-17','2023-11-26 15:38:33',NULL),(117,'Lote Omeprazol','2023-01-01','2024-01-01','2023-11-26 15:40:52',NULL),(119,'Esse lote de teste','2022-02-02','2024-02-02','2023-11-26 15:48:12',NULL),(120,'Lote novo ','2023-10-29','2025-10-21','2023-11-29 23:13:01',NULL),(121,'terminal testee','2023-10-29','2024-10-29','2023-11-29 23:14:14','2023-12-04 23:09:28'),(122,'Teste dia 29/11/2029','2023-10-10','2024-11-29','2023-11-30 00:02:06','2023-11-30 00:07:17'),(123,'Lote 29/11/2023 21h24','2023-11-28','2023-11-30','2023-11-30 00:25:13','2023-11-30 16:40:28');
/*!40000 ALTER TABLE `lotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fabricante_id` int NOT NULL,
  `nome_comercial` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nome_generico` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `forma_farmaceutica_id` int NOT NULL,
  `unidade_id` int NOT NULL,
  `apresentacao` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `instrucoes` text COLLATE utf8mb4_general_ci,
  `observacoes` text COLLATE utf8mb4_general_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fabricante_id` (`fabricante_id`),
  KEY `forma_farmaceutica_id` (`forma_farmaceutica_id`),
  KEY `unidade_id` (`unidade_id`),
  CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`fabricante_id`) REFERENCES `fabricantes` (`id`),
  CONSTRAINT `medicamentos_ibfk_2` FOREIGN KEY (`forma_farmaceutica_id`) REFERENCES `formas_farmaceuticas` (`id`),
  CONSTRAINT `medicamentos_ibfk_3` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamentos`
--

LOCK TABLES `medicamentos` WRITE;
/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
INSERT INTO `medicamentos` VALUES (4,1,'Paracetamol','Acetaminofeno',2,1,'500','tomar de 2 em 2 h','Não usar com álcool',1,'2023-10-30 13:56:46','2023-12-04 20:39:14'),(5,2,'Amoxilina','Amoxicilina',3,2,'250','Tomar 5 mL a cada 8 horas por 7 dias','Agitar antes de usar',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(6,3,'Aspirina','Ácido acetilsalicílico',1,1,'100','TESTE','Evitar em caso de úlceras',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(7,4,'Losartana','Losartan Potássico',2,1,'50','Tomar uma cápsula por dia','Monitorar a pressão arterial',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(8,5,'Omeprazol','Omeprazol',2,1,'20','Tomar uma cápsula em jejum','Não mastigar a cápsula',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(9,1,'Dipirona','Metamizol Sódico',4,2,'500','Tomar 10 mL a cada 6 horas','Não usar por mais de 5 dias',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(10,2,'Captopril','Captopril',2,1,'25','Tomar uma cápsula duas vezes ao dia','Não interromper abruptamente',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(11,3,'Amlodipina','Besilato de Amlodipina',2,1,'5','Tomar uma cápsula por dia','Monitorar a pressão arterial',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(12,4,'Sertralina','Sertralina',2,1,'50','Tomar uma cápsula pela manhã','Pode causar sonolência',1,'2023-10-30 13:56:48','2023-12-04 20:39:14'),(13,5,'Metformina','Cloridrato de Metformina',2,1,'500','Tomar uma cápsula duas vezes ao dia','Monitorar níveis de glicose',1,'2023-10-30 13:56:48','2023-12-04 20:39:15'),(14,2,'Amoxicilina','Amoxicilina Trihidratada',2,1,'500','','Veio da Web',1,'2023-11-01 13:25:26','2023-12-04 20:39:15'),(15,2,'Gastrium','Omeprazol',2,1,'20','','',1,'2023-11-01 15:25:47','2023-12-04 20:39:15'),(16,6,'Engov','Ácido acetilsalicílico/cafeína/hidróxido de alumínio/mepiramina',2,1,'50','','',1,'2023-11-01 15:30:13','2023-12-04 20:39:15'),(17,7,'Durateston','Isocaproato de Testosterona',3,1,'250','','',1,'2023-11-01 15:35:05','2023-12-04 20:39:15'),(18,7,'Minoxidil','Biosintética  ',4,1,'50','','',1,'2023-11-01 16:21:02','2023-12-04 20:39:15'),(19,1,'a','a',1,1,'1','','',1,'2023-11-03 17:00:51','2023-12-04 20:39:15'),(20,2,'234','423',2,1,'123','','',1,'2023-11-03 17:01:12','2023-12-04 20:39:15'),(21,1,'Teste','teste',1,1,'1','Instrução','Observação',1,'2023-11-08 21:25:01','2023-12-05 21:13:38'),(22,1,'Teste','Teste',1,1,'1','testteeee','teste',1,'2023-12-05 21:13:26','2023-12-05 21:25:23'),(23,1,'Para','Ceta males',1,1,'100','aa','aaa',1,'2023-12-05 21:16:22','2023-12-05 23:30:08'),(24,7,'Lozartana','Nome generico Lozartana',2,1,'100','Armazenar local seco','N/A',1,'2023-12-05 21:20:01','2023-12-05 21:20:07');
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_lote` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mensagem` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `visualizada` tinyint(1) DEFAULT '0',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `numero_lote` (`numero_lote`),
  CONSTRAINT `notificacoes_ibfk_1` FOREIGN KEY (`numero_lote`) REFERENCES `lotes` (`numero_lote`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
INSERT INTO `notificacoes` VALUES (32,'196361-561','Lote <strong>196361-561</strong> prestes a vencer em <strong>01/01/2024</strong>',0,'2023-12-05 23:50:00'),(33,'839982-615','Lote <strong>839982-615</strong> prestes a vencer em <strong>01/02/2024</strong>',0,'2023-12-05 23:50:00'),(34,'Lote de teste','Lote <strong>Lote de teste</strong> prestes a vencer em <strong>01/01/2024</strong>',0,'2023-12-05 23:50:00'),(35,'Lote Omeprazol','Lote <strong>Lote Omeprazol</strong> prestes a vencer em <strong>01/01/2024</strong>',0,'2023-12-05 23:50:00'),(36,'Esse lote de teste','Lote <strong>Esse lote de teste</strong> prestes a vencer em <strong>02/02/2024</strong>',0,'2023-12-05 23:50:00');
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_movimentacoes`
--

DROP TABLE IF EXISTS `tipos_movimentacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_movimentacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `operacao` enum('entrada','saida') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_movimentacoes`
--

LOCK TABLES `tipos_movimentacoes` WRITE;
/*!40000 ALTER TABLE `tipos_movimentacoes` DISABLE KEYS */;
INSERT INTO `tipos_movimentacoes` VALUES (1,'Transferência',NULL),(2,'Perda no Processo','saida'),(3,'Avaria','saida'),(4,'Desvio de Qualidade','saida'),(5,'Saída para Paciente','saida'),(6,'Furto/Roubo','saida'),(7,'Vencimento','saida'),(8,'Apreensão/Recolhimento','saida'),(9,'Coleta para Controle de Qualidade','saida'),(10,'Falha Gerencial/Operacional','saida'),(11,'Doação','saida'),(12,'Uso Interno','entrada'),(13,'Retorno','entrada'),(14,'Entrada no Estoque','entrada');
/*!40000 ALTER TABLE `tipos_movimentacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `abreviatura` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (1,'Miligrama(s)','2023-10-30 13:27:42','2023-10-31 15:50:25','mg'),(2,'Mililitro(s)','2023-10-30 13:27:42','2023-10-31 15:50:25','mL'),(3,'Grama(s)','2023-10-30 13:27:42','2023-10-31 15:50:25','g'),(4,'Litro(s)','2023-10-30 13:27:42','2023-10-31 15:50:25','L'),(5,'Quilograma(s)','2023-10-30 13:28:51','2023-10-31 15:50:25','kg');
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'medication_tracking'
--

--
-- Dumping routines for database 'medication_tracking'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-05 22:24:04
