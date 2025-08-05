import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
