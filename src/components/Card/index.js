import React from 'react';
import ContentLoader from "react-content-loader";

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
  id,
  title, 
  price, 
  imageUrl, 
  onPlus, 
  onFavorit, 
  favorited = false, 
  loading = false,}) {

const [isLiked, setIsLiked] = React.useState(favorited);
const { isItemAdded } = React.useContext(AppContext);
const obj = { id, parentId: id, title, imageUrl, price };

const onClickPlus = () => {
  onPlus(obj);
}

const onClickFavorit = () => {
  setIsLiked(!isLiked);
  onFavorit(obj);
}

  return (
    <div className={styles.card}>
      {loading ? ( 
        <ContentLoader 
          speed={0}
          width={160}
          height={265}
          viewBox="0 0 160 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="-4" rx="10" ry="10" width="158" height="150" /> 
          <rect x="0" y="169" rx="5" ry="5" width="158" height="15" /> 
          <rect x="0" y="193" rx="5" ry="5" width="100" height="15" /> 
          <rect x="126" y="228" rx="10" ry="10" width="32" height="32" /> 
          <rect x="0" y="228" rx="5" ry="5" width="80" height="32" />
        </ContentLoader>
      ) : (
        <>{onFavorit && (
          <div className={styles.favorit} onClick={onClickFavorit}>
              <img src={isLiked ? "img/liked.svg" : "img/unliked.svg"} alt="Unliked"/>
          </div>
        )}
          <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b>{price} руб</b>
            </div>
            {onPlus && (
              <img 
                className={styles.plus} 
                onClick={onClickPlus} 
                src={isItemAdded(id) ? 
                  "img/btn-checked.svg" : 
                  "img/btn-plus.svg"} 
                alt= "Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card