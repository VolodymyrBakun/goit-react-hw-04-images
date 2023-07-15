import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal({ src, handleModalClose }) {
  const handleClickOnOverlay = event => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="Overlay" onClick={handleClickOnOverlay}>
      <div className="Modal">
        <img src={src.largeImageURL} alt={src.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.object.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
