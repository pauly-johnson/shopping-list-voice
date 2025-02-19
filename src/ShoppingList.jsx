import React, { useState, useEffect } from "react";
import VoiceInput from "./VoiceInput";

const ShoppingList = () => {
  const [items, setItems] = useState(() => {
    // Load items from localStorage
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : ["Add Item"];
  });
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    // Save items to localStorage whenever the items state changes
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const clearList = () => {
    setItems([]);
    localStorage.removeItem("shoppingList");
  };

  const handleTextInput = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      addItem(newItem);
      setNewItem("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div>
          <button onClick={clearList}>Clear Shopping List</button>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
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