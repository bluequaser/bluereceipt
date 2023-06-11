import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data-tax.json";
import ReadOnlyRow from "./components/ReadOnlyRowTax";
import EditableRow from "./components/EditableRowTax";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'

const AppTax = () => {
  const [tasks, setTasks] = useState([])
  const [taxCodeName, setTaxCodeName] = useState("");
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    taxCodeName: "",
    fullName: "",
    rate: 0
  });
  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'taxcodes');
    const taskColRef = query(taskColRef1)
    //where("supergroup","==","Income Group"))
        onSnapshot(taskColRef, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
        setDistinct();
      },[])
  const [editFormData, setEditFormData] = useState({
    taxCodeName: "",
    fullName: "",
    rate: 0
  });

  const setDistinct = () => {
    tasks.map((task) =>{

    });
  }
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleTaxCodeNameChange = (event) => {
    event.preventDefault();
    setTaxCodeName(event.target.value);
  }
  
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      taxCodeName: addFormData.taxCodeName, 
      fullName: addFormData.fullName,
      rate: addFormData.rate
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      taxCodeName: editFormData.taxCodeName, 
      fullName: editFormData.fullName,
      rate: editFormData.rate
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      taxCodeName: contact.taxCodeName, 
      fullName: contact.fullName,
      rate: contact.rate,
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

    setContacts(newContacts);
  };

  return (
    <div>
    <div className="app-container">
      <table>
      <tbody>
          <tr>
              <td colspan="3">
              <input 
                type="text"
                name="taxCodeName"
                required="required"
                placeholder="Enter Tax Code Name..."
                onChange={handleTaxCodeNameChange}
              />
              </td>
          </tr>
        </tbody>
      </table><br/>
      <form onSubmit={handleEditFormSubmit}>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tax Rate %</th>
              <th>Actions</th>
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
      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <table style={{height: "auto"}}>
          <tbody>
            <tr>
            <td>Name:
        <input 
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        </td>
        <td>Rate %:
        <input
          type="number"
          name="rate"
          required="required"
          placeholder="0.0"
          onChange={handleAddFormChange}
        />
        </td>
        <td>
        <button type="submit">Add</button>
        </td>
        </tr>
        </tbody>
        </table>
      </form>

    </div>
  );
};

export default AppTax;
