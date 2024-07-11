import React, { useState } from 'react'

import './App.css';
import GenericModal from './components/modal';
import Header from './components/header';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import FilterMenu from './components/FilterMenu';

function App() {

  const [shown, setShown] = useState(false)

  const toggleModal = () => setShown(prev => !prev)

  return (
    <div className="App">
      <Header />
      <div id="content" className="content" >
        <FilterMenu toggleModal={toggleModal} />
        <UserTable />
        <GenericModal displayModal={shown} closeModal={toggleModal}>
            <UserForm onSave={toggleModal} />
         </GenericModal>
      </div>
    </div>
  );
}

export default App;
