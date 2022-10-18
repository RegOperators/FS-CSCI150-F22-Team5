const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) {
    return null
  }
  
  return (
    <div className="relative z-20">
      <div className="fixed inset-0 bg-black opacity-75" onClick={() => setIsOpen(false)}></div>
      {children}
    </div>
  )
}

export default Modal