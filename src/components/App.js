import React, {useState,useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header'
import { v4 as uuid } from 'uuid';
import api from '../api/contact';
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';


function App(){
    const [contacts,setContacts] = useState([]);
    const [searchTerm,setSearchTeam] = useState("");
    const [searchResults,setSearchResults] = useState([]);
    //RetrieveContacts 
    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    }

    const addContactHandler= async (contact)=>{
        console.log(contact);
        const request = {
            id: uuid(),
            ...contact,
        }

        const response = await api.post("/contacts",request);
        setContacts([...contacts,response.data]);
    }

    const updateContactHandler= async (contact)=>{
        const response = await api.put(`/contacts/${contact.id}`,contact);
        const {id,name,email} = response.data;
        setContacts(contacts.map((contact) => {
            return contact.id===id? {...response.data}:contact;
        }));
    }

    const searchHandler = (search) => {
        setSearchTeam(search);
        if(searchTerm !== ''){
            const newContactList = contacts.filter( (contact) =>{
                return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearchResults(newContactList);
        }
        else{
            setSearchResults(contacts);
        }
    };

    useEffect(()=>{
       // const retrieveContact = JSON.parse(localStorage.getItem("contacts"));
        //if(retrieveContact) setContacts(retrieveContact);
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if(allContacts) setContacts(allContacts);
        };
        getAllContacts();
    },[]);

    const removeContactHandle = async (id) =>{
        await api.delete(`/contacts/${id}`)
        const newContactList = contacts.filter((contact)=>{
            return contact.id!==id;
        })

        setContacts(newContactList);
    }

    useEffect(()=>{
        //localStorage.setItem("contacts",JSON.stringify(contacts));
    },[contacts]);

    return (
        <div className="ui container">
            <Router>
            <Header/>
            <Switch>
                <Route path="/add"  render={(props) => <AddContact {...props} addContactHandler={addContactHandler}/>} />
                <Route path="/" exact render={(props) => <ContactList {...props} contacts={searchTerm < 1 ? contacts: searchResults} term={searchTerm} searchTerm = {searchHandler}/>} />
                <Route path="/contact/:id" component={ContactDetail} />
                <Route path="/delete/:id"  render={(props) => <DeleteContact {...props} getContactId={removeContactHandle} />} />
                <Route path="/edit"  render={(props) => <EditContact {...props} updateContactHandler={updateContactHandler}/>} />
            </Switch>
            </Router>
        </div>
    );
}

export default App;
