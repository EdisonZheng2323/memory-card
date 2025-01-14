import { useState, useEffect } from 'react'
import '../styles/App.css'
import GameCard from "./gameCard.jsx"

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardArray, setCardArray] = useState([]);
  const [allCards, setAllCards] = useState([]);
  async function fetchCardData(pokemon){
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=iSUhFrwCxCNyJ6HQLEtz66TMijgonbzi&s=${pokemon}`)
    const json = await response.json();
    const image = json.data.images.original.url;
    return {name: `${pokemon}`, image: image};
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  useEffect(() => {
    setAllCards([]);
    const pokemonList = [
      'pikachu',
      'charmander',
      'charmeleon',
      'charizard',
      'squirtle',
      'blastoise',
      'venusaur',
      'mewtwo',
      'dialga',
      'palkia',
      'giratina',
      'arceus',
    ];
    shuffleArray(pokemonList);
    const fetchCards = async () => {
      const cards = await Promise.all(pokemonList.map(await fetchCardData));
      setAllCards(cards);
    };
    fetchCards();
    }, []);

  function handleCardClick(card){
    if(cardArray.includes(card.name)){
      if(score > highScore){
        setHighScore(score);
      }
      setScore(0);
      setCardArray([]);
    }
    else{
      setScore((prev) => prev + 1);
      setCardArray((prev) => [...prev, card.name]);
    }
    setAllCards(shuffleArray(allCards));
  }

  return (
    <div className="game">
      <header>
        <h1> Pokemon Memory Game</h1>
        <div className = "score">
          <div className = "currentScore">
            Score: {score}
          </div>
          <div className = "highScore">
            High Score: {highScore}
          </div>
        </div>
        <div className = "directions">
          Get points by clicking on an image but dont click on any more than once!
        </div>
      </header>
      <div className = "cards">
        {allCards.map((card) => (
          <GameCard className = "card" key = {card.name} card = {card} onClick = {() => handleCardClick(card)}/>
        ))}
      </div>
    </div>
  )
}

export default App
