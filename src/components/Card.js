function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  } 

  return (
    <div className="places__item" key={card._id}>
      <img className="places__foto" src={card.link} onClick={handleClick}/>
      <h2 className="places__name">{card.name}</h2>
      <button className="places__like" type="button"></button>
      <span className="places__counter-like">{card.likes.length}</span>
      <button className="places__delete" type="button"></button>
    </div>
  )
}

export default Card;