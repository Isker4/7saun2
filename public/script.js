// Игровые данные
const gameState = {
    level: 1,
    attempts: 3,
    currentAttempt: 1,
    progress: 0,
    inventory: [],
    messages: ['Игра началась! Собери всех друзей в баню!'],
    completedLevels: [],
    characters: {
        'Пуч': {
            location: 'Нск',
            status: 'Готов к бане, но машина сломана',
            icon: 'П',
            color: '#FF6B6B',
            level1: {
                dialog: 'Я бы всех отвез, но у меня карбюратор чихнул... Может, Боб посмотрит?',
                actions: [
                    { text: 'Починить машину', requirement: 'Деньги на запчасти', result: 'level1_repairCar', available: false }
                ]
            },
            level2: {
                dialog: 'Машина готова! Ждем Децину и Шмеля.',
                actions: []
            },
            level3: {
                dialog: 'Я готов ехать за Шмелем, но один не вывезу - далеко.',
                actions: [
                    { text: 'Поехать с Бобом за Шмелем', requirement: 'Согласие Боба', result: 'level3_goToFree', available: false }
                ]
            }
        },
        'Дрон': {
            location: 'Нск',
            status: 'Придумывает план',
            icon: 'Д',
            color: '#4ECDC4',
            level1: {
                dialog: 'Эй, а давайте в субботу в баню! Но нужна машина и дрова.',
                actions: [
                    { text: 'Предложить собраться', result: 'level1_startPlan', available: true }
                ]
            },
            level2: {
                dialog: 'Децин же работает в логистике! Может, найти ему попутный груз из Мадагаскара?',
                actions: [
                    { text: 'Искать попутный груз', requirement: 'Связь с Шмелем', result: 'level2_findCargo', available: false }
                ]
            },
            level3: {
                dialog: 'Рассчитал график: если выезжать в пятницу утром, успеете забрать Шмеля.',
                actions: []
            }
        },
        'Троф': {
            location: 'Нск',
            status: 'Связывается с Шмелем',
            icon: 'Т',
            color: '#FFD166',
            level1: {
                dialog: 'Я могу позвонить Шмелю на вахту, договориться о пиве.',
                actions: [
                    { text: 'Позвонить Шмелю', result: 'level1_callShmel', available: true }
                ]
            },
            level2: {
                dialog: 'Шмель говорит, у его брата связи в аэропорту. Может найти чартер.',
                actions: [
                    { text: 'Договориться о чартере', result: 'level2_arrangeCharter', available: true }
                ]
            },
            level3: {
                dialog: 'Координирую встречу Пуча и Шмеля в Свободном.',
                actions: []
            }
        },
        'Шмель': {
            location: 'Свободный',
            status: 'На вахте, освободится в субботу',
            icon: 'Ш',
            color: '#06D6A0',
            level1: {
                dialog: 'Привет! Я на вахте, освобожусь только в субботу вечером. Но могу привезти пива!',
                actions: []
            },
            level2: {
                dialog: 'Мой брат работает в аэропорту. Может найти вариант для Децины.',
                actions: []
            },
            level3: {
                dialog: 'Жду ребят в Свободном. Уже собрал вещички!',
                actions: []
            }
        },
        'Децина': {
            location: 'Мадагаскар',
            status: 'В отпуске, рейс через 2 недели',
            icon: 'Дц',
            color: '#118AB2',
            level1: {
                dialog: 'Ребзя, я бы с радостью, но мой рейс только через 2 недели!',
                actions: []
            },
            level2: {
                dialog: 'Если будет попутный груз - могу сопровождать!',
                actions: []
            },
            level3: {
                dialog: 'Лечу в Нск! Ура!',
                actions: []
            }
        },
        'Боб': {
            location: 'Нск',
            status: 'Есть инструменты, может починить',
            icon: 'Б',
            color: '#EF476F',
            level1: {
                dialog: 'Я могу починить машину Пуча, если будут запчасти.',
                actions: [
                    { text: 'Починить машину', requirement: 'Деньги на запчасти', result: 'level1_repairCar', available: false }
                ]
            },
            level2: {
                dialog: 'Машина исправна! Теперь бы Децину и Шмеля собрать.',
                actions: []
            },
            level3: {
                dialog: 'Поеду с Пучем за Шмелем, помогу с диваном Лёхи.',
                actions: [
                    { text: 'Поехать с Пучем', requirement: 'Согласие Лёхи', result: 'level3_goWithPuch', available: false }
                ]
            }
        },
        'Лёха': {
            location: 'Нск',
            status: 'Жадина, но есть деньги',
            icon: 'Л',
            color: '#7209B7',
            level1: {
                dialog: 'Я дам денег на запчасти, если Троф уговорит Шмеля привезти пива.',
                actions: [
                    { text: 'Дать деньги на запчасти', requirement: 'Договор с Шмелем', result: 'level1_giveMoney', available: false }
                ]
            },
            level2: {
                dialog: 'Деньги дал. Диван мой не забудьте завезти по пути за Шмелем!',
                actions: []
            },
            level3: {
                dialog: 'Скинусь на бензин, если завезут мой диван.',
                actions: [
                    { text: 'Скинуться на бензин', result: 'level3_giveGasMoney', available: true }
                ]
            }
        }
    },
    levelStates: {
        level1: {
            carFixed: false,
            moneyGiven: false,
            shmelAgreed: false,
            planStarted: false,
            completed: false
        },
        level2: {
            cargoFound: false,
            charterArranged: false,
            decinaFlying: false,
            completed: false
        },
        level3: {
            gasMoneyGiven: false,
            bobAgreed: false,
            puchGoing: false,
            shmelPickedUp: false,
            allInBanya: false,
            completed: false
        }
    },
    levelProgress: {
        1: 0,
        2: 0,
        3: 0
    }
};

