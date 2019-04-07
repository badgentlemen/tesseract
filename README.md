# tesseract
## Компонент выбора дат mcDates 📅

---
Компонент позволяет выбирать диапазон даты (начало и конец). Также существуют предустановленные варианты. 
У компоненты есть 3 биндинга: 
* `date-from`: Первая дата
* `date-to`: Вторая дата
* `mc-change`: Коллбек функция, выполняемая при изменении диапазона

Компонент работает по схеме 2-way-binding, то есть при изменении дат вне компонента, даты меняются в самом компоненте, при этом `mc-change` не вызывается.

---
## Установка и запуск

1. `git clone https://github.com/badgentlemen/tesseract.git`
2. `npm install` для установки зависимостей
3. `npm run dev` для запуска проект
---
## Стек технологий
* Angular ^1.6
* Библиотека Angular Material
* Используется стандартный datepicker для выбора даты
* Никаких дополнительных визуальных библиотек
* Для работ с датами используется momentjs
* Компонента, не директива
* Используется package.json
* Проект написан на TypeScript

## Зависимости
* [angular](https://github.com/angular/angular.js)
* [moment](https://github.com/moment/moment)
* [angular-material](https://github.com/angular/material)

