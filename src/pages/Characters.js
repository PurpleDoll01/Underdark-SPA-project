import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CharCards from '../components/CharCards';
import Loader from '../components/Loader';
import api from '../api';

import './styles/Characters.css';

function useCharacters() {
    const [ loading, setLoading ] = React.useState(true);
    const [ charactersData, setCharactersData ] = React.useState({chars: []});

    const fetchData = async () => { 
        
        try {
            const data = await api.characters.list();
            setCharactersData({chars: data});
            setLoading(false); 
        } catch(error) {
            console.log(error);
        }
    }

    useEffect( () => {
        fetchData();
        let intervalId = setInterval(fetchData, 5000);
        

        return () => {
            clearInterval(intervalId);
        }

    }, []);

    return { charactersData, loading }

}

const Characters = () => {
    const {charactersData, loading} = useCharacters()

    console.log(charactersData)

    return(
        <section className="Characters">
            <div className="Container__char">
                <h1>Most important Characters from the Forgotten Realms:</h1>
                {loading && ( 
                    <Loader />
                )}
                <div className="Character__card">
                <ul className="Char__list">
                        {charactersData.chars.map(char => {
                        return (
                            <li className="Char__li" key={char.id}>
                                <Link className="text-reset text-decoration-none Char__li" to={`/characters/${char.id}`}>
                                    <CharCards data={char}/>
                                </Link>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Characters;