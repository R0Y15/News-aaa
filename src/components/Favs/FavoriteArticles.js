import React, { useEffect, useState } from 'react';
import './favourites.css';

function FavoriteArticles() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleDelete = (articleToDelete) => {
    const updatedFavorites = favorites.filter(article => article.title !== articleToDelete.title);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleClearAll = () => {
    setFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Favourite Articles</h1>
      <div className="divider" />
      <div className="favourites">
        {favorites.length === 0 ? (
          <p className='empty-list'>Add some <a className='links' href='/'>articles</a> to your favourite list</p>
        ) : (
          favorites.map((article, index) => (
            <div key={index} className="favourite-item">
              <h2 className='fav-item-title'>
                {article.title.length > 60 ? `${article.title.substring(0, 60)}...` : article.title}
              </h2>
              <p className='fav-item-desc'>
                {article.description.length > 150 ? `${article.description.substring(0, 100)}...` : article.description}
              </p>
              <a href={article.urlNews} className="read-more">Read more</a>
              <button onClick={() => handleDelete(article)} className="delete-button">Delete</button>
            </div>
          )))}
        {favorites.length > 0 && <button onClick={handleClearAll} className="clear-all-button">Clear All</button>}
      </div>
    </div>
  );
}

export default FavoriteArticles;