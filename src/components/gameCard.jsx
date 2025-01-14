import '../styles/gameCard.css'


export default function gameCard({card, onClick}){
  const image = card.image;
  const name = card.name;
  return (
    <div className = "card" onClick = {onClick}>
      <img src = {image}/>
      <div className = "pokemonName">
        {name}
      </div>
    </div>
  )
}