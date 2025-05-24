
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFymnPlSaRcnbHbADAV9aqp3ZOuGA6N0c",
  authDomain: "webdevfinal-3f5e4.firebaseapp.com",
  projectId: "webdevfinal-3f5e4",
  storageBucket: "webdevfinal-3f5e4.firebasestorage.app",
  messagingSenderId: "536845210115",
  appId: "1:536845210115:web:1d8a94ac5ec3ecc65a7436"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "collection", "FAsEfF7okylpOpgFcff4");

export default function App() {
  const [color, setColor] = useState("white");
  const [number, setNumber] = useState(0);

  // Load settings (create default if not found)
  useEffect(() => {
    async function loadSettings() {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setColor(data.color || "white");
          setNumber(data.number || 0);
        } else {
          const defaultData = { color: "white", number: 0 };
          await setDoc(docRef, defaultData);
          setColor(defaultData.color);
          setNumber(defaultData.number);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
    loadSettings();
  }, []);

  async function updateSettings(key, value) {
    try {
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() : {};
      const updatedData = { ...currentData, [key]: value };
      await setDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  }

  // Color buttons
  async function handleColorClick(selectedColor) {
    setColor(selectedColor);
    await updateSettings("color", selectedColor);
  }

  // Number buttons
  async function handleNumberClick(selectedNumber) {
    setNumber(selectedNumber);
    await updateSettings("number", selectedNumber);
  }

  // Delete button
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all settings?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(docRef);
        setColor("white");
        setNumber(0);
        alert("Settings deleted. They will be reset to defaults on next load.");
      } catch (error) {
        console.error("Error deleting settings:", error);
        alert("Failed to delete settings. See console for details.");
      }
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        textAlign: "center",
        backgroundColor: color,
        color: "black",
        transition: "background-color 0.3s ease",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <h1 style={{ fontSize: "5rem", marginTop: 0 }}>{number}</h1>

      <div style={{ margin: "20px" }}>
        {["gold", "silver", "crimson", "green", "blue"].map((col) => (
          <button
            key={col}
            onClick={() => handleColorClick(col)}
            style={{
              backgroundColor: col,
              color: "black",
              padding: "15px 25px",
              margin: "5px",
              fontSize: "25px",
              cursor: "pointer",
              border: "2px solid black",
              borderRadius: "10px",
            }}
            className="color-btn"
            data-color={col}
          >
            {col.charAt(0).toUpperCase() + col.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ margin: "20px" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            style={{
              padding: "15px 25px",
              margin: "5px",
              fontSize: "25px",
              cursor: "pointer",
              border: "1px solid black",
              borderRadius: "5px",
            }}
            className="number-btn"
            data-number={num}
          >
            {num}
          </button>
        ))}
      </div>

      <div style={{ margin: "20px" }}>
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "purple",
            color: "white",
            border: "2px solid black",
            borderRadius: "8px",
            padding: "15px 25px",
            cursor: "pointer",
            fontSize: "25px",
          }}
          id="delete-btn"
        >
          Delete/Clear
        </button>
      </div>
    </div>
  );
}
