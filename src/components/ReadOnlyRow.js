import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td><img className='avatar' src={contact.avatar} alt={contact.avatar}/></td>
      <td>{contact.first_name}</td>
      <td>{contact.last_name}</td>
      <td>{contact.email}</td>
      <td style={{padding:''}}>
        <div style={{display:'flex',flexDirection:'column',padding:'10px'}}>
          <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
          style={{margin:'5px 0'}}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
