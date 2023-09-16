//создаем класс Card, в котором прописываем
//все основные моменты

class Card {
  _open = false
  _success = false
  constructor(container, number, action) {
        this.card = document.createElement('div')
        this.card.classList.add('card')
        this.card.textContent = number
        this.number = number
        this.card.addEventListener('click', () => {
          if(this.open == false && this.success == false) {
            this.open = true
            action(this)
          }
        })
        container.append(this.card)
  }

  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }

  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }

  get success() {
    return this._success
  }
}

//создаем массив из парных чисел
let cardsArray = [];
let count = 16;
let array = [];
let firstCard = null;
let secondCard = null;

function createNumbersArray(count) {
  for (let i=1; i<=count/2; i++) {
    cardsArray.push(i);
    cardsArray.push(i);
  }
}

//вызывваем функцию с количеством карточек 16
createNumbersArray(count);

//миксуем массив с использованием
//алгоритма Фишера — Йетса

function shuffle (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let tmp = arr[i];
    let rnd = Math.floor(Math.random() * (i + 1));

    arr[i] = arr[rnd];
    arr[rnd] = tmp;
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для
//создания массива перемешанными номерами. На основе
//этого массива вы можете создать DOM-элементы
//карточек. У каждой карточки будет свой номер
//из массива произвольных чисел. Вы также можете
//создать для этого специальную функцию.
//count - количество пар.

shuffle(cardsArray);

function startGame(container, count) {
  for (const cardNumber of cardsArray) {
    array.push(new Card(container, cardNumber, flip))
  }

  function flip(card) {

    if(firstCard !== null && secondCard !== null) {
      if(firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if(firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
          secondCard = card
      }
    }

    if(firstCard !== null && secondCard !== null) {
      if(firstCard.number == secondCard.number) {
        firstCard.success = true
        secondCard.success = true
        firstCard = null
        secondCard = null
      }
    }

    if(document.querySelectorAll('.card.success').length == cardsArray.length) {
      alert('Вы выиграли!')
    }
  }
}

startGame(document.getElementById('game'), count)