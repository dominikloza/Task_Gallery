import React, {useState, useEffect} from "react";
import {createApi} from 'unsplash-js';
import {useHistory} from "react-router-dom";

const SearchBar = ({search, setSearch, setPhotos, setResult}) => {

    const unsplash = createApi({accessKey: 'nepucDy_yjCpJeogiY2PcNAgj47CZroqrdJL8WIFzbA'});

    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    let history = useHistory();
        let value;


    const handleAutoComplete = (e) => {
        setSearch(e.target.value)
        value = e.target.value;
        let suggestions = [];
        if (value.length > 2) {
            setTimeout(function(){
            unsplash.search.getCollections({
                query: value,
                page: 1,
                perPage: 10,
            }).then(result => {
                if (result.errors) {
                    console.log('error occurred: ', result.errors[0]);
                } else {
                    const photo = result.response;
                    console.log(photo.results);
                    let titles = [];
                    photo.results.map(el => {
                      titles.push(el.title);
                    })
                    let uniqueChars = [...new Set(titles)];
                    setItems(uniqueChars);
                }
            })
            }, 300);
        const regex = new RegExp(`${value}`, 'i');
        suggestions = items.sort().filter(v => regex.test(v));
            console.log("do wyszukania" + suggestions);
    }
    setSuggestions(suggestions);
}


const renderSuggestions = () => {
    if (suggestions.length === 0 && value > 2) {
      return (  <ul>
            <li>No results</li>
        </ul>
      );
    }
    return (
        <ul>
            {suggestions.map((el, i) => <li key={i}>{el}</li>)}
        </ul>
    );
}

const handleSearch = (e) => {
    e.preventDefault();
    setPhotos([]);
    console.log(search);
    history.push("/photo");
    unsplash.search.getPhotos({
        query: search,
        page: 1,
        perPage: 10,
    }).then(result => {
        if (result.errors) {
            console.log('error occurred: ', result.errors[0]);
        } else {
            const photo = result.response;
            setResult(search);
            setPhotos(photo.results);
        }
    });
}


return (
    <form onSubmit={handleSearch}>
        <div>
            <i className="fas fa-search"></i>
            <input className="search__bar" type="text" placeholder="Search free high-resolution photos"
                   value={search} onChange={handleAutoComplete}/>
            {renderSuggestions()}
        </div>
    </form>
);
}
;

export default SearchBar;