import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar';
import { searchItems } from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader';
import { StyledApp } from './App.styled';
export default function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (itemName === '') {
      return;
    }
    console.log('sdfjalkdsfjlkads');

    async function fetchDate() {
      setIsloading(true);
      try {
        const data = await searchItems(itemName, page);
        setItems(prev => {
          setTotalItems(data.totalHits);
          return [...prev, ...data.hits];
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsloading(false);
      }
    }
    fetchDate();
  }, [itemName, page]);

  const getItemName = itemName => {
    setItemName(prev => {
      if (prev === itemName) return prev;
      setItems([]);
      setPage(1);
      return itemName;
    });
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = largeImageURL => {
    setModalOpen(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('');
  };

  return (
    <StyledApp>
      {modalOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <Searchbar onSubmit={getItemName} />
      {error && <p>Будь ласка спробуйте пізніше...</p>}
      {items.length > 0 && (
        <>
          <ImageGallery items={items} onClick={openModal} />
        </>
      )}
      {!isLoading && items.length > 0 && items.length < totalItems && (
        <Button handleLoadMore={loadMore} />
      )}
      {isLoading && <Loader />}
    </StyledApp>
  );
}
