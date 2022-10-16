import { useEffect, useState, useRef } from 'react';
import { Box } from './Box/Box';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import './App.css';
import { fetchImages } from 'utils/fetchImages';

let selectedImage = '';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const isFirstRender = useRef(true);

  const handleSubmit = e => {
    e.preventDefault();
    setPage(1);
    setQuery(e.target.elements.query.value);
    setImages([]);
    setTotalResults(0);
    e.target.reset();
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = url => {
    toggleModal();
    selectedImage = url;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (query === '') {
      return;
    }
    setStatus('pending');

    try {
      fetchImages(page, query).then(response => {
        if (response) {
          setTotalResults(response.data.totalHits);
          setStatus('resolved');
          return setImages(prevImages => [
            ...prevImages,
            ...response.data.hits,
          ]);
        }
        if (response.data.hits.length <= 0) {
          setStatus('rejected');
        }
      });
    } catch (error) {
      setStatus('rejected');
      console.log(error);
    }
  }, [page, query]);

  return (
    <Box className="App">
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {status === 'pending' && (
        <>
          <ImageGallery>
            <ImageGalleryItem data={images}></ImageGalleryItem>
          </ImageGallery>
          <Loader />
        </>
      )}
      )
      {status === 'resolved' && (
        <>
          {showModal && (
            <Modal url={selectedImage} onClose={toggleModal}></Modal>
          )}
          <ImageGallery>
            <ImageGalleryItem
              onClick={handleImageClick}
              data={images}
            ></ImageGalleryItem>
          </ImageGallery>
          {images.length < totalResults && (
            <Button onClick={loadMore} page={page}></Button>
          )}
        </>
      )}
    </Box>
  );
}
