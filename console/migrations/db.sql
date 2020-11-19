-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Время создания: Ноя 17 2020 г., 18:58
-- Версия сервера: 10.3.8-MariaDB
-- Версия PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `motu_test`
--

-- --------------------------------------------------------


CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Дамп данных таблицы `city`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Restaurants'),
(2, 'Museums'),
(3, 'Shopping'),
(4, 'Theatres'),
(5, 'Sights');

-
--
-- Структура таблицы `providers`
--
DROP TABLE if exists providers;
CREATE TABLE `providers`(
	`id` int(11) NOT NULL,
 	`category_id` int(11) NOT NULL,
	`brand_name` varchar(50) not null,
	`brand_name_en` varchar(50) not null,
    `description` text,
    `description_en` text,
    `area` varchar(32),
	`object_type` varchar(32) not null,
	`short_description` varchar(32) not null,
	`address` text not null, #Country, city, street, etc
	`latitude` varchar(30),
	`longitude` varchar(30),
	`email` varchar(50),
	`phone` varchar(50),
	`web_url` varchar(250),
	`created_at` datetime default now(),
	`updated_at` datetime on update now()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 --------------------------------------------------------

--
-- Структура таблицы `constants`
--

CREATE TABLE `constants` (
  `key` varchar(8) NOT NULL,
  `value` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `constants`
--
-- --------------------------------------------------------

--
-- Структура таблицы `country`
--

CREATE TABLE `country` (
  `id` int(10) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `country`
--

INSERT INTO `country` (`id`, `name`) VALUES
(1, 'Россия'),
(2, 'Финляндия'),
(3, 'Швеция'),
(4, 'Германия'),
(5, 'Эстония'),
(6, 'Латвия');

-- --------------------------------------------------------

--
-- Структура таблицы `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `name` varchar(4) NOT NULL,
  `longname` varchar(32) NOT NULL,
  `rate` float(10,2) NOT NULL DEFAULT 1.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `currency`
--

INSERT INTO `currency` (`id`, `name`, `longname`, `rate`) VALUES
(1, 'RUB', 'Рубля', 1.00),
(2, 'USD', 'Доллар США', 77.00),
(3, 'EUR', 'Евро', 81.00);

-- --------------------------------------------------------

--
-- Структура таблицы `filter`
--

CREATE TABLE `filter` (
  	`id` int(11) NOT NULL,
	`category_id` int(11) NOT NULL,
	`name` varchar(16) NOT NULL,
  	`title` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `filter`
--

INSERT INTO `filter` (`id`, `category_id` ,`name`, `title`) VALUES
(1,1, 'restaurant','Ресторан'),
(2,1, 'fastfood','Фастфуд'),
(3,1, 'coffee_bakery','Кафе/Выпечка'),
(4,1, 'local_cuisine','Местная кухня'),
(5,1, 'business_lunch','Бизнес ланч'),
(6,1, 'sportbar','Спортбар'),
(7,1, 'terrace','Терраса'),
(8,1, 'kid_playground','Детская площадка'),
(9,1, 'kidmenu','Детское меню'),
(10,1, 'romantique','Романтика'),
(11,1, 'panoramic_cityview','Панорама'),
(12,2, 'for_kid','для детей'),
(13,2, 'interactive','Интерактивный'),
(14,2, 'art','Исскуство'),
(15,2, 'history','Исторический'),
(16,2, 'speciality','Особый'),
(17,2, 'audioguide','Аудиогид'),
(18,3, 'souvenir_shop','Сувениры'),
(19,3, 'delikatessen','Деликатесы'),
(20,4, 'drama_theatre','Драматический'),
(21,4, 'opera_and_ballet','Опера/Балет'),
(22,4, 'showtheatre','Шоу'),
(23,4, 'nightlife','Ночное'),
(24,5, 'architecture','Архитектура'),
(25,5, 'churche','Религиозный'),
(26,5, 'citygarden','Парк'),
(27,5, 'artspace','Арт-пространство'),
(28,5, 'bridge','Мост'),
(29,5, 'monument','Памятник'),
(30,5, 'fountain','Фонтан'),
(31,5, 'panoramic_cityview','Панорама');

CREATE TABLE `filter_provider` (
  	`id` int(11) NOT NULL,
	`provider_id` int(11) NOT NULL,
	`filter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
-- Дамп данных таблицы `product_id`
--

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);
--
-- Индексы таблицы `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `latitude` (`latitude`),
  ADD KEY `longitude` (`longitude`);
--
--
-- Индексы таблицы `constants`
--
ALTER TABLE `constants`
  ADD PRIMARY KEY (`key`);

--
-- Индексы таблицы `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `department`
--
ALTER TABLE `filter`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `filter_provider`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider_id` (`provider_id`),
  ADD KEY `filter_id` (`filter_id`);
--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT для таблицы `country`
--
ALTER TABLE `country`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `filter`
--
ALTER TABLE `filter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `filter`
--
ALTER TABLE `filter_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `providers`
--
ALTER TABLE `providers`
  ADD CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `filter`
--
ALTER TABLE `filter`
  ADD CONSTRAINT `filter_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Ограничения внешнего ключа таблицы `expexp`
--
ALTER TABLE `filter_provider`
  ADD CONSTRAINT `filter_provider_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `filter_provider_ibfk_2` FOREIGN KEY (`filter_id`) REFERENCES `filter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
