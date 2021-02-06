import React, {useState} from 'react';

const Image = ({smallURL, largeURL, firstName, lastName, userPhoto, place, modal, setModal,likes}) => {

    const [open, setOpen] = useState(false);
    const large = largeURL;
    const small = smallURL;
    const name = firstName + " " + lastName;

    const handleOpen = () => {
        if (!modal) {
            setOpen(true);
            setModal(true);
        }

    }
    const handleClose = () => {
        setOpen(false);
        setModal(false);
    }

    let img;
    if (open) {
        img = <div className="blur">
            <div className="modal__img">
                <div className="user">
                    <img className="modal__img--user" src={userPhoto}/>
                    <h2>{name}</h2>
                </div>
                <img className="full__photo" src={large} alt=""/>
                {place !== null ? <h3><i className="fas fa-map-marker-alt"></i>{place}</h3> : <h3><i className="fas fa-map-marker-alt"></i>not found</h3>}
                <i className="fas fa-times" onClick={handleClose}></i>
                <div className="modal__img--likes"><h2>{likes}</h2><i className="fas fa-heart"></i></div>
            </div>
        </div>
    } else {
        img = null;
    }

    return (
        <>
            <img className="small__photo" src={small} onClick={handleOpen}/>
            {img}
        </>

    );
};

export default Image;