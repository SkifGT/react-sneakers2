import React from 'react'
import { Link } from "react-router-dom";
import AppContext from '../context';

function Header({onClickCart}) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj)=>obj.price + sum, 0)

  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex allign-center">
        <Link to={process.env.PUBLIC_URL + '/'}>
        <img width={40} height={40} src="img/logo.png" alt="Logo"/>
        <div>
          <h3 className="text-uppercase">React sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
        </Link>
      </div>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img width={18} height={18} src="img/cart.svg" alt="Корзина"/>
          <span>{totalPrice} руб</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to={process.env.PUBLIC_URL + '/favorites'}>
            <img width={18} height={18} src="img/heart.svg" alt="Избранное"/>
          </Link>
        </li>
        <li>
        <Link to={process.env.PUBLIC_URL + '/orders'}>
          <img width={18} height={18} src="img/user.svg" alt="Пользователь"/>
        </Link>  
        </li>
      </ul>
    </header>
  )
}

export default Header