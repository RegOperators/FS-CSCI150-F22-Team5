const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null
  }
  
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="fixed inset-0 flex justify-center items-center">{children}</div>
    </div>
  )
}

export default Modal