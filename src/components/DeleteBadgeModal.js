import React from 'react';
import Modal from './Modal';

import './styles/DeleteBadgeModal.css'

function DeleteBadgeModal (props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onCloseModal}>
            <div className="DeleteBadgeModal">
                <h1 className="Modal__title">Are you sure?</h1>  
                <p className="Modal__phrase">Please, don't erase me :'c</p> 
                <div>
                    <button onClick={props.onDeleteChar} className="Delete__button">Delete</button>
                    <button onClick={props.onCloseModal} className="Cancel__button">Cancel</button>
                </div>             
            </div>
         </Modal> 
    )
}

export default DeleteBadgeModal;