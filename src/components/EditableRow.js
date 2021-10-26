import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="file"
          required="required"
          placeholder="avatar"
          name="avatar"
          value={editFormData.avatar}
          onChange={handleEditFormChange}
          className='input'
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="First Name"
          name="firstName"
          value={editFormData.first_name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="lastName"
          name="lastName"
          value={editFormData.last_name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Email"
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
