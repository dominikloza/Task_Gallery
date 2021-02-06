import React , {useState, useEffect} from 'react';
import SearchBar from "./SearchBar";
import Image from "./Image";
import {createApi} from "unsplash-js";

const PhotoGallery = ({search, setSearch, photos, setPhotos, modal, setModal, setResult, result}) => {

    const [currPage, setCurrPage] =  useState(1);
    const unsplash = createApi({accessKey: 'nepucDy_yjCpJeogiY2PcNAgj47CZroqrdJL8WIFzbA'});
    let morePhoto = [];
    console.log(photos);

    useEffect(() => {
        unsplash.search.getPhotos({
            query: search,
            page: currPage,
            perPage: 10,
        }).then(result => {
            if (result.errors) {
                console.log('error occurred: ', result.errors[0]);
            } else {
                morePhoto = result.response.results;
                setPhotos(prevState => [...prevState, ...morePhoto]);
                console.log(morePhoto)
            }
        })
    }, [currPage])

    const handleMore = () => {
        setCurrPage(prevState => prevState + 1);
    }


    return (
        <>
            <div className={!modal ? null : "blur"}>
            </div>
            <div className="container">
                <div className="photo__gallery">
                    <SearchBar search={search} setSearch={setSearch} setPhotos={setPhotos} setResult={setResult}/>
                    <h2 className="photo__gallery--search">{result}</h2>
                    <div className="photo__gallery__img">
                        {
                            photos.map(el => <Image key={el.id} smallURL={el.urls.small} largeURL={el.urls.full}
                                                    firstName={el.user.first_name} lastName={el.user.last_name}
                                                    userPhoto={el.user.profile_image.medium} place={el.user.location}
                                                    modal={modal} setModal={setModal} likes={el.likes}/>)

                    }
                    </div>
                    {photos.length ? <h2 className="more" onClick={handleMore}>See More</h2> : null}
                </div>

            </div>
        </>
    )
        ;
};

export default PhotoGallery;