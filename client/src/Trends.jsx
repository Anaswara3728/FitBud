import React, { useEffect, useState } from "react";
import { fetchTrends } from "./api/trends";
import "./Trends.css";
<<<<<<< HEAD

const Trends = () => {
  const [articles, setArticles] = useState([]);
=======
import { FaSearch } from "react-icons/fa";
import sleepImg from "./assets/sleep.jpg"
import nutritionImg from "./assets/nutrition.jpeg"
import waterImg from "./assets/hydration.jpeg"
import stressImg from "./assets/stress.jpeg";
import growthImg from "./assets/growth.png";
import brainImg from "./assets/brain.jpg";      
import gutImg from "./assets/gut.png";   
import Header from "./components/Header";  




const imageMap = {
  "sleep.jpg": sleepImg,
  "nutrition.jpeg": nutritionImg,
  "hydration.jpeg": waterImg,
  "stress.jpeg": stressImg,
  "growth.png": growthImg,
  "brain.jpg": brainImg,        
  "gut.png": gutImg
};

const Trends = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
>>>>>>> 947ea482a17592179ef7ad2654a9ae625b81fc6f

  useEffect(() => {
    fetchTrends().then(data => setArticles(data));
  }, []);

<<<<<<< HEAD
  const grouped = articles.reduce((acc, item) => {
=======
  // Filter articles by search text
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.summary.toLowerCase().includes(search.toLowerCase()) ||
    article.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group filtered articles by category
  const grouped = filteredArticles.reduce((acc, item) => {
>>>>>>> 947ea482a17592179ef7ad2654a9ae625b81fc6f
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="trends-page">
<<<<<<< HEAD
      <header className="trends-header">
        <h2>Trends</h2>
        <input type="text" placeholder="Search for articles" className="search-bar" />
      </header>
=======
      <Header/>
      <div className="trends-header">
        <h2>Trends</h2>
        <div className="search-container">
          <span className="search-icon"><FaSearch /></span>
          <input
            type="text"
            placeholder="Search for articles"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {Object.keys(grouped).length === 0 && <p>No results found.</p>}
>>>>>>> 947ea482a17592179ef7ad2654a9ae625b81fc6f

      {Object.keys(grouped).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          {grouped[category].map(article => (
            <div className="trend-article" key={article.id}>
              <div>
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
                {article.time && <span>{article.time}</span>}
              </div>
<<<<<<< HEAD
              <img src={article.image} alt={article.title} />
=======
              <img src={imageMap[article.image] || article.image} alt={article.title} />

>>>>>>> 947ea482a17592179ef7ad2654a9ae625b81fc6f
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Trends;