// Инициализация игры
function initGame() {
    renderCharacters();
    updateCharacterLocations();
    updateUI();
    renderMessages();
    
    // Добавляем обработчик для кнопки перезапуска
    document.getElementById('restartBtn').addEventListener('click', restartGame);
}

// Отрисовка списка персонажей
function renderCharacters() {
    const container = document.getElementById('charactersList');
    container.innerHTML = '';
    
    Object.entries(gameState.characters).forEach(([name, data]) => {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.dataset.character = name;
        charElement.onclick = () => selectCharacter(name);
        
        charElement.innerHTML = `
            <div class="character-icon" style="background: ${data.color}">${data.icon}</div>
            <div class="character-info">
                <div class="character-name">${name}</div>
                <div class="character-location">${data.location}</div>
            </div>
            <div class="character-status">${data.status}</div>
        `;
        
        container.appendChild(charElement);
    });
}

// Обновление мини-персонажей на карте
function updateCharacterLocations() {
    // Очищаем все локации
    document.getElementById('nsk-characters').innerHTML = '';
    document.getElementById('madagascar-characters').innerHTML = '';
    document.getElementById('free-characters').innerHTML = '';
    document.getElementById('banya-characters').innerHTML = '';
    
    // Добавляем персонажей в соответствующие локации
    Object.entries(gameState.characters).forEach(([name, data]) => {
        const charElement = document.createElement('div');
        charElement.className = 'char-mini tooltip';
        charElement.style.background = data.color;
        charElement.textContent = data.icon;
        charElement.title = name;
        
        charElement.innerHTML = `
            ${data.icon}
            <span class="tooltiptext">${name}</span>
        `;
        
        if (data.location === 'Нск' || data.location === 'Кольцово') {
            document.getElementById('nsk-characters').appendChild(charElement);
        } else if (data.location === 'Мадагаскар') {
            document.getElementById('madagascar-characters').appendChild(charElement);
        } else if (data.location === 'Свободный') {
            document.getElementById('free-characters').appendChild(charElement);
        } else if (data.location === 'БАНЯ' || data.location === 'В пути') {
            document.getElementById('banya-characters').appendChild(charElement);
        }
    });
}

// Выбор персонажа
let selectedCharacter = null;

function selectCharacter(name) {
    // Снимаем выделение со всех персонажей
    document.querySelectorAll('.character').forEach(el => {
        el.classList.remove('active');
    });
    
    // Выделяем выбранного персонажа
    const charElement = document.querySelector(`.character[data-character="${name}"]`);
    if (charElement) {
        charElement.classList.add('active');
    }
    
    selectedCharacter = name;
    showCharacterDialog(name);
}

// Показать диалог персонажа
function showCharacterDialog(name) {
    const character = gameState.characters[name];
    const dialogContent = document.getElementById('dialogContent');
    const dialogChoices = document.getElementById('dialogChoices');
    
    let dialog = '';
    let actions = [];
    
    // Выбираем диалог в зависимости от уровня
    if (gameState.level === 1 && character.level1) {
        dialog = character.level1.dialog;
        actions = character.level1.actions || [];
    } else if (gameState.level === 2 && character.level2) {
        dialog = character.level2.dialog;
        actions = character.level2.actions || [];
    } else if (gameState.level === 3 && character.level3) {
        dialog = character.level3.dialog;
        actions = character.level3.actions || [];
    } else {
        dialog = 'Я здесь, что дальше?';
    }
    
    dialogContent.innerHTML = `<strong>${name}:</strong> ${dialog}`;
    
    // Очищаем варианты выбора
    dialogChoices.innerHTML = '';
    
    // Добавляем доступные действия
    actions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = action.text;
        
        if (action.requirement) {
            button.textContent += ` (Нужно: ${action.requirement})`;
        }
        
        // Проверяем, доступно ли действие
        const isAvailable = checkActionAvailability(action);
        button.disabled = !isAvailable;
        
        if (isAvailable) {
            button.onclick = () => handleAction(action.result, name);
        }
        
        dialogChoices.appendChild(button);
    });
    
    // Если нет действий, добавляем сообщение
    if (actions.length === 0) {
        const msg = document.createElement('div');
        msg.textContent = 'Поговори с другими персонажами';
        msg.style.color = '#aaa';
        msg.style.fontStyle = 'italic';
        dialogChoices.appendChild(msg);
    }
}

// Проверка доступности действия
function checkActionAvailability(action) {
    if (!action.available && action.available !== undefined) {
        return false;
    }
    
    // Проверка требований для разных действий
    switch(action.result) {
        case 'level1_repairCar':
            return gameState.levelStates.level1.moneyGiven;
        case 'level1_giveMoney':
            return gameState.levelStates.level1.shmelAgreed;
        case 'level2_findCargo':
            return gameState.levelStates.level1.completed;
        case 'level3_goToFree':
            return gameState.levelStates.level3.gasMoneyGiven && gameState.levelStates.level3.bobAgreed;
        case 'level3_goWithPuch':
            return gameState.levelStates.level3.gasMoneyGiven;
        default:
            return true;
    }
}

// Обработка действий
function handleAction(action, character) {
    let message = '';
    
    switch(action) {
        case 'level1_startPlan':
            gameState.levelStates.level1.planStarted = true;
            gameState.levelProgress[1] = 10;
            message = 'План составлен! Нужно починить машину Пуча.';
            break;
            
        case 'level1_callShmel':
            gameState.levelStates.level1.shmelAgreed = true;
            gameState.levelProgress[1] = 30;
            message = 'Шмель согласился привезти пиво! Теперь можно просить деньги у Лёхи.';
            break;
            
        case 'level1_giveMoney':
            gameState.levelStates.level1.moneyGiven = true;
            gameState.inventory.push('Деньги на запчасти');
            gameState.levelProgress[1] = 50;
            message = 'Лёха дал деньги на запчасти! Теперь Боб может чинить машину.';
            break;
            
        case 'level1_repairCar':
            gameState.levelStates.level1.carFixed = true;
            gameState.inventory.push('Исправная машина');
            gameState.levelProgress[1] = 80;
            message = 'Машина Пуча починена! Первый уровень почти пройден.';
            // Проверяем завершение уровня 1
            checkLevel1Completion();
            break;
            
        case 'level2_arrangeCharter':
            gameState.levelStates.level2.charterArranged = true;
            gameState.levelProgress[2] = 30;
            message = 'Чартер для Децины организован! Нужно найти попутный груз.';
            break;
            
        case 'level2_findCargo':
            gameState.levelStates.level2.cargoFound = true;
            gameState.levelProgress[2] = 60;
            message = 'Найден груз ванили из Мадагаскара в Нск!';
            // Проверяем завершение уровня 2
            setTimeout(() => {
                gameState.levelStates.level2.decinaFlying = true;
                gameState.levelProgress[2] = 100;
                addMessage('Децина летит в Нск! Уровень 2 пройден!', true);
                checkLevel2Completion();
            }, 1000);
            break;
            
        case 'level3_giveGasMoney':
            gameState.levelStates.level3.gasMoneyGiven = true;
            gameState.inventory.push('Деньги на бензин');
            gameState.levelProgress[3] = 30;
            message = 'Лёха скинулся на бензин! Теперь нужно уговорить Боба ехать с Пучем.';
            break;
            
        case 'level3_goWithPuch':
            gameState.levelStates.level3.bobAgreed = true;
            gameState.levelProgress[3] = 60;
            message = 'Боб согласился ехать с Пучем за Шмелем!';
            break;
            
        case 'level3_goToFree':
            gameState.levelStates.level3.puchGoing = true;
            gameState.levelProgress[3] = 80;
            message = 'Пуч и Боб выехали в Свободный за Шмелем!';
            // Финальная последовательность
            setTimeout(() => {
                gameState.levelStates.level3.shmelPickedUp = true;
                gameState.levelProgress[3] = 90;
                addMessage('Шмель забран! Возвращаются в Нск.', true);
                
                setTimeout(() => {
                    gameState.levelStates.level3.allInBanya = true;
                    gameState.levelProgress[3] = 100;
                    addMessage('Все друзья собрались! Едем в баню!', true);
                    checkLevel3Completion();
                }, 1500);
            }, 1500);
            break;
    }
    
    if (message) {
        addMessage(message, true);
    }
    
    updateUI();
    updateCharacterLocations();
    
    // Показываем диалог снова, чтобы обновить доступные действия
    if (selectedCharacter) {
        showCharacterDialog(selectedCharacter);
    }
}

