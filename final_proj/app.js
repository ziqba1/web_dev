import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    deleteDoc
  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "collection", "FAsEfF7okylpOpgFcff4");

async function loadSettings() {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.body.style.backgroundColor = data.color || 'white';
    document.getElementById('display').textContent = data.number || 0;
  } else {
    const defaultData = { color: "white", number: 0 };
    await setDoc(docRef, defaultData);
    document.body.style.backgroundColor = defaultData.color;
    document.getElementById('display').textContent = defaultData.number;
  }
}

// UPDATE
async function updateSettings(key, value) {
  // READ
  const docSnap = await getDoc(docRef);
  const currentData = docSnap.exists() ? docSnap.data() : {};
  const updatedData = { ...currentData, [key]: value };
  // CREATE
  await setDoc(docRef, updatedData);
}

// DELETE
document.getElementById('delete-btn').addEventListener('click', async () => {
  const confirmDelete = confirm("Are you sure you want to delete all settings?");
  if (confirmDelete) {
    try {
      await deleteDoc(docRef);
      document.body.style.backgroundColor = 'white';
      document.getElementById('display').textContent = '0';
      alert("Settings deleted. They will be reset to defaults on next load.");
    } catch (err) {
      console.error("Error deleting settings:", err);
      alert("Failed to delete settings. See console for details.");
    }
  }
});

// Color buttons
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const color = btn.getAttribute('data-color');
    document.body.style.backgroundColor = color;
    await updateSettings('color', color);
  });
});

// Number buttons
document.querySelectorAll('.number-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const number = btn.getAttribute('data-number');
    document.getElementById('display').textContent = number;
    await updateSettings('number', parseInt(number));
  });
});

// Initial load
loadSettings();
