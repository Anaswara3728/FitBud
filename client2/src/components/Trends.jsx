import React from "react";
import { Link } from "react-router-dom";

// --- STATIC DATA FOR TRENDS & ARTICLES ---
const fitnessTrends = [
    {
        title: "The Rise of Wearable Technology in Fitness",
        description:
            "From smart rings tracking sleep to advanced watches monitoring HRV, wearable tech is providing deeper insights into recovery and daily activity.",
        urlToImage:
            "https://images.unsplash.com/photo-1579586337278-35d18b068f5b?q=80&w=800&auto=format&fit=crop",
        url: "https://www.forbes.com/health/fitness/best-wearable-fitness-trackers/",
        source: { name: "Forbes Health" },
        author: "Alex Johnson",
    },
    {
        title: "Mindful Movement: Combining Yoga and Pilates",
        description:
            "Hybrid classes combining yoga's flexibility with Pilates' core strength are gaining popularity for a holistic approach to wellness.",
        urlToImage:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        url: "https://www.verywellfit.com/pilates-vs-yoga-which-is-better-for-you-5224888",
        source: { name: "Verywell Fit" },
        author: "Maria Garcia",
    },
];

const nutritionArticles = [
    {
        title: "Understanding Macronutrients: Protein, Carbs, and Fats",
        description:
            "A deep dive into the role of macronutrients in your diet and how to balance them for optimal health and performance.",
        urlToImage:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
        url: "https://www.healthline.com/nutrition/how-to-count-macros",
        source: { name: "Healthline" },
        author: "Dr. Jane Doe",
    },
];

const wellnessArticles = [
    {
        title: "Strength Training for Longevity and Healthspan",
        description:
            "Recent studies highlight the critical role of resistance training for improving metabolic health, bone density, and overall longevity.",
        urlToImage:
            "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=800&auto=format&fit=crop",
        url: "https://www.health.harvard.edu/staying-healthy/strength-training-builds-more-than-muscles",
        source: { name: "Harvard Health" },
        author: "Dr. Emily White",
    },
];

const healthStudies = [
    {
        title: "New Study Links Gut Health to Mental Well-being",
        description:
            "Researchers have found a stronger-than-ever correlation between gut microbiome diversity and mental health outcomes, including anxiety and depression.",
        urlToImage:
            "https://images.unsplash.com/photo-1599059813005-7282b954c33c?q=80&w=800&auto=format&fit=crop",
        url: "https://www.medicalnewstoday.com/articles/gut-bacteria-and-mental-health-whats-the-link",
        source: { name: "Medical News Today" },
        author: "Science Daily",
    },
];

// --- App Header Component ---
const AppHeader = () => (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-gray-700 flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
            <div className="text-2xl">🏋️</div>
            <h1 className="text-2xl font-bold text-white">FitTrack</h1>
        </div>
        <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8 text-gray-300">
                <li>
                    <Link
                        to="/overview"
                        className="hover:text-indigo-400 transition-colors"
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
                        className="font-semibold text-indigo-400"
                        aria-current="page"
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

// --- Trends Page Component ---
function Trends() {
    return (
        <main className="p-4 sm:p-8 space-y-12 bg-gray-900 text-white min-h-full">
            <h2 className="text-3xl font-bold mb-6">Health & Fitness Trends</h2>
            <>
                <Section title="Top Fitness Trends" articles={fitnessTrends} />
                <Section title="Nutrition" articles={nutritionArticles} />
                <Section title="Wellness" articles={wellnessArticles} />
                <Section title="Health Studies" articles={healthStudies} />
            </>
        </main>
    );
}

function Section({ title, articles }) {
    if (!articles || articles.length === 0) return null;
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <div className="flex flex-col space-y-6">
                {articles.map((article, index) => (
                    <ArticleCard
                        key={`${title}-${index}-${article.url}`}
                        article={article}
                    />
                ))}
            </div>
        </div>
    );
}

function ArticleCard({ article }) {
    const { title, description, urlToImage, url, author, source } = article;
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row bg-slate-800 rounded-xl hover:bg-slate-700 transition overflow-hidden shadow-lg group"
        >
            <div className="flex-shrink-0 md:w-1/3 h-48 md:h-auto">
                <img
                    src={
                        urlToImage ||
                        "https://placehold.co/400x300/1e293b/ffffff?text=News"
                    }
                    alt={title || "Article image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/400x300/1e293b/ffffff?text=News";
                    }}
                />
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                        {title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-3">
                        {description || "No description available."}
                    </p>
                </div>
                <div className="mt-4">
                    <p className="text-gray-500 text-xs mb-2">
                        {source?.name && <span>📌 {source.name}</span>}
                        {author && <span> • ✍️ {author}</span>}
                    </p>
                    <span className="text-indigo-400 group-hover:underline text-sm font-semibold">
                        Read full article →
                    </span>
                </div>
            </div>
        </a>
    );
}

// Default export is the combined page layout
export default function TrendsPage() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <AppHeader />
            <Trends />
        </div>
    );
}
