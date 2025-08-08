import React, { useEffect, useState } from "react";
import { fetchTrends } from "./api/trends";
import "./Trends.css";
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

  useEffect(() => {
    fetchTrends().then(data => setArticles(data));
  }, []);

  // Filter articles by search text
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.summary.toLowerCase().includes(search.toLowerCase()) ||
    article.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group filtered articles by category
  const grouped = filteredArticles.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="trends-page">
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
              <img src={imageMap[article.image] || article.image} alt={article.title} />

            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Trends;
