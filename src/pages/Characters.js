import React, { useEffect } from 'react';

import CharCards from '../components/CharCards';
import api from '../api';

import './styles/Characters.css';

function useCharacters() {
    const [ characters, setCharacters ] = React.useState({chars: []});

    const fetchData = async () => { 
        
        try {
            const data = await api.badges.list();
            setCharacters({chars: data});
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);

    return characters;
}

const Characters = () => {
   const [ characterse, setCharacterse ] = React.useState({
        data: [
            {
                "id": "01",
                "firstName": "Drizzt",
                "lastName": "Do'Urden",
                "race": "Drow",
                "deity": "Mielikki",
                "gender": "Male",
                "description": "Drizzt Do'Urden also called Drizzt Daermon N'a'shezbaernon, was a male drow ranger. He was an atypical drow who had forsaken both the evil ways of his people and their home in the Underdark, to become the legendary hero of the North.",
                "avatarUrl": "https://i.imgur.com/2U4ds6j.jpg"
              },
              {
                "id": "02",
                "firstName": "Guenhwyvar",
                "lastName": "",
                "race": "Panther",
                "deity": "Doesn't have",
                "gender": "Female",
                "description": "Guenhwyvar was a black panther who resided on the Astral Plane. She was summoned to the Prime Material Plane by the use of an onyx Figurine of Wondrous Power.",
                "avatarUrl": "https://i.imgur.com/KqndMOX.jpg"
              },
              {
                "id": "03",
                "firstName": "Catti-brie",
                "lastName": "",
                "race": "Human",
                "deity": "Dumanthoin",
                "gender": "Female",
                "description": "Catti-brie was a female human and a friend and later wife[11] to Drizzt Do'Urden. She was a member of the Companions of the Hall and, later, a chosen of the goddess Mielikki.[12] She was reincarnated as a Bedine girl named Ruqiah in 1463 DR",
                "avatarUrl": "https://i.imgur.com/aPZm6dA.jpg"
              }
        ]
    }) 

    

    const charactersData = useCharacters()

    console.log(charactersData)
    console.log(characterse)

    return(
        <section className="Characters">
            <div className="Container__char">
                <h1>Most important Characters from the Underdark:</h1>
                <div className="Character__card">
                <ul className="Char__list">
                        {charactersData.chars.map(char => {
                        return (
                            <li className="Char__li" key={char.id}>
                                <CharCards data={char}/>
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