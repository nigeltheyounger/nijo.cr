import Link from 'next/link'
import { Heart, Search, User, Home, Star } from 'lucide-react'

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Kemono Content Browser
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Modern interface for browsing and discovering content
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/posts" className="card hover:scale-105 transform transition-transform">
          <div className="flex items-center space-x-3">
            <Home className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Browse Posts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explore latest posts</p>
            </div>
          </div>
        </Link>

        <Link href="/creators" className="card hover:scale-105 transform transition-transform">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Creators</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Find your favorite creators</p>
            </div>
          </div>
        </Link>

        <Link href="/favorites" className="card hover:scale-105 transform transition-transform">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Favorites</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your saved content</p>
            </div>
          </div>
        </Link>

        <Link href="/search" className="card hover:scale-105 transform transition-transform">
          <div className="flex items-center space-x-3">
            <Search className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Search</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Find specific content</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Popular Posts Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Posts</h2>
          <Link href="/posts/popular" className="text-primary-600 hover:text-primary-700 font-medium">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards - will be populated with actual data */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Loading...</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fetching popular content...</p>
              <div className="flex items-center mt-3 space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Popular</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
