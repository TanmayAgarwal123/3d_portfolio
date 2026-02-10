import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GitHubActivity = ({ username = 'TanmayAgarwal123' }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <p className="text-slate-400 text-sm">Loading GitHub activity...</p>;
  if (!repos.length) return null;

  return (
    <div className="py-10">
      <h3 className="subhead-text dark:text-white mb-8">Recent GitHub Activity</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="block p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700"
          >
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 truncate">{repo.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {repo.description || 'No description'}
            </p>
            <div className="flex gap-4 mt-3 text-xs text-slate-400">
              {repo.language && <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                {repo.language}
              </span>}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default GitHubActivity;
