import React from 'react'

import Card from '../components/Card'

function Home({
    items,
    searchValue,
    setSearchValue,
    onAddToCart,
    onAddToFavorit,
    onChangeSearhInput,
    isLoading,
}) {


  const renderItems = () => {
  const filteredItems = items.filter((item)=>
  item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
return (isLoading ? [...Array(10)] : filteredItems).map((item, index)=> (
    <Card
      key = { index }
      onFavorit = { (obj)=>onAddToFavorit(obj) }
      onPlus = { (obj)=>onAddToCart(obj) }
      loading = {isLoading}
      {...item}
    />
    ));
    
};

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img width={18} height={18} src="img/search.svg" alt="Search"/>
          {searchValue && (
          <img 
          onClick = {()=> setSearchValue('')} 
          className="clear cu-p" 
          src="img/btn-remove.svg" 
          alt="Clear"/>
          )}
          <input onChange={onChangeSearhInput} value = {searchValue} placeholder="Поиск..."/>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home