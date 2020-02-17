import React, { useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router';

import api from '../api';

import './styles/CharModify.css';

function useCharactersId () {
    let { charId } = useParams();
    const [ loading, setLoading ] = React.useState(true);
    const [ charactersData, setCharactersData ] = React.useState({chars: [
        {
            "id": "1",
            "firstName": "Drizzt",
            "lastName": "Do'Urden",
            "race": "Drow",
            "deity": "Mielikki",
            "gender": "Male",
            "description": "Drizzt Do'Urden also called Drizzt Daermon N'a'shezbaernon, was a male drow ranger. He was an atypical drow who had forsaken both the evil ways of his people and their home in the Underdark, to become the legendary hero of the North.",
            "avatarUrl": "https://i.imgur.com/2U4ds6j.jpg"
          },
    ]});

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

    return { charactersData, loading, setCharactersData }

}

const CharModify = (props) => {
    const { charId } = useParams();
    const { charactersData, loading, setCharactersData } = useCharactersId();

    const goodId = parseInt(charId, 10);

    if(goodId !== 0 && !goodId) {
        return <Redirect to={{ pathname: '/404'}} />
    } 

    if(!loading && !charactersData.chars.id) {
        return <Redirect to={{ pathname: '/404'}} />
    }

    const handleSubmit = async e => {
        e.preventDefault(); 
        
        try {
            await api.characters.update(charactersData.chars.id, charactersData.chars) 
            alert('Success');
            props.history.push(`/characters/${charactersData.chars.id}`);
          
         }   catch (error) {
             console.log(error);          
         }
    }

    const handleChange = e => {
        setCharactersData({
            chars: {
                ...charactersData.chars,
                [e.target.name]: e.target.value
            }
        });  
        
    };

    console.log(charactersData)

    return(
        <div className="Form__container">
            <form className="Form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="name">First Name:</label>
                    <input 
                    id="name"
                    onChange={handleChange}
                    className="form-control" 
                    type="text" 
                    name="firstName"
                    defaultValue={charactersData.chars.firstName}/>
                </div>  
                <div className="form-group">
                    <label for="lastName">Last Name:</label>
                    <input 
                    id="lastName"
                    onChange={handleChange}
                    className="form-control" 
                    type="text" 
                    name="lastName"
                    defaultValue={charactersData.chars.lastName}/>
                </div> 
                <div className="form-group">
                    <label for="race">Race:</label>
                    <input 
                    id="race"
                    onChange={handleChange}
                    className="form-control" 
                    type="text" 
                    name="race"
                    defaultValue={charactersData.chars.race}/>
                </div>
                <div className="form-group">
                    <label for="deity">Deity:</label>
                    <input 
                    id="deity"
                    onChange={handleChange}
                    className="form-control" 
                    type="text" 
                    name="deity"
                    defaultValue={charactersData.chars.deity}/>
                </div>
                <div className="form-group">
                    <label for="gender">Gender:</label>
                    <input
                    id="gender" 
                    onChange={handleChange}
                    className="form-control" 
                    type="text" 
                    name="gender"
                    defaultValue={charactersData.chars.gender}/>
                </div>
                <div className="form-group">
                    <label for="description">Description:</label>
                    <textarea  
                    id="description"
                    rows="10" 
                    cols="30"
                    onChange={handleChange}
                    className="form-control" 
                    type="text" 
                    name="description"
                    value={charactersData.chars.description}
                    ></textarea>
                    
                </div>    

                <button className="Save__button">Save</button>
        
            </form>
        </div>
    )
}

export default CharModify;