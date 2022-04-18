import React from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";

import AppContext from './context';
import Home from './pages/Home';
import Header from './components/Header'
import Drawer from './components/Drawer'
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [itemsFavorit, setItemsFavorit] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading]  = React.useState(true);

  React.useEffect(()=>{
    async function fetchData() {
      try { const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
      axios.get('https://625484b889f28cf72b5efe79.mockapi.io/cart'),
      axios.get('https://625484b889f28cf72b5efe79.mockapi.io/favorit'),
      axios.get('https://625484b889f28cf72b5efe79.mockapi.io/items')]);
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setItemsFavorit(favoritesResponse.data);
      setItems(itemsResponse.data);
      
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.log(error);
      }
    }
    fetchData()
  }, [])
  
  const onAddToCart = async (obj)=> {
    try {
      const findItems = cartItems.find((item) =>  Number(item.parentId) === Number(obj.id));
      if (findItems) {
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://625484b889f28cf72b5efe79.mockapi.io/cart/${findItems.id}`);
      } else {
        setCartItems(prev =>[...prev, obj])
        const { data } = await axios.post('https://625484b889f28cf72b5efe79.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
    }
  } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  }

  const onAddToFavorit = async (obj)=>{
    try {
      if (itemsFavorit.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://625484b889f28cf72b5efe79.mockapi.io/favorit/${obj.id}`);
        setItemsFavorit((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://625484b889f28cf72b5efe79.mockapi.io/favorit', obj);
        setItemsFavorit(prev =>[...prev, data])
    }
  } catch (error) {
      alert('Не удалось добавить в избранное');
      console.error(error);
    }
    }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://625484b889f28cf72b5efe79.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
    
  }

  const onChangeSearhInput = (event)=>{
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id)=>{
    return cartItems.some((obj)=>Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items, 
      cartItems, 
      itemsFavorit, 
      isItemAdded, 
      onAddToFavorit,
      onAddToCart,
      setCartOpened, 
      setCartItems }}>
      <div className="wrapper clear">
        <Drawer 
          items = {cartItems} 
          onCloseCart = {() => setCartOpened(false)} 
          onRemove = {onRemoveItem}
          opened = {cartOpened}
        />
        <Header onClickCart = {() => setCartOpened(true)}/>
        <Routes>
          <Route path={process.env.PUBLIC_URL + '/favorites'} element = {<Favorites/>}></Route>
          <Route path={process.env.PUBLIC_URL + '/orders'} element = {<Orders/>}></Route>
          <Route path={process.env.PUBLIC_URL + '/'} element = {
            <Home 
                cartItems ={cartItems}
                items={items} 
                searchValue={searchValue} 
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorit={onAddToFavorit}
                onChangeSearhInput={onChangeSearhInput}
                isLoading={isLoading}
              />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
