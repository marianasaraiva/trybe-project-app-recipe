import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function SearchInput() {
  const [search, setSearch] = useState('');
  console.log(search);
  const [radioSearch, setRadioSearch] = useState('ingredient');
  const { fetchApiFoodOrDrink } = useContext(Context);

  return (
    <div>
      <div className="input-header">
        <input
          className="input-text"
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </div>
      <div className="container-input-radio">
        <label htmlFor="ingredient">
          Ingredient
          <input
            name="select-input"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ () => setRadioSearch('ingredient') }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            name="select-input"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            onChange={ () => setRadioSearch('name') }
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            name="select-input"
            id="firstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ () => setRadioSearch('firstLetter') }
          />
        </label>
      </div>
      <div className="container-button">
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => fetchApiFoodOrDrink(search, radioSearch) }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
