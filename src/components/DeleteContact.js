import React from "react";
import { Link } from 'react-router-dom';
import user from '../images/user.png'

const DeleteContact = (props) => {
    const {id,name,email} = props.location.state.contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image" >
                    <img src={user} alt="user" />
                </div>
                    <div className="content">
                        <div className="header">{name}</div>
                        <div className="description">{email}</div>
                    </div>
            </div>
            <div className="centered-div">
                <p className="center">Do you want to delete this contact ?</p>
                <div className="choice">
                <Link to={'/'}>
                <button className="ui button green" onClick={()=>props.getContactId(id)}>Yes</button>
                <button className="ui button red">No</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default DeleteContact;
