function ImagePopup({ onClose, card }) {
  const [cardLink, cardName] = card;

  return (
    <section className={`popup popup-img ${card ? 'popup_open' : ''}`} onClick={e => (e.currentTarget === e.target) && onClose()}>
        <div className="popup-img__container">
          <img className="popup-img__foto" src={cardLink} alt="#" />
          <button className="popup__close-btn" type="button" onClick={onClose}></button>
          <h2 className="popup-img__title">{cardName}</h2>
        </div>
    </section>
  )
}
  
export default ImagePopup;