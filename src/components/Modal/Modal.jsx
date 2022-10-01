import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, StyledModal } from './Modal.style';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const closeModal = ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  return createPortal(
    <Overlay className="overlay" onClick={handleOverlayClick}>
      <StyledModal className="modal">{children}</StyledModal>
    </Overlay>,
    modalRoot
  );
}
