let letters = [...'abcdefghijklmnopqrstuvwxyz'];

let lettersContainer = document.querySelector(".letters");

letters.forEach(letter => {
    let letterSpan = document.createElement('span');
    let letterText = document.createTextNode(letter);
    letterSpan.className = 'letter-box';
    letterSpan.append(letterText);
    lettersContainer.append(letterSpan);
});

let words = {
    "football players": ['Messi', 'Cristiano', 'Salah', 'Ibrahimovic', 'Marcelo', 'Ramos', 'Iniesta', 'Puyol', 'Maradona', 'Ronaldo', 'Ronaldinho', 'Drogba', 'Neuer', 'Neymar', 'Suarez', 'Zidane', 'Benzema', 'Mbappe', 'Pele'],
    places: ['Pyramids', 'Maldives', 'luxor', 'Taj Mahal', 'Karnak', 'louvre'],
    countries: ['Egypt', 'USA', 'KSA', 'China', 'France', 'Tunisia', 'Iran', 'Iraq', 'Spain', 'Germany', 'Russia', 'Turkey', 'Libya', 'Canada', 'Brazil', 'Ghana', 'Mali', 'Australia', 'Austria', 'Japan', 'China'],
    movies: ['LOTR', 'Psycho', 'Inception', 'Lucy', 'Deadpool', 'Her', 'Parasite', 'UP', 'Gladiator', 'Whiplash', 'Memento', 'Joker', 'Coco', 'Braveheart', 'Heat', 'Klaus'],
    characters: ['Napoleon', 'Newton', 'Gandhi', 'Socrates', 'Edison', 'Beethoven', 'Putin', 'Che Guevara', 'Shakespeare', 'Lincoln', 'Hitler', 'Nobel', 'al-Khwarizmi', 'Pythagoras', 'Einstein'],
    series: ['See', 'Lost', 'Chernobyl', 'Narcos', 'Dark', 'Friends', 'Dexter', 'House', 'Sherlock'],
    sports: ['Football', 'Basketball', 'Tennis', 'Boxing', 'Golf', 'Baseball', 'Diving', 'Athletics', 'Swimming', 'Cycling', 'Sailing', 'Shooting', 'judo', 'Ski Jumping', 'Rowing', 'Cricket'],
    drinks: ['Tea', 'Juice', 'Milk', 'Water', 'Cofee', 'limonade', 'Soda'],
    animals: ['Lion', 'Tiger', 'Goat', 'Horse', 'Donkey', 'Dog', 'Cat', 'Pig', 'Bear', 'Elephant', 'Pigeon', 'Crow', 'Fox', 'Whale', 'Bat', 'Panda', 'Giraffe', 'Snake', 'Rat', 'Duck', 'Sheep', 'Frog', 'Owl']
}

let mistakesCount = 0;
let accuracyCount = 0;
let wordSpace = 0;

let catogry = getRandomCategory(words);
document.querySelector('.game-category span').innerHTML = catogry;
let word = [...getRandomWord(words, catogry).toLowerCase()];
let guessContainer = document.querySelector('.letters-guess');
word.forEach(letter => {
    let guessLetterElement = document.createElement('span');
    if (letter === ' ') {
        guessLetterElement.className = 'space';
        guessLetterElement.innerHTML = '-';
        wordSpace++;

    }
    guessContainer.append(guessLetterElement);
});
let guessSpan = document.querySelectorAll('.letters-guess span');
let manDraw = document.querySelector('.hangman-draw');

document.addEventListener('click', function (e) {

    if (e.target.className === 'letter-box') {
        let correctGuess = false;
        e.target.classList.add('disabled');
        let clickedLetter = e.target.innerHTML.toLowerCase();
        word.forEach(function (wordLetter, wordindex) {

            if (clickedLetter === wordLetter) {

                correctGuess = true;
                guessSpan.forEach(function (spanletter, spanindex, spanArr) {
                    if (spanindex === wordindex) {
                        accuracyCount++
                        spanletter.innerHTML = wordLetter;
                        console.log(accuracyCount, spanArr.length - wordSpace);
                        if (accuracyCount === spanArr.length - wordSpace) {
                            endgame('win', 'darkturquoise');
                        } else {
                            document.getElementById('right').play();

                        }
                    }
                });
            }
        });
        if (mistakesCount < 8) {
            if (!correctGuess) {
                mistakesCount++;
                manDraw.classList.add(`mistake-no-${mistakesCount}`);
                if (mistakesCount === 8) {
                    endgame('fail', 'darkgrey',);

                } else {
                    document.getElementById('wrong').play();

                }
            }

        }
    }
})








function endgame(gameStatus, bgColor) {
    document.querySelector('.letters').classList.add('finished');
    let popUpcontainer = document.createElement('div');
    popUpcontainer.className = 'popup-container';
    popUpcontainer.style.backgroundColor = bgColor;
    let popUpMsg = document.createElement('h2');
    popUpMsg.className = 'popup-msg';
    let popUpMsgText;
    let popUpSubMsg = document.createElement('h4');
    popUpSubMsg.className = 'popup-submsg';
    let popUpSubMsgText = '';
    switch (gameStatus) {
        case 'win':
            popUpMsgText = document.createTextNode('Great game 😎');
            popUpSubMsgText = document.createTextNode('The word is ' + word.join('') + ' Do you want to start another game ?');
            document.getElementById('win').play();
            break;
        case 'fail':
            popUpMsgText = document.createTextNode('Hard luck 😓');
            popUpSubMsgText = document.createTextNode('The word is ' + word.join('') + ' Do you want to try again?');
            document.getElementById('fail').play();
            break;
        default:
            popUpMsgText = document.createTextNode('Something went wrong try again ');

    }
    popUpMsg.appendChild(popUpMsgText);
    popUpSubMsg.appendChild(popUpSubMsgText);
    let againBtn = document.createElement('button');
    let againBtnText = document.createTextNode('Again');
    againBtn.appendChild(againBtnText);
    againBtn.className = 'again-btn';
    popUpcontainer.append(popUpMsg, popUpSubMsg, againBtn);
    document.body.appendChild(popUpcontainer);
}

let againBtn = document.querySelector('again-btn');
document.addEventListener('click', (e => {
    if (e.target.className == 'again-btn') {
        location.reload();
    }
}));



function getRandomCategory(WordsObject) {
    let categoryKeys = Object.keys(WordsObject);
    let randomCategoryIndex = Math.floor(Math.random() * categoryKeys.length);
    return categoryKeys[randomCategoryIndex];
}

function getRandomWord(WordsObject, catogry) {
    let randomCategoryWords = WordsObject[catogry];
    let randomWordIndex = Math.floor(Math.random() * randomCategoryWords.length);
    return randomCategoryWords[randomWordIndex];
}
