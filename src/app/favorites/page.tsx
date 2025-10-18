'use client';

import { useState } from 'react';
import { favoritesApi } from '@/services/api';
import { Heart, User, Calendar, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await favoritesApi.getFavorites();
      setFavorites(response.data || []);
    } catch (err) {
      setError('Failed to fetch favorites. Please make sure you are logged in.');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (type: 'post' | 'creator', service: string, creatorId: string, postId?: string) => {
    try {
      if (type === 'post' && postId) {
        await favoritesApi.removePost(service, creatorId, postId);
      } else if (type === 'creator') {
        await favoritesApi.removeCreator(service, creatorId);
      }
      
      // Refresh favorites list
      fetchFavorites();
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your saved posts and creators
          </p>
        </div>
        
        <button
          onClick={fetchFavorites}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Favorites'}
        </button>
      </div>

      {/* Content */}
      {error ? (
        <div className="text-center py-12">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-400 mb-2">
              Authentication Required
            </h3>
            <p className="text-yellow-600 dark:text-yellow-300 mb-4">{error}</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-300">
              Please log in to view and manage your favorites.
            </p>
          </div>
        </div>
      ) : favorites.length === 0 && !loading ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No Favorites Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring posts and creators to add them to your favorites.
          </p>
          <div className="space-y-2">
            <a href="/posts" className="btn-primary inline-block mr-4">
              Browse Posts
            </a>
            <a href="/creators" className="btn-secondary inline-block">
              Discover Creators
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Sample Favorites Display */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Favorite Posts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for favorite posts */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="card group relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-md mb-4"></div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Sample Favorite Post {i}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    This is a placeholder for your favorite posts. Connect to the API to see real data.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <User className="w-3 h-3 mr-1" />
                      <span>Creator Name</span>
                    </div>
                    
                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Creators */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Favorite Creators
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder for favorite creators */}
              {[1, 2].map((i) => (
                <div key={i} className="card text-center group relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Creator {i}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Sample creator description
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mx-auto">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Added recently</span>
                    </div>
                    
                    <button
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
