function PopupWithForm({ name, title, btnTitle, isOpen, onClose, children }) {
  return (
    <section className={`popup popup-${name} ${isOpen ? 'popup_open' : ''}`} onClick={e => (e.currentTarget === e.target) && onClose()}> 
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form className="edit-form" name={`${name}`} noValidate>
          {children}
        </form>
        <button className="submit-btn" type="submit">{btnTitle}</button>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default PopupWithForm;