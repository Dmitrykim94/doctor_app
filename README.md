# JavaScript Racer 2 Back End

## Введение

Теперь добавим бэк-энд к нашим гонкам используя Express. Игра должна так же работать в одном окне браузера, то есть оба игрока играют за одним компютером, в одном браузере.

Приложение выглядит следующим образом:

1. Два человека садятся за один компьютер и посещают страницу с приложением
2. Приложение предлагает каждому игроку ввести свое имя
3. Игроки заполняют форму, и это создает новую игру
4. Новая игра начинается, и каждый игрок нажимает свою клавишу, пока один из них побеждает.
5. После того, как один из них выигрывает, победитель и продолжительность игры, отправляются на сервер, и игра записывается как «done»,
6. Игроки могут выбрать другую игру, используя те же самые имена, или перезагрузить с использованием новых
7. После завершения игры игрокам предоставляется уникальный URL-адрес, по которому они могут просматривать результаты этой конкретной игры.


## Releases

### Release 0: Models

Необходимы  2 модели: `Player` и `Game`. Отношение между моделями многие-ко-многим. В каждой игре может быть много гонщиков. Однако можете разрабатывать с условием, что в игре участвуют только 2 пользователя. 

Имена игроков должны быть уникальны. Это необходимо проверять как на уровне базы данных, так и на уровне Sequelize/Mongoose. Ошибка на уровне базы данных является дорогостоящей, поэтому лучше обрабатывать ошибки до выполнения запроса в БД.


### Release 1: Routes

Роутинги должны быть на следующие события:

1. Начало/создание новой игры
2. Игра (playing)
3. Просмотр результатов игры

Вы можете добавить больше роутингов.


### Release 2: Доработка

Проверьте, что ваше приложение работает полностью. Оно не должно ломаться, что бы пользователь не нажимал. Если вы быстро справились с заданием - было бы неплохо написать тесты. Можете воспользоваться другим, менее привычным вам, фреймворком тестирования [Mocha][].

### Release 3: Хостинг

Ваше приложение работает, у вас есть тесты под него, но пользоваться им можете только вы, так как оно работает на вашем локальном сервере. Давайте не будем эгоистами и дадим всем пользователям интернета возможность поиграть в ваши гоночки! Вам нужно поднять ваше приложение на [Heroku][].


## Ресурсы

* [Деплой на Heroku][Heroku Deploy]

#### Sequelize
* [Constraining by uniqueness][Sequelize uniqueness constraint]
* [DB index constraints][Sequelize index documentation]
* [Custom validations][Sequelize validation]

#### Mongoose
* [Constraining by uniqueness][Mongoose uniqueness constraint]
* [DB index constraints][Mongoose index documentation]
* [Custom validations][Mongoose validation]


[Sequelize uniqueness constraint]: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
[Sequelize index documentation]: http://docs.sequelizejs.com/manual/tutorial/models-definition.html#indexes
[Sequelize validation]: http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations

[Mongoose uniqueness constraint]: https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
[Mongoose index documentation]: https://mongoosejs.com/docs/guide.html#indexes
[Mongoose validation]: https://mongoosejs.com/docs/validation.html

[Mocha]: https://mochajs.org/
[Heroku]: https://www.heroku.com/
[Heroku Deploy]: https://medium.com/devschacht/node-hero-chapter-12-6c392f4e3c0f