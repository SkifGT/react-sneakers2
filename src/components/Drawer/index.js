import React from 'react';
import axios from 'axios';

import Info from '../Info';
import AppContext from '../../context';

import styles from './Drawer.module.scss'


const delay = (ms) => new Promise((resolve)=> setTimeout(resolve, ms))

function Drawer({onCloseCart, items = [], onRemove, opened}) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);

  const { cartItems, setCartItems } = React.useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, obj)=>obj.price + sum, 0)
  

  const onClickOrder = async () => {
    try {
      setisLoading(true)
      const {data} = await axios.post('https://625484b889f28cf72b5efe79.mockapi.io/orders', {items: cartItems})
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://625484b889f28cf72b5efe79.mockapi.io/cart/`+item.id);
        await delay(500);
      }
      
    } catch (error) {
      alert("Заказ не прошел")
    }
    setisLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ?styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={onCloseCart} className="cu-p" src="img/btn-remove.svg" alt="Close"/>
        </h2>
        {items.length > 0 ? 
          (<div className="d-flex flex-column flex">  
            <div className="items flex">
            {items.map((obj) => (
              <div key = {obj.id} className="cartItem d-flex align-center mb-20">
                <div 
                  style={{backgroundImage: `url(${obj.imageUrl})`}} 
                  className="cartItemImg">
                </div>
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб</b>
                </div>
                <img 
                  className="removeBtn" 
                  onClick={() => onRemove(obj.id)} 
                  src="img/btn-remove.svg" 
                  alt="Remove"
                />
              </div>
            ))}
          </div>
            <div className="cartTotalBlock" >
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб</b>
                </li>
                <li>
                  <span>Налог 8%</span>
                  <div></div>
                  <b>{totalPrice*0.08} руб</b>
                </li>
              </ul>
              <button disabled = {isLoading} onClick = {onClickOrder} className="greenButton">Оформить заказ<img src="img/arrow.svg" alt="Arrow" /></button>
            </div>
          </div> )
        :
        (<Info 
          title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"} 
          description={isOrderComplete ? `Ваш заказ № ${orderId} скоро будет передан курьерской службе` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"} 
          image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg" } 
        />
        )}
      </div>
    </div>
  )
}

export default Drawer