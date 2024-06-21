import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Header, card} from "./index";
import { useNavigate } from 'react-router-dom';
import './index.css';


function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;

  const updatenews = async () => {
    try {
      const response = await axios.get(endpointPath(country, category, page));
      setLoading(true);
      const parsedData = response.data;
      // If page > 1, append the new articles to the existing ones
      if (page > 1) {
        setArticles(oldArticles => [...oldArticles, ...parsedData.articles]);
      } else {
        setArticles(parsedData.articles);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreNews = () => {
    // Increment the page counter and fetch the next set of articles
    setPage(oldPage => oldPage + 1);
  };

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          <div className="divider" />
          <div className="news-container">
            <Row>
              {articles.map((element) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source.name}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.image === null ? NullImage : element.image
                      }
                      urlNews={element.url}
                    />
                  </Col>
                );
              })}
            </Row>
            <button className="more-btn" onClick={loadMoreNews}>Load More</button>
            <button className="favourites-btn" onClick={() => navigate('/favs')} >Favourites</button>
          </div>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
