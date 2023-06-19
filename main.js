(function () {

  const list = document.querySelector('.card-list');
  const container = document.querySelector('.container');
  let randomNumbers = [];
  let chosenCards = [];


function createForm () {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const newGameButton = document.createElement('button')

  form.classList.add('form');
  input.classList.add('input');
  input.type = 'number';
  button.classList.add('btn');
  newGameButton.classList.add('new-game__btn', 'new-game__btn--disabled');

  button.textContent = 'Начать Игру'
  newGameButton.textContent = 'Играть снова'

  form.append(input)
  form.append(button)
  container.prepend(form);
  container.append(newGameButton)


  return {
    form,
    input,
    button,
    newGameButton,
  }

}

createForm()





  const btn = document.querySelector('.btn');
  const input = document.querySelector('.input')





  function createNumbersArray(count) {
    for (let i = 1; i <= count; i++) {
      randomNumbers.push(i,i)
    }
  }



  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t
    }
  }




  function startGame(count) {
    createNumbersArray(count);
    shuffle(randomNumbers);
  }



  function createCard (array) {

    randomNumbers = [];
    list.innerHTML = " ";
    for (const item of array) {
      const li = document.createElement("li");
      const divFront = document.createElement('div');
      const divBack = document.createElement('div');
      const span = document.createElement('span');


      li.classList.add('card-item');
      divFront.classList.add('front');
      divBack.classList.add('back');
      span.textContent = item;
      span.classList.add('back__content');


      li.append(divFront);
      divBack.append(span);
      li.append(divBack);
      list.append(li);

    }



  }

  const newGameButton =document.querySelector('.new-game__btn')

  function newGame (count = +input.value) {
    if (count <= 1 || count > 5) {
      count = 2
    }
    startGame(count)
    createCard(randomNumbers)
    game()
  }


  function game () {
    const cards = document.querySelectorAll('.card-item');

    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click',  () => {
        console.log(cards[i])
        cards[i].classList.add('active');
        chosenCards.push(cards[i])
        if (chosenCards.length > 2) {
          chosenCards = [];
          chosenCards.push(cards[i])
          console.log(chosenCards)
        } else if (chosenCards.length === 2) {
          if (chosenCards[0].textContent === chosenCards[1].textContent) {
            for (let i = 0; i < chosenCards.length; i++) {
              setTimeout(() => {
                chosenCards[i].classList.add('active');
              }, 500)
            }
          } else {
            for (let i = 0; i < chosenCards.length; i++) {

              setTimeout(() => {
                chosenCards[i].classList.remove('active');
              }, 500)
            }
          }
        }

        if ([...cards].every(item => item.classList.contains('active'))) {
          newGameButton.classList.remove('new-game__btn--disabled')
        }

        newGameButton.addEventListener('click', () => {
          newGameButton.classList.add('new-game__btn--disabled')
          newGame()
        })

      })
    }
  }








  btn.addEventListener('click', (e) => {
    e.preventDefault()
    newGame()
  })





})();







