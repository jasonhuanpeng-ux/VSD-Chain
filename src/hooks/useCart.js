import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'chain_inquiry_cart';

let cartState = [];
let listeners = new Set();
let snapshot = null;

function notifyListeners() {
  listeners.forEach(listener => listener());
}

function getSnapshot() {
  return snapshot;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readCartFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function writeCartToStorage(nextCart) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
  } catch (e) {
    // Storage write failed
  }
}

function initializeCart() {
  cartState = readCartFromStorage();
  snapshot = Object.freeze([...cartState]);
}

export function useCart() {
  if (!snapshot) {
    initializeCart();
  }

  const currentSnapshot = useSyncExternalStore(subscribe, getSnapshot);

  const addToCart = (product) => {
    const existingItem = cartState.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + (product.quantity || 1);
    } else {
      cartState.push({ ...product, quantity: product.quantity || 1 });
    }
    snapshot = Object.freeze([...cartState]);
    writeCartToStorage(cartState);
    notifyListeners();
  };

  const removeFromCart = (productId) => {
    cartState = cartState.filter(item => item.id !== productId);
    snapshot = Object.freeze([...cartState]);
    writeCartToStorage(cartState);
    notifyListeners();
  };

  const updateQuantity = (productId, quantity) => {
    const item = cartState.find(i => i.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      snapshot = Object.freeze([...cartState]);
      writeCartToStorage(cartState);
      notifyListeners();
    }
  };

  const clearCart = () => {
    cartState = [];
    snapshot = Object.freeze([]);
    writeCartToStorage([]);
    notifyListeners();
  };

  return {
    cart: currentSnapshot,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
