
import MainPage from "./components/MainPage";
import './style/main.scss';
import PhotoGallery from "./components/PhotoGallery";
import {
    Switch
} from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {useState} from 'react';



function App() {

    // eslint-disable-next-line no-undef
    const [search, setSearch] = useState("");
    const [photos, setPhotos] = useState([]);
    const [modal ,setModal] = useState(false);
    const [result, setResult] = useState("");
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <MainPage search={search} setSearch={setSearch} setPhotos={setPhotos} setResult={setResult}/>
                    </Route>
                    <Route path="/photo">
                        <PhotoGallery search={search} setSearch={setSearch} photos={photos} setPhotos={setPhotos} modal={modal} setModal={setModal} setResult={setResult} result={result}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
