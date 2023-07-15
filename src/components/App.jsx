import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fechImg } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { Modal } from './Modal/Modal';

export function App() {
  const [toSearch, setToSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [selectedImgId, setSelectedImgId] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleSubmit = whatToSearch => {
    setToSearch(whatToSearch);
    setPage(1);
    setTotalHits(0);
    setError(null);
    setImages([]);
  };

  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  const handleFech = async () => {
    try {
      setIsLoading(true);
      const response = await fechImg(toSearch, page);

      setImages([...images, ...response.data.hits]);
      setTotalHits(response.data.totalHits);

      if (response.data.totalHits === 0) {
        Notiflix.Notify.warning('Nothing found, please try something else!');
        return;
      }
      if (response.data.hits.length < 12) {
        Notiflix.Notify.info('Thats all we have');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectImg = selectedImgId => {
    const selectedImg = images.find(img => img.id === selectedImgId);
    setSelectedImgId(selectedImgId);
    setSelectedImg(selectedImg);
  };

  const handleModalClose = () => {
    setSelectedImgId(null);
    setSelectedImg(null);
  };

  useEffect(() => {
    if (toSearch === '') {
      return;
    }
    handleFech();
  }, [toSearch, page]);

  return (
    <div className="App">
      {/* Searchbar */}
      <Searchbar onSubmit={handleSubmit} />

      {/* Error */}
      {error !== null && <p>{error}</p>}

      {/* Gallery */}
      {images.length > 0 ? (
        <ImageGallery imgData={images} selectImg={onSelectImg} />
      ) : null}

      {/* Loader */}
      {isLoading && <Loader />}

      {/* Button */}
      {images.length > 0 && totalHits / 12 > page ? (
        <LoadMoreButton loadMore={handleLoadMoreBtn} />
      ) : null}

      {/* Modal */}
      {selectedImgId && (
        <Modal src={selectedImg} handleModalClose={handleModalClose} />
      )}
    </div>
  );
}
