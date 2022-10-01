import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchBtn,
  StyledBiSearch,
  StyledSearchFormInput,
} from './Searchbar.styled';
export default function Searchbar({ onSubmit }) {
  const [itemName, setItemName] = useState('');

  const handleItemNameChange = e => {
    setItemName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (itemName.trim() === '') {
      Notify.info('Please fill in the form');
      return;
    }

    onSubmit(itemName);
    setItemName('');
  };

  return (
    <StyledSearchbar className="searchbar">
      <StyledSearchForm className="form" onSubmit={handleSubmit}>
        <StyledSearchBtn type="submit" className="button">
          <StyledBiSearch />
        </StyledSearchBtn>
        <StyledSearchFormInput
          name="inputValue"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={itemName}
          onChange={handleItemNameChange}
        />
      </StyledSearchForm>
    </StyledSearchbar>
  );
}
