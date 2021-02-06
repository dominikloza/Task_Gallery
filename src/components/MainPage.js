import React from 'react';
import SearchBar from "./SearchBar";

const MainPage = ({search, setSearch, setPhotos, setResult}) => {



    return (
        <div className="main__page">
            <div className="container start__page">
                <div className="center__box">
                    <h2>Unsplash</h2>
                    <h3>The Internet's source of freely-usable images.<br/>Powered by creators everywhere.</h3>
                    <SearchBar search={search} setSearch={setSearch} setPhotos={setPhotos} setResult={setResult}/>
                    <h4>Trending: flower, wallpapers, backgrounds, happy, love </h4>
                </div>
            </div>
        </div>
    );
};

export default MainPage;