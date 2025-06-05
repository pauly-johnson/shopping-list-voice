import React, { useState, useEffect } from "react";
import VoiceInput from "./VoiceInput";
import "../src/App.css";

const ShoppingList = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setConfirmAction("delete");
    setShowConfirm(true);
  };

  const handleClearClick = () => {
    setConfirmAction("clear");
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (confirmAction === "delete" && deleteIndex !== null) {
      deleteItem(deleteIndex);
      setDeleteIndex(null);
    } else if (confirmAction === "clear") {
      clearList();
    }
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setConfirmAction(null);
    setDeleteIndex(null);
  };

  return (
    <>
      <div className="shoppingListContainer responsiveContainer">
        <button className="clearListBtn" onClick={handleClearClick}>
          Clear Shopping List
        </button>
        <h2>Shopping List</h2>
        <ul className="shoppingList">
          {items.map((item, index) => (
            <li key={index} className="shoppingListItem">
              <p>{item}</p>
              <button
                className="deleteBtn"
                onClick={() => handleDeleteClick(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {showConfirm && (
          <div className="confirmModal">
            <div className="confirmBox">
              <p>
                {confirmAction === "clear"
                  ? "Are you sure you want to clear the shopping list?"
                  : "Are you sure you want to delete this item?"}
              </p>
              <div className="buttonRow">
                <button className="confirmBtn" onClick={handleConfirm}>
                  Yes
                </button>
                <button className="cancelBtn" onClick={handleCancel}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="blank"></div>
        <div className="inputContainer">
          <input
            type="text"
            value={newItem}
            onChange={handleTextInput}
            onKeyDown={handleKeyDown}
            placeholder="Add new item"
            className="inputField"
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
