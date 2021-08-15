import React from "react";
import {Link} from 'react-router-dom';
import ContactCard from "./ContactCard";

const contactList = (props)=> {
  
  const renderContactList = props.contacts.map((contact) => {
      return <ContactCard contact={contact} key={contact.id}/>;
    });

    return (
      <div className="main">
        <h2>Contact List
          <Link to="/add">
          <button className="ui right floated button blue">Add Contact</button>
          </Link> </h2>
          <div className="ui search">
            <div className="ui icon input">
              <input type="text" placeholder="Search Contact" className="prompt" value={props.term} onChange={(e)=> props.searchTerm(e.target.value)} ></input>
              <i className="search icon"></i>
            </div>
          </div>
      <div className="ui celled list" >{renderContactList.length > 0 ? renderContactList : "No Contact available"}</div>
    </div>);
};

export default contactList;
