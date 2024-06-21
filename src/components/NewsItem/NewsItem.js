import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Details from "./Details/Details";
import { ReactComponent as ArrowIcon } from '../Images/ArrowIcon.svg';
import "./NewsItem.css";

function NewsItem(props) {
  const { imageUrl, alt, description, title, channel, published, urlNews } =
    props;

  const [fav, setFav] = useState('/star.png');

  const handleFavoriteClick = () => {
    let favorites = localStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];
    const newFavorite = { title, description, published, channel, imageUrl, urlNews };
  
    // Check if the article is already a favourite
    const isFavourite = favorites.some(favorite => favorite.title === newFavorite.title);
  
    if (isFavourite) {
      // If the article is a favourite, remove it from the favourites list
      favorites = favorites.filter(favorite => favorite.title !== newFavorite.title);
      setFav("/star.png");
    } else {
      // If the article is not a favourite, add it to the favourites list
      favorites.push(newFavorite);
      setFav("/star2.png");
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <Card className="card">
      <div className="fav" onClick={handleFavoriteClick} style={{ position: 'absolute', top: '0', right: '0' }}>
        <img src={fav} className="fav-icon" alt="fav-img" height="100" width="100" />
      </div>
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Details channel={channel} published={published} />
        <Button
          className="card-btn"
          href={urlNews}
          target="_blank"
        >
          Read more <ArrowIcon className="arrow-icon" />
        </Button>
      </Card.Body>
    </Card>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
};

export default NewsItem;
