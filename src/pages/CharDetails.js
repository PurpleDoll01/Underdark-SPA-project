import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import Loader from '../components/Loader';
import './styles/CharDetails.css';

import api from '../api';

function useCharactersId () {
    const [ loading, setLoading ] = React.useState(true);
    const [ charactersData, setCharactersData ] = React.useState({chars: []});
    let { charId } = useParams();

    console.log(charId);

    const fetchData = async () => { 
        
        try {
            const data = await api.characters.read(
                charId 
            );
            setCharactersData({chars: data});
            setLoading(false); 
        } catch(error) {
            console.log(error);
        }
    }

    useEffect( () => {
        fetchData();

    }, []);

    return { charactersData, loading }

}


const CharDetails = () => {

    const {charactersData, loading} = useCharactersId();

    const dataChar = charactersData.chars;

    return(
        <section className="Description__section">
            <div className="Description__container">
                <h2>Character Info:</h2>
                {loading && ( 
                    <Loader />
                )}
                {!loading &&
                    <div>
                        <div className="Description">
                            <div className="Image__container">
                                <img className="Description__image" src={dataChar.avatarUrl} alt=""/>
                                <div className="Shadow__image"></div>
                            </div>
                            <div className="Paragraphs">
                                <p><span>Name:</span> {dataChar.firstName} {dataChar.lastName}</p> 
                                <p><span>Race:</span> {dataChar.race}</p> 
                                <p><span>Deity:</span> {dataChar.deity}</p> 
                                <p><span>Gender:</span> {dataChar.gender}</p> 
                                <p>{dataChar.description}</p> 
                            </div>
                        </div> 
                        <div className="Buttons__container">
                             <Link to={`/characters/modify/${dataChar.id}`} className="Modify__button">Modify</Link>
                             <Link to="/" className="Delete__button">Delete</Link>
                        </div>                           
                    </div>
                    
                }
            </div>
        </section>
    )
}

export default CharDetails;