import { useEffect, useState, useMemo } from "react"
import { db } from '../data/db'
import { Guitar, GuitarItem } from "../types";


export default function useCart() {
  // Estado inicial del cart
  function InitialCart(): GuitarItem[] {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(InitialCart)
  const Max_Qantity = 5;
  const Min_Qantity = 1;

  // LocalStorage

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  //agregar al acrrito
  function addToCart(item: Guitar) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0) {
      // validar que no pase de Max_Qantity
      if (cart[itemExist].quantity >= Max_Qantity) return;
      const copyCart = [...cart];
      copyCart[itemExist].quantity++;
      setCart(copyCart);
    } else {
      const NewItem: GuitarItem = { ...item, quantity: 1 }
      setCart([...cart, NewItem])
    }
  }
  // Incrementar Cantidades
  function incrementGuitar(id: Guitar['id']) {
    const increment = cart.map(item => {
      if (item.id === id && item.quantity < Max_Qantity) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item;
    })
    setCart(increment)
  }

  // decrementar Cantidades
  function decrementGuitar(id: Guitar['id']) {
    const decrement = cart.map(item => {
      if (item.id === id && item.quantity > Min_Qantity) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    })
    setCart(decrement)
  }


  // Remover Guitarras
  function removeGuitar(id: Guitar['id']) {

    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }


  // Vaciar Carrito
  function clearCart() {
    setCart([]);
  }

  // state derivados y useMemo para performance
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const totalCart = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);
  return {
    data,
    cart,
    addToCart,
    incrementGuitar,
    decrementGuitar,
    clearCart,
    removeGuitar,
    isEmpty,
    totalCart
  }
}
