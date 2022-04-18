import React from 'react'
import Card from '../components/Card'
import AppContext from '../context';

function Favorites() {
  const { itemsFavorit, onAddToFavorit } = React.useContext(AppContext)

  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h2> Мои закладки </h2>
        </div>
        <div className="d-flex flex-wrap">
        {itemsFavorit
        .map((item, index)=> 
        (<Card
            key={index}
            favorited={true}
            onFavorit = {onAddToFavorit}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites