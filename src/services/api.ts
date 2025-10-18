import axios from 'axios';

const API_BASE_URL = 'https://kemono.cr/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Post {
  id: string;
  title: string;
  content: string;
  service: string;
  user: string;
  published: string;
  edited?: string;
  file?: {
    name: string;
    path: string;
  };
  attachments?: Array<{
    name: string;
    path: string;
  }>;
}

export interface Creator {
  id: string;
  name: string;
  service: string;
  public_id: string;
  favorited: number;
  indexed: string;
  updated: string;
}

export interface Comment {
  id: string;
  parent_id?: string;
  content: string;
  commenter: string;
  published: string;
}

// Posts API
export const postsApi = {
  getRandom: () => api.get('/v1/posts/random'),
  getPopular: () => api.get('/v1/posts/popular'),
  getTags: () => api.get('/v1/posts/tags'),
  getPost: (service: string, postId: string) => 
    api.get(`/v1/${service}/post/${postId}`),
  getComments: (service: string, creatorId: string, postId: string) =>
    api.get(`/v1/${service}/user/${creatorId}/post/${postId}/comments`),
  flagPost: (service: string, creatorId: string, postId: string) =>
    api.post(`/v1/${service}/user/${creatorId}/post/${postId}/flag`),
  checkFlag: (service: string, creatorId: string, postId: string) =>
    api.get(`/v1/${service}/user/${creatorId}/post/${postId}/flag`),
};

// Creators API
export const creatorsApi = {
  getRandom: () => api.get('/v1/artists/random'),
  getPosts: (service: string, creatorId: string) =>
    api.get(`/v1/${service}/user/${creatorId}/posts`),
  getLinks: (service: string, creatorId: string) =>
    api.get(`/v1/${service}/user/${creatorId}/links/new`),
  getShares: (service: string, creatorId: string) =>
    api.get(`/v1/${service}/user/${creatorId}/shares`),
  getDMs: (service: string, creatorId: string) =>
    api.get(`/v1/${service}/user/${creatorId}/dms`),
};

// Favorites API
export const favoritesApi = {
  getFavorites: () => api.get('/v1/account/favorites'),
  addPost: (service: string, creatorId: string, postId: string) =>
    api.post(`/v1/favorites/post/${service}/${creatorId}/${postId}`),
  removePost: (service: string, creatorId: string, postId: string) =>
    api.delete(`/v1/favorites/post/${service}/${creatorId}/${postId}`),
  addCreator: (service: string, creatorId: string) =>
    api.post(`/v1/favorites/creator/${service}/${creatorId}`),
  removeCreator: (service: string, creatorId: string) =>
    api.delete(`/v1/favorites/creator/${service}/${creatorId}`),
};

// Discord API
export const discordApi = {
  getChannelPosts: (channelId: string) =>
    api.get(`/v1/discord/channel/${channelId}`),
  lookupChannels: (discordServer: string) =>
    api.get(`/v1/discord/channel/lookup/${discordServer}`),
};

// File Search API
export const fileApi = {
  searchByHash: (fileHash: string) =>
    api.get(`/v1/search_hash/${fileHash}`),
  getFile: (fileHash: string) =>
    api.get(`/v2/file/${fileHash}`),
};

// Authentication API
export const authApi = {
  register: (userData: any) =>
    api.post('/v1/authentication/register', userData),
  login: (credentials: any) =>
    api.post('/v1/authentication/login', credentials),
  logout: () =>
    api.post('/v1/authentication/logout'),
};

// Account API
export const accountApi = {
  getAccount: () => api.get('/v1/account'),
  changePassword: (passwordData: any) =>
    api.post('/v1/account/change_password', passwordData),
  getNotifications: () => api.get('/v1/account/notifications'),
  getKeys: () => api.get('/v1/account/keys'),
  createKey: (keyData: any) => api.post('/v1/account/keys', keyData),
};

// Misc API
export const miscApi = {
  getAppVersion: () => api.get('/v1/app_version'),
  getShares: () => api.get('/v1/shares'),
  getShare: (shareId: string) => api.get(`/v1/share/${shareId}`),
  getDMs: () => api.get('/v1/dms'),
  hasPendingDMs: () => api.get('/v1/has_pending_dms'),
};

export default api;
