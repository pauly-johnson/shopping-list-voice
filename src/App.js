import React from 'react';
import './App.css';
import ShoppingList from './ShoppingList';

function App() {
  return (
    <div className="App">
      <div className="background-image"></div>
      <header className="App-header">
        <h1 style={{padding: '10px'}}>Welcome</h1>
        <p>Add items to your list using voice or text input.</p>
      </header>
      <ShoppingList />
    </div>
  );
}

export default App;