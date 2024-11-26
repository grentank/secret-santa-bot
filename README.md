# Техническое задание: Telegram-бот "Тайный Санта"

### **Проект: Telegram-бот "Тайный Санта"**

Добро пожаловать на хакатон по созданию Telegram-бота для "Тайного Санты"! 🚀

## **Цели проекта**

Создайте Telegram-бота, который будет:

1. Работать с групповым чатом.
2. Соблюдать конфиденциальность участников.
3. Распределять подопечных и отправлять им пожелания.

---

## **Минимальные требования**

1. **Подключение к чату**: Бот должен быть добавлен в группу и отслеживать сообщения.
2. **Запись кружочков**: Бот сохраняет кружочки и отправляет подтверждения.
3. **Меню бота**:
   - Показать своё пожелание.
   - Показать пожелание подопечного.
   - Показать список участников.
4. **Распределение**: На указанную дату бот распределяет участников и отправляет результаты в личку.

---

## **Как участвовать?**

- Участвовать могут:
  - Все текущие студенты
  - Все выпускники
  - Преподаватели
- Участники могут быть соло или в команде из 3 человек максимум.
- Для участия нужно заполнить форму и приступить к разработке.

---

## **Дедлайны**

- **Начало разработки**: Сегодня.
- **Сдача проекта**: 2 декабря, 09:00.
- **Презентация**: 2 декабря, 19:00.

---

## **Критерии оценки**

1. **Функциональность**: бот выполняет все указанные задачи.
2. **Качество кода**: читаемость, структурированность, использование современных подходов, ООП.
3. **Креативность**: дополнительные фичи, которые вы добавите самостоятельно.
4. **Юзабилити**: удобство интерфейса меню и сообщений.

---

## **Основные фичи - подробно**

### **1. Регистрация и взаимодействие через меню:**

- Пользователь должен включить бота в личных сообщениях, чтобы получить доступ к меню.
- Меню должно содержать кнопки:
  - **"Показать своё пожелание"**: отображает записанное ранее пожелание.
  - **"Показать пожелание подопечного"**: показывает пожелание участника, выбранного ботом. Если подопечный не выбран, то сообщить об ошибке.
  - **"Список участников"**: список всех зарегистрированных участников.

### **2. Запись кружочков:**

- Бот отслеживает кружочки в конкретной группе (Elbrus MSK Secret Santa).
- После получения кружочка отправляет сообщение в группу:  
  `"Пожелание пользователя USERNAME записано"`.
- Сохраняет видео и отправляет пользователю подтверждение в личку.

### **3. Распределение подопечных:**

- По наступлении указанной даты (13 декабря), бот случайным образом распределяет подопечных между участниками.
- Распределение должно быть анонимным.
- Уведомления отправляются в личные сообщения:
  `"Ваш подопечный: USERNAME. Его пожелание: <вложение>"`.
- При распределении не должно быть пар. То есть, если A дарит подарок B, то B не должен дарить подарок A.

### **4. Отображение статуса:**

- После завершения распределения бот отображает статус:
  - Участники, у которых есть подопечные (✅).
  - Участники, не получившие подопечных (❌) или участники, которые не включили бота.

### **5. Разное**

- Участники должны регистрироваться в Тайном Санте только через определённый чат. С остальными чатами он не должен работать.
- Бот принимает кружочки от участников, даже если они не активировали его. Если участник активирует бота после распределения, он должен выслать участнику его подопечного.
- Должна вестись запись всех действий (кто записал кружочек, кто получил подопечного и т.д.)
- Если участник отправляет кружочек дважды, бот уведомляет, что прошлое пожелание было перезаписано. Хранить можно только 1 пожелание.

---

🎁 **Призы для победителей:**  
Лучшие команды получат ценные призы! 🏆

Удачи! 💪
