import { useEffect, useState } from "react";
import { Search } from "lucide-react";

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
    const featured = articles.slice(0, 3); // Top 3 featured
    const nutrition = articles.filter(
      (a) =>
        /nutrition|diet|food|weight|eating|meal|vitamin|protein/i.test(
          a.title + " " + a.description
        )
    );
    const wellness = articles.filter(
      (a) =>
        /wellness|lifestyle|mental|fitness|exercise|yoga|sleep|stress/i.test(
          a.title + " " + a.description
        )
    );
    const studies = articles.filter(
      (a) =>
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

  const { featured, nutrition, wellness, studies } = classifyArticles(
    filteredArticles
  );

  return (
    <div className="p-8 space-y-12">
      <h2 className="text-3xl font-bold mb-6">Health Trends</h2>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Health Trends"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading health news...</p>
      ) : filteredArticles.length === 0 ? (
        <p className="text-gray-400">No matching articles found.</p>
      ) : (
        <>
          <Section title="Featured" articles={featured} highlight />
          <Section title="Nutrition" articles={nutrition} />
          <Section title="Wellness" articles={wellness} />
          <Section title="Health Studies" articles={studies} />
        </>
      )}
    </div>
  );
}

// Vertical Section Component
function Section({ title, articles, highlight = false }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="flex flex-col space-y-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={`${title}-${index}`}
            title={article.title}
            desc={article.description || "No description available."}
            img={article.urlToImage || "https://via.placeholder.com/400x300"}
            url={article.url}
            author={article.author}
            source={article.source?.name}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
}

// Fixed height Article Card
function ArticleCard({ title, desc, img, url, author, source }) {
  return (
    <div className="flex flex-col md:flex-row-reverse bg-[#1e293b] rounded-xl hover:bg-[#334155] transition overflow-hidden shadow-lg h-48 md:h-48">
      {/* Image on the right with padding and fully rounded corners */}
      <div className="flex-shrink-0 md:w-1/3 h-full p-3 flex items-center justify-center">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Text content */}
      <div className="p-4 flex flex-col flex-1 justify-between h-full">
        <div>
          <h4 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h4>
          <p className="text-gray-400 text-sm mb-2 line-clamp-3">{desc}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-2">
            {source && <span>📌 {source}</span>}{" "}
            {author && <span>• ✍️ {author}</span>}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            Read full article →
          </a>
        </div>
      </div>
    </div>
  );
}
