import React, { useState, useEffect } from "react";
import VoiceInput from "./VoiceInput";
import "../src/App.css";

const ShoppingList = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
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
    <>
      <div className="shoppingListContainer">
        <button className="clearListBtn" onClick={clearList}>
          Clear Shopping List
        </button>
        <h2>Shopping List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <p>{item}</p>
              <button className="deleteBtn" onClick={() => deleteItem(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="blank"></div>
        <div className="inputContainer">
          <input
            type="text"
            value={newItem}
            onChange={handleTextInput}
            onKeyDown={handleKeyDown}
            placeholder="Add new item"
          />
          <button className="addItemBtn" onClick={handleAddItem}>
            Add Item
          </button>
          <VoiceInput addItem={addItem} />
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
