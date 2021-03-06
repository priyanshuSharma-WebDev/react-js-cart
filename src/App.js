import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import Card from "./components/card";
import Cart from "./components/cart";
// import { Route } from "react-router-dom";
import './App.css';

const options = {
  method: 'GET',
  url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
  params: {
    country: 'asia2',
    lang: 'en',
    currentpage: '0',
    pagesize: '40',
    categories: 'men_all',
    concepts: 'H&M MAN',
  },
  headers: {
    'x-rapidapi-key': 'eee8c93323msh82f01b0cf292754p1e61a0jsn0f1e16d3f021',
    'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
  },
};

function App() {
  const [seed, setSeed] = useState([]);
  const [preloader, setPreloader] = useState(true);
  const [isCart, setIsCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {

    async function getData() {
      try {
        const response = await axios.request(options);
        const { results } = response.data;
        console.log(results);
        results && setPreloader(false);
        setSeed(results);
      } catch (error) {
        console.log('Some nasty errors occur:(', error);
      }
    }
    getData();
  }, []);

  const handleAddToCart = (cartObj) => {
    // console.log(cartObj)
    const checkElement = cartData.find(obj => {
      return obj.code === cartObj.code
    })

    if (checkElement) {
      alert("item is already in cart");
      return;
    }
    else {
      setCartData([...cartData, cartObj]);
    }

  }

  const handleCartClick = (cartState) => {
    console.log(cartState)
    setIsCart(!isCart)
  }

  const removeItemFromCart = (id) => {
    const newArray = cartData.filter(obj => {
      return obj.code !== id;
    })
    setCartData([...newArray]);
    console.log(newArray);
  }

  useEffect(() => {
    setCartCounter(cartData.length);
  }, [cartData, setCartData])

  return (
    <div className="App">
      <Navbar handleCartClick={handleCartClick} cartCounter={cartCounter} />
      {
        preloader ? <div className="preloader"></div> : <div className="app-wrapper">
          {
            isCart ? <Cart cartdata={cartData} removeItemFromCart={removeItemFromCart} /> : <div className="cart-body">
              {
                seed.map(product => {
                  return <Card product={product} key={product.code} handleAddToCart={handleAddToCart} />
                })
              }
            </div>
          }
        </div>
      }
    </div>
  );
}

export default App;