// Проверка завершения уровня 1
function checkLevel1Completion() {
    if (gameState.levelStates.level1.carFixed && 
        gameState.levelStates.level1.planStarted &&
        gameState.levelStates.level1.moneyGiven &&
        gameState.levelStates.level1.shmelAgreed) {
        
        gameState.levelStates.level1.completed = true;
        gameState.levelProgress[1] = 100;
        gameState.completedLevels.push(1);
        
        setTimeout(() => {
            addMessage('Уровень 1 пройден! Машина готова, местные собраны!', true);
            // Переход ко второму уровню
            gameState.level = 2;
            updateUI();
            addMessage('Уровень 2: Нужно вернуть Децину с Мадагаскара!', true);
        }, 1000);
    }
}

// Проверка завершения уровня 2
function checkLevel2Completion() {
    if (gameState.levelStates.level2.decinaFlying) {
        gameState.levelStates.level2.completed = true;
        gameState.completedLevels.push(2);
        
        setTimeout(() => {
            addMessage('Уровень 2 пройден! Децина в пути!', true);
            // Переход к третьему уровню
            gameState.level = 3;
            updateUI();
            addMessage('Уровень 3: Нужно забрать Шмеля с вахты!', true);
        }, 1000);
    }
}

// Проверка завершения уровня 3
function checkLevel3Completion() {
    if (gameState.levelStates.level3.allInBanya) {
        gameState.levelStates.level3.completed = true;
        gameState.completedLevels.push(3);
        
        setTimeout(() => {
            showWinScreen();
        }, 2000);
    }
}

// Добавление сообщения в лог
function addMessage(text, isNew = false) {
    gameState.messages.push(text);
    renderMessages();
}

