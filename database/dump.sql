-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: medication_tracking
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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

--
-- Current Database: `medication_tracking`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `medication_tracking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `medication_tracking`;

--
-- Table structure for table `fabricantes`
--

DROP TABLE IF EXISTS `fabricantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabricantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabricantes`
--

LOCK TABLES `fabricantes` WRITE;
/*!40000 ALTER TABLE `fabricantes` DISABLE KEYS */;
INSERT INTO `fabricantes` VALUES (1,'Laborat├│rios Teuto',1,'2023-10-30 13:16:05',NULL),(2,'Pfizer',1,'2023-10-30 13:16:05',NULL),(3,'Roche',1,'2023-10-30 13:16:05',NULL),(4,'Novartis',1,'2023-10-30 13:16:05',NULL),(5,'Sanofi',1,'2023-10-30 13:16:05',NULL),(6,'Bayer',1,'2023-10-30 13:16:05',NULL),(7,'AstraZeneca',1,'2023-10-30 13:16:05',NULL),(8,'Johnson & Johnson',1,'2023-10-30 13:16:05',NULL),(9,'Merck',1,'2023-10-30 13:16:05',NULL),(10,'Gilead Sciences',1,'2023-10-30 13:16:05',NULL);
/*!40000 ALTER TABLE `fabricantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formas_farmaceuticas`
--

DROP TABLE IF EXISTS `formas_farmaceuticas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_farmaceuticas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `abreviatura` varchar(100) NOT NULL,
  `diluida` tinyint(1) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_farmaceuticas`
--

LOCK TABLES `formas_farmaceuticas` WRITE;
/*!40000 ALTER TABLE `formas_farmaceuticas` DISABLE KEYS */;
INSERT INTO `formas_farmaceuticas` VALUES (1,'Pacote(s)','Pac',0,'2023-10-30 13:27:38',NULL),(2,'Comprimido(s)','Comp',0,'2023-10-30 13:56:33',NULL),(3,'Ampola(s)','Amp',0,'2023-10-30 13:56:33',NULL),(4,'Frasco(s)','Fras',0,'2023-10-30 13:56:33',NULL),(5,'C├ípsula(s)','Caps',0,'2023-10-30 13:56:33',NULL),(6,'Bisnaga(s)','Bis',0,'2023-10-30 13:56:33',NULL),(7,'Caixa(s)','Cx',0,'2023-10-30 13:56:33',NULL);
/*!40000 ALTER TABLE `formas_farmaceuticas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fabricante_id` int(11) NOT NULL,
  `nome_comercial` varchar(255) NOT NULL,
  `nome_generico` varchar(255) NOT NULL,
  `forma_farmaceutica_id` int(11) NOT NULL,
  `unidade_id` int(11) NOT NULL,
  `apresentacao` varchar(100) NOT NULL,
  `instrucoes` text DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fabricante_id` (`fabricante_id`),
  KEY `forma_farmaceutica_id` (`forma_farmaceutica_id`),
  KEY `unidade_id` (`unidade_id`),
  CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`fabricante_id`) REFERENCES `fabricantes` (`id`),
  CONSTRAINT `medicamentos_ibfk_2` FOREIGN KEY (`forma_farmaceutica_id`) REFERENCES `formas_farmaceuticas` (`id`),
  CONSTRAINT `medicamentos_ibfk_3` FOREIGN KEY (`unidade_id`) REFERENCES `unidades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamentos`
--

LOCK TABLES `medicamentos` WRITE;
/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
INSERT INTO `medicamentos` VALUES (4,1,'Paracetamol','Acetaminofeno',2,1,'500 mg','tomar de 2 em 2 h','N├úo usar com ├ílcool',1,'2023-10-30 13:56:46','2023-11-07 00:27:27'),(5,2,'Amoxilina','Amoxicilina',3,2,'250mg/5mL','Tomar 5 mL a cada 8 horas por 7 dias','Agitar antes de usar',1,'2023-10-30 13:56:48',NULL),(6,3,'Aspirina','├ücido acetilsalic├¡lico',1,1,'100 mg','TESTE','Evitar em caso de ├║lceras',1,'2023-10-30 13:56:48','2023-11-07 00:27:42'),(7,4,'Losartana','Losartan Pot├íssico',2,1,'50mg','Tomar uma c├ípsula por dia','Monitorar a press├úo arterial',1,'2023-10-30 13:56:48',NULL),(8,5,'Omeprazol','Omeprazol',2,1,'20mg','Tomar uma c├ípsula em jejum','N├úo mastigar a c├ípsula',1,'2023-10-30 13:56:48',NULL),(9,1,'Dipirona','Metamizol S├│dico',4,2,'500mg/10mL','Tomar 10 mL a cada 6 horas','N├úo usar por mais de 5 dias',1,'2023-10-30 13:56:48',NULL),(10,2,'Captopril','Captopril',2,1,'25mg','Tomar uma c├ípsula duas vezes ao dia','N├úo interromper abruptamente',1,'2023-10-30 13:56:48',NULL),(11,3,'Amlodipina','Besilato de Amlodipina',2,1,'5mg','Tomar uma c├ípsula por dia','Monitorar a press├úo arterial',1,'2023-10-30 13:56:48',NULL),(12,4,'Sertralina','Sertralina',2,1,'50mg','Tomar uma c├ípsula pela manh├ú','Pode causar sonol├¬ncia',1,'2023-10-30 13:56:48',NULL),(13,5,'Metformina','Cloridrato de Metformina',2,1,'500mg','Tomar uma c├ípsula duas vezes ao dia','Monitorar n├¡veis de glicose',1,'2023-10-30 13:56:48',NULL),(14,2,'Amoxicilina','Amoxicilina Trihidratada',2,1,'500 mg','','Veio da Web',1,'2023-11-01 13:25:26',NULL),(15,2,'Gastrium','Omeprazol',2,1,'20 mg','','',1,'2023-11-01 15:25:47',NULL),(16,6,'Engov','├ücido acetilsalic├¡lico/cafe├¡na/hidr├│xido de alum├¡nio/mepiramina',2,1,'50 mg','','',1,'2023-11-01 15:30:13',NULL),(17,7,'Durateston','Isocaproato de Testosterona',3,1,'250 mg','','',1,'2023-11-01 15:35:05',NULL),(18,7,'Minoxidil','Biosint├®tica  ',4,1,'50 mg','','',1,'2023-11-01 16:21:02',NULL),(19,1,'a','a',1,1,'1 mg','','',1,'2023-11-03 17:00:51',NULL),(20,2,'234','423',2,1,'123 mg','','',1,'2023-11-03 17:01:12',NULL);
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `abreviatura` varchar(100) NOT NULL,
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-08 20:42:16
