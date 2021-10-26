import React, { useState,useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import axios from "axios";

const App = () => {
  const [contacts, setcontacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);
  const fetchData = async()=>{
    const data = await axios.get('https://reqres.in/api/users?page=2');
    return data;
  }
  useEffect(()=>{
    const fetchContacts = async()=>{
      const res = await fetchData(); 
      setcontacts(res.data.data);
    }
   fetchContacts();
  },[])
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = async(event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      first_name: addFormData.first_name,
      last_name: addFormData.last_name,
      avatar: addFormData.avatar,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setcontacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      avatar: editFormData.avatar,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setcontacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      first_name: contact.first_name,
      last_name: contact.last_name,
      avatar: contact.avatar,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setcontacts(newContacts);
  };
  console.log(contacts);
  return (
    <div className="app-container">
      <form onSubmit={handleAddFormSubmit} className='form'> 
      <h2 style={{textAlign:'center',fontSize:'32px',backgroundColor:'#3498db',color:'#fff',borderRadius:'20px'}}>Add a Contact</h2>
        <div style={{display:'flex',justifyContent:'space-around'}}>
        <input
          type="text"
          name="first_name"
          required="required"
          placeholder="First Name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="last_name"
          required="required"
          placeholder="Last Name"
          onChange={handleAddFormChange}
        />
        </div>
        <div style={{width:'100%',marginTop:'20px',}}>
         <input
          type="text"
          name="email"
          required="required"
          placeholder="Email"
          onChange={handleAddFormChange}
          style={{}}
        />
        </div>
        <input
          type="file"
          name="avatar"
          required="required"
          placeholder="Avatar"
          onChange={handleAddFormChange}
          style={{padding:'10px',marginTop:'10px'}}
        />
        <div style={{padding:"0 40px",marginLeft:'auto'}}>
          <button type="submit" className='btn'>Add</button>
        </div>
      </form>
      <form onSubmit={handleEditFormSubmit} style={{width:'100%'}}>
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
                ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
