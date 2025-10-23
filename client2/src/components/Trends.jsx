import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// 🔹 Reusable App Header (same as other pages)
function AppHeader() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#0f172a] shadow">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <svg
          className="w-10 h-10 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <h1 className="text-2xl font-bold text-white">FitTrack</h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex">
        <ul className="flex items-center space-x-8 text-gray-300">
          <li>
            <Link
              to="/overview"
              className="font-semibold text-indigo-400"
              aria-current="page"
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/interactiveworkoutplanner"
              className="hover:text-indigo-400 transition-colors"
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              to="/trends"
              className="hover:text-indigo-400 transition-colors"
            >
              Trends
            </Link>
          </li>
          <li>
            <Link
              to="/clientchat"
              className="hover:text-indigo-400 transition-colors"
            >
              Chat
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


// 🔹 Main Trends Component
export default function Trends() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?category=health&language=en&pageSize=50&apiKey=34c62b78803545129ac776be5bfc48e3`
        );
        const data = await res.json();
        console.log("✅ News API Response:", data);

        if (data.status === "ok") {
          setArticles(data.articles || []);
        } else {
          console.error("❌ News API error:", data);
        }
      } catch (err) {
        console.error("❌ Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const classifyArticles = (articles) => {
    const featured = articles.slice(0, 3);
    const nutrition = articles.filter((a) =>
      /nutrition|diet|food|weight|eating|meal|vitamin|protein/i.test(
        a.title + " " + a.description
      )
    );
    const wellness = articles.filter((a) =>
      /wellness|lifestyle|mental|fitness|exercise|yoga|sleep|stress/i.test(
        a.title + " " + a.description
      )
    );
    const studies = articles.filter((a) =>
      /study|research|scientists|disease|cancer|covid|vaccine|medicine/i.test(
        a.title + " " + a.description
      )
    );

    return { featured, nutrition, wellness, studies };
  };

  const filteredArticles = articles.filter((article) => {
    const title = article.title?.toLowerCase() || "";
    const desc = article.description?.toLowerCase() || "";
    const term = search.toLowerCase();
    return title.includes(term) || desc.includes(term);
  });

  const { featured, nutrition, wellness, studies } =
    classifyArticles(filteredArticles);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <AppHeader />
      <main className="p-8 space-y-12 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-3xl font-bold mb-4 sm:mb-0">Health Trends</h2>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Health Trends"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading health news...</p>
        ) : filteredArticles.length === 0 ? (
          <p className="text-gray-400">No matching articles found.</p>
        ) : (
          <>
            <Section title=" Featured" articles={featured} highlight />
            <Section title=" Nutrition" articles={nutrition} />
            <Section title=" Wellness" articles={wellness} />
            <Section title=" Health Studies" articles={studies} />
          </>
        )}
      </main>
    </div>
  );
}

// 🔹 Section component with subtle separators
function Section({ title, articles, highlight = false }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="space-y-6 border-t border-gray-700 pt-6">
      <h3 className="text-2xl font-semibold text-indigo-300">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={`${title}-${index}`}
            title={article.title}
            desc={article.description || "No description available."}
            img={article.urlToImage || "https://via.placeholder.com/400x300"}
            url={article.url}
            author={article.author}
            source={article.source?.name}
          />
        ))}
      </div>
    </section>
  );
}

// 🔹 Article Card with balanced layout and hover effect
function ArticleCard({ title, desc, img, url, author, source }) {
  return (
    <div className="bg-[#1e293b] rounded-xl hover:bg-[#334155] transition overflow-hidden shadow-md flex flex-col">
      <img
        src={img}
        alt={title}
        className="h-48 w-full object-cover rounded-t-xl"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h4 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h4>
          <p className="text-gray-400 text-sm mb-3 line-clamp-3">{desc}</p>
        </div>
        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span>
            {source && <>📌 {source}</>} {author && <>• ✍️ {author}</>}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}
