import React from 'react';
import './App.css';
import ShoppingList from './ShoppingList';

function App() {
  return (
    <div className="App">
      <div className="background-image"></div>
      <header className="App-header">
        <h1 style={{padding: '10px'}}>Welcome to the Shopping List App</h1>
        <p>Add items to your shopping list using voice or text input.</p>
      </header>
      <ShoppingList />
    </div>
  );
}

export default App;