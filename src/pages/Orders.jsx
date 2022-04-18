import React from 'react'
import axios from 'axios';

import Card from '../components/Card'

function Orders() {

const [orders, setOrders] = React.useState([]);
const [isLoading, setIsLoading] = React.useState(true);

React.useEffect(()=>{   
    (async () =>{
      try {
        const { data } = await axios.get('https://625484b889f28cf72b5efe79.mockapi.io/orders');
      setOrders(data.reduce((prev, obj) =>[...prev, ...obj.items], []))
      setIsLoading(false)
      } catch (error) {
        alert('Ошибка загрузки заказов');
        console.error(error);
      }
    })()
  }, [])

  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h2> Мои заказы </h2>
        </div>
        <div className="d-flex flex-wrap">
      {(isLoading ? [...Array(4)] : orders)
      .map((item, index)=> 
      (<Card
          key = { index }
          loading = {isLoading}
          {...item}
        />))}
      </div>
    </div>
  )
}

export default Orders