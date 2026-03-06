import * as React from "react";
import { useCallback } from "react";
import "./header.scss";

interface HeaderProps {
  onSubmit: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSubmit }) => {
  const [searchedValue, setSearchedValue] = React.useState("");
  const handleClick = useCallback(() => {
    onSubmit(searchedValue.trim());
  }, [onSubmit, searchedValue]);

  return (
    <header className="header-container">
      <h1>IP Address Tracker</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          id="searchInput"
          placeholder="Search for any IP address or domain"
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
        />
        <button type="button" className="search-button" onClick={handleClick}>
          <img src="public/icon-arrow.svg" alt="Search" />
        </button>
      </div>
    </header>
  );
};

export default Header;
