import React, { useEffect, useState } from "react";
import { fetchTrends } from "./api/trends";
import "./Trends.css";

const Trends = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchTrends().then(data => setArticles(data));
  }, []);

  const grouped = articles.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="trends-page">
      <header className="trends-header">
        <h2>Trends</h2>
        <input type="text" placeholder="Search for articles" className="search-bar" />
      </header>

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
              <img src={article.image} alt={article.title} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Trends;
