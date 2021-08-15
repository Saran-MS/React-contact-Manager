import React from "react";
import { Link } from 'react-router-dom';
import user from '../images/user.png'

const ContactCard = (props) => {
  const {id,name,email} = props.contact;
    return(
      <div className="item">
          <div className="content">
            <Link to={{ pathname:`/contact/${id}`,state:{contact:props.contact}}} >
              <img className="ui avatar image left floated" src={user} alt="user"/>
              <div className="ui medium header">{name}</div>
              <div> {email} </div>
            </Link>
          </div>
            <Link to={{ pathname:`/delete/${id}`,state:{contact:props.contact} }}>
              <i className="trash alternate outline icon right floated large" style={{color:"red",marginTop: "7px",marginLeft:"10px",}} />
            </Link>
            <Link to={{ pathname:`/edit`,state:{contact:props.contact} }}>
              <i className="edit alternate outline icon right floated large" style={{color:"blue",marginTop: "7px" }} />
            </Link>
      </div>
    );
};

export default ContactCard;
