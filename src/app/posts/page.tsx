'use client';

import { useState, useEffect } from 'react';
import { postsApi, Post } from '@/services/api';
import { Star, Clock, User, MessageCircle } from 'lucide-react';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'popular' | 'random'>('popular');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = filter === 'popular' 
        ? await postsApi.getPopular()
        : await postsApi.getRandom();
      
      setPosts(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError('Failed to fetch posts. The API might be unavailable.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and browse content from creators
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('popular')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === 'popular'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Star className="w-4 h-4 inline mr-2" />
            Popular
          </button>
          <button
            onClick={() => setFilter('random')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              filter === 'random'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Random
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">
              Error Loading Posts
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={post.id || index} className="card hover:shadow-lg transition-shadow">
              {/* Post Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-md mb-4 flex items-center justify-center">
                {post.file ? (
                  <img
                    src={`https://kemono.party/thumbnail/${post.file.path}`}
                    alt={post.title || 'Post thumbnail'}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {post.title || 'Untitled Post'}
                </h3>
                
                {post.content && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>{post.user || 'Unknown'}</span>
                  </div>
                  
                  {post.published && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(post.published)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-2 py-1 rounded">
                    {post.service || 'Unknown Service'}
                  </span>
                  
                  {post.attachments && post.attachments.length > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.attachments.length} attachment{post.attachments.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
