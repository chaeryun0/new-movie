import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import styles from "./SearchInput.module.css";

const SearchInput = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log(value);
    setText(value.toLowerCase());
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(text ? `/search?q=${text}` : "/");
  };

  return (
    <header className={styles.searchHeader}>
      <form className={styles.searchForm} onSubmit={handleFormSubmit}>
        <BsSearch className={styles.searchIcon} />
        <input type="search" placeholder="영화 제목을 입력해주세요." className={styles.searchInput} onChange={handleInputChange} value={text} />
      </form>
    </header>
  );
};

export default SearchInput;
