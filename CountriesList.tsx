import React, { useEffect, useState } from 'react';

const CountriesList = () => {
  const [searchText, setSearchText] = useState('');
  const API_ENDPOINT = `https://algochurn-server.onrender.com/practice/countries`;
  const [options, setOptions] = useState([]);
  const [myListItems, setMyListItems] = useState([]);

  useEffect(() => {
    const debouncedFetchData = debounce(() => fetchData(), 500);
    if (searchText.length > 2) {
      debouncedFetchData();
    } else {
      setOptions([]);
    }
  }, [searchText]);

  const debounce = (cb, delay) => {
    let timer;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => cb(), delay);
      console.log(timer);
    };
  };

  const fetchData = () => {
    // console.log(searchText);
    fetch(`${API_ENDPOINT}/${searchText}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const { countries } = data;
        console.log(countries);
        setOptions(countries);
      });
  };

  const addToMyList = (el) => {
    if (!myListItems.includes(el)) {
      setMyListItems([...myListItems, el]);
    }
  };

  const removeFromMyList = (item) => {
    const updatedList = myListItems.filter((el) => el !== item);
    setMyListItems(updatedList);
  };

  return (
    <div>
      <div id="search-box">
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
      </div>
      <div id="search-result-dropdown">
        {options.map((el, idx) => (
          <div
            key={idx}
            onClick={() => {
              addToMyList(el);
            }}
          >
            {el}
          </div>
        ))}
      </div>
      <div id="my-list">
        <h2>My List</h2>
        {myListItems.map((el, idx) => (
          <div key={idx}>
            <p>{el}</p>
            <span
              onClick={() => {
                removeFromMyList(el);
              }}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