// Отрисовка сообщений
function renderMessages() {
    const messagesContainer = document.getElementById('gameMessages');
    messagesContainer.innerHTML = '';
    
    // Показываем последние 5 сообщений
    const recentMessages = gameState.messages.slice(-5);
    
    recentMessages.forEach((text, index) => {
        const message = document.createElement('div');
        message.className = `message ${index === recentMessages.length - 1 ? 'new' : ''}`;
        message.textContent = text;
        messagesContainer.appendChild(message);
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Обновление интерфейса
function updateUI() {
    // Обновляем индикатор уровня
    document.getElementById('currentLevel').textContent = 
        gameState.level === 1 ? 'Уровень 1: Созвездие Кольцово' :
        gameState.level === 2 ? 'Уровень 2: Мадагаскарский экспресс' :
        'Уровень 3: Вахтовый манёвр';
    
    // Обновляем прогресс
    const progress = gameState.levelProgress[gameState.level];
    document.getElementById('levelProgress').style.width = `${progress}%`;
    
    // Обновляем попытки
    for (let i = 1; i <= 3; i++) {
        const attempt = document.getElementById(`attempt${i}`);
        if (i < gameState.currentAttempt) {
            attempt.className = 'attempt used';
        } else if (i === gameState.currentAttempt) {
            attempt.className = 'attempt active';
        } else {
            attempt.className = 'attempt';
        }
    }
    
    // Обновляем инвентарь
    const inventoryItems = document.getElementById('inventoryItems');
    inventoryItems.innerHTML = '';
    
    if (gameState.inventory.length === 0) {
        inventoryItems.innerHTML = '<div style="color:#aaa; font-style:italic">Инвентарь пуст</div>';
    } else {
        gameState.inventory.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'inventory-item';
            itemEl.textContent = item;
            inventoryItems.appendChild(itemEl);
        });
    }
    
    // Обновляем статусы персонажей
    updateCharacterStatuses();
}

// Обновление статусов персонажей
function updateCharacterStatuses() {
    // Обновляем статусы в зависимости от уровня и прогресса
    if (gameState.level === 1) {
        if (gameState.levelStates.level1.carFixed) {
            gameState.characters['Пуч'].status = 'Машина починена!';
            gameState.characters['Боб'].status = 'Машина починена';
        }
        if (gameState.levelStates.level1.shmelAgreed) {
            gameState.characters['Троф'].status = 'Договорился с Шмелем';
        }
        if (gameState.levelStates.level1.moneyGiven) {
            gameState.characters['Лёха'].status = 'Дал деньги';
        }
    }
    
    if (gameState.level === 2) {
        if (gameState.levelStates.level2.charterArranged) {
            gameState.characters['Троф'].status = 'Чартер организован';
        }
        if (gameState.levelStates.level2.cargoFound) {
            gameState.characters['Дрон'].status = 'Груз найден';
        }
        if (gameState.levelStates.level2.decinaFlying) {
            gameState.characters['Децина'].status = 'Лечу в Нск!';
            gameState.characters['Децина'].location = 'В пути';
        }
    }
    
    if (gameState.level === 3) {
        if (gameState.levelStates.level3.gasMoneyGiven) {
            gameState.characters['Лёха'].status = 'Дал на бензин';
        }
        if (gameState.levelStates.level3.bobAgreed) {
            gameState.characters['Боб'].status = 'Еду с Пучем';
        }
        if (gameState.levelStates.level3.puchGoing) {
            gameState.characters['Пуч'].status = 'Еду за Шмелем';
            gameState.characters['Пуч'].location = 'В пути';
            gameState.characters['Боб'].location = 'В пути';
        }
        if (gameState.levelStates.level3.shmelPickedUp) {
            gameState.characters['Шмель'].status = 'Едем в Нск!';
            gameState.characters['Шмель'].location = 'В пути';
        }
        if (gameState.levelStates.level3.allInBanya) {
            Object.keys(gameState.characters).forEach(name => {
                gameState.characters[name].location = 'БАНЯ';
                gameState.characters[name].status = 'В бане!';
            });
        }
    }
    
    renderCharacters();
}

// Показать экран победы
function showWinScreen() {
    document.getElementById('winScreen').classList.add('active');
}

// Перезапуск игры
function restartGame() {
    // Сброс состояния игры
    Object.assign(gameState, {
        level: 1,
        attempts: 3,
        currentAttempt: 1,
        progress: 0,
        inventory: [],
        messages: ['Игра началась! Собери всех друзей в баню!'],
        completedLevels: [],
        levelStates: {
            level1: {
                carFixed: false,
                moneyGiven: false,
                shmelAgreed: false,
                planStarted: false,
                completed: false
            },
            level2: {
                cargoFound: false,
                charterArranged: false,
                decinaFlying: false,
                completed: false
            },
            level3: {
                gasMoneyGiven: false,
                bobAgreed: false,
                puchGoing: false,
                shmelPickedUp: false,
                allInBanya: false,
                completed: false
            }
        },
        levelProgress: {
            1: 0,
            2: 0,
            3: 0
        }
    });
    
    // Сброс персонажей
    const chars = gameState.characters;
    chars['Пуч'].location = 'Нск';
    chars['Пуч'].status = 'Готов к бане, но машина сломана';
    
    chars['Дрон'].location = 'Нск';
    chars['Дрон'].status = 'Придумывает план';
    
    chars['Троф'].location = 'Нск';
    chars['Троф'].status = 'Связывается с Шмелем';
    
    chars['Шмель'].location = 'Свободный';
    chars['Шмель'].status = 'На вахте, освободится в субботу';
    
    chars['Децина'].location = 'Мадагаскар';
    chars['Децина'].status = 'В отпуске, рейс через 2 недели';
    
    chars['Боб'].location = 'Нск';
    chars['Боб'].status = 'Есть инструменты, может починить';
    
    chars['Лёха'].location = 'Нск';
    chars['Лёха'].status = 'Жадина, но есть деньги';
    
    // Закрываем экран победы
    document.getElementById('winScreen').classList.remove('active');
    
    // Перезапускаем игру
    initGame();
    addMessage('Игра перезапущена! Удачи!', true);
}

// Инициализируем игру при загрузке страницы
window.onload = initGame;