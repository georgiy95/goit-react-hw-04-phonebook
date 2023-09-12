import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const CONTACTS = 'contacts';

const initialContacts = [
  { id: nanoid(), name: 'Armin van Buuren', number: '452-11-44' },
  { id: nanoid(), name: 'Tiësto', number: '443-89-12' },
  { id: nanoid(), name: 'Above & Beyond', number: '545-37-79' },
  { id: nanoid(), name: 'Dash Berlin', number: '237-91-23' },
  { id: nanoid(), name: 'Markus Schulz', number: '216-68-97' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = evt => {
    setFilter(evt.currentTarget.value);
  };

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is alredy in contacts`);
    } else {
      setContacts(old => {
        const list = [...old];
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return list;
      });
    }
  };

  const filterFu = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const delContact = id => {
    const filtred = contacts.filter(item => item.id !== id);
    setContacts(filtred);
  };

  return (
    <div className={css.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} /> <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} onChangeInput={onChangeInput} />
          <ContactList delContact={delContact} contacts={filterFu()} />
        </>
      ) : (
        <p>No contacts yet.</p>
      )}
    </div>
  );
};
