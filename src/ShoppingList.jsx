import React, { useState } from 'react';
import VoiceInput from './VoiceInput';

const ShoppingList = () => {
  const [items, setItems] = useState(['Milk', 'Bread', 'Eggs']); // Example items
  const [newItem, setNewItem] = useState('');

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const handleTextInput = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      addItem(newItem);
      setNewItem('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={handleTextInput}
          onKeyDown={handleKeyDown}
          placeholder="Add new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <VoiceInput addItem={addItem} />
    </div>
  );
};

export default ShoppingList;