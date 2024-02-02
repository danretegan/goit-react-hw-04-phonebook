import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-0', name: 'Dan Retegan', number: '+40 753 023 616' },
    { id: 'id-1', name: 'Rosie Simpson', number: '459-123-563' },
    { id: 'id-2', name: 'Hermione Kant', number: '443 (895) 123' },
    { id: 'id-3', name: 'Eden Clements', number: '645-177-799' },
    {
      id: 'id-4',
      name: "Charles de-Batz de Castelmore d'Artagnan",
      number: '+01 227-911-266',
    },
  ]);
  const [filter, setFilter] = useState(''); // Adăugăm un câmp pentru filtrare

  const handleAddContact = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  // Filtrăm contactele în funcție de șirul de căutare:
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      <h2>Contacts:</h2>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
        className={styles.list}
      />
    </div>
  );
};

export default App;
