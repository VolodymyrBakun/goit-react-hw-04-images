import { useState } from 'react';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [toSearch, setToSearch] = useState('');

  const handleChange = event => {
    setToSearch(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(toSearch);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={toSearch}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
