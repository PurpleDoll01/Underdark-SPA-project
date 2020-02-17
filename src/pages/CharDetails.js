import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useParams } from 'react-router';

import Loader from '../components/Loader';
import DeleteBadgeModal from '../components/DeleteBadgeModal';
import './styles/CharDetails.css';

import api from '../api';

function useCharactersId () {
    const [ loading, setLoading ] = React.useState(true);
    const [ isOpen, setIsOpen ] = React.useState(false);
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

    return { charactersData, loading, isOpen, setIsOpen }

}


const CharDetails = (props) => {
    const { charId } = useParams();
    const {charactersData, loading, isOpen, setIsOpen} = useCharactersId();
    const dataChar = charactersData.chars;

    const goodId = parseInt(charId, 10);
    
    if(goodId !== 0 && !goodId) {
        return <Redirect to={{ pathname: '/404'}} />
    } 

    if(!loading && !dataChar.id) {
        return <Redirect to={{ pathname: '/404'}} />
    }

    console.log({dataChar: dataChar.id});

    const handleDelete = async e => {
        try {
            await api.characters.remove(
                charId               
            )            
            props.history.push('/underdark/char/');
        } catch (error) {
            console.log(error);
        }
    }

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
                            <button className="Delete__button" 
                                onClick={e => {
                                    setIsOpen(true);
                                }}
                                >Delete</button>
                            <DeleteBadgeModal 
                                onCloseModal={e => {
                                    setIsOpen(false);
                                }}
                                isOpen={isOpen}
                                onDeleteChar={handleDelete}
                            />
                        </div>                           
                    </div>
                    
                }
            </div>
        </section>
    )
}

export default CharDetails;