'use client';

import { useState, useEffect } from 'react';
import { creatorsApi, Creator } from '@/services/api';
import { User, Calendar, Star, ExternalLink } from 'lucide-react';

export default function CreatorsPage() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomCreator = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await creatorsApi.getRandom();
      setCreator(response.data);
    } catch (err) {
      setError('Failed to fetch creator. The API might be unavailable.');
      console.error('Error fetching creator:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCreator();
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Creators</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and follow your favorite content creators
          </p>
        </div>
        
        <button
          onClick={fetchRandomCreator}
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Random Creator'}
        </button>
      </div>

      {/* Content */}
      {loading && !creator ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">
              Error Loading Creator
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button
              onClick={fetchRandomCreator}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : creator ? (
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            {/* Creator Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>

            {/* Creator Info */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {creator.name || 'Unknown Creator'}
            </h2>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-sm bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-3 py-1 rounded-full">
                {creator.service || 'Unknown Service'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary-600">{creator.favorited || 0}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
                  <Star className="w-3 h-3 mr-1" />
                  Favorites
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary-600">
                  {creator.indexed ? formatDate(creator.indexed) : 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Indexed
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary-600">
                  {creator.updated ? formatDate(creator.updated) : 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Updated
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary flex items-center justify-center">
                <Star className="w-4 h-4 mr-2" />
                Add to Favorites
              </button>
              
              <button className="btn-secondary flex items-center justify-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Posts
              </button>
            </div>

            {creator.public_id && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ID: <span className="font-mono">{creator.public_id}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No creator data available.
          </p>
          <button
            onClick={fetchRandomCreator}
            className="btn-primary"
          >
            Load Random Creator
          </button>
        </div>
      )}
    </div>
  );
}
