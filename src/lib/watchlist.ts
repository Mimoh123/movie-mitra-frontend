import type { Movie } from '@/types';

const WATCHLIST_KEY = 'movie-mitra:watchlist';

function readRaw(): Movie[] {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Movie[];
  } catch (e) {
    console.error('failed to read watchlist:', e);
    return [];
  }
}

export function getWatchlist(): Movie[] {
  return readRaw();
}

export function saveWatchlist(list: Movie[]) {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('failed to save watchlist:', e);
  }
}

export function isInWatchlist(movieId: string) {
  return readRaw().some((m) => String(m.id) === String(movieId));
}

export function addToWatchlist(movie: Movie) {
  if (!movie || !movie.id) return getWatchlist();
  const list = readRaw();
  const exists = list.some((m) => String(m.id) === String(movie.id));
  if (exists) return list;
  const next = [...list, movie];
  saveWatchlist(next);
  return next;
}

export function removeFromWatchlist(movieId: string) {
  const next = readRaw().filter((m) => String(m.id) !== String(movieId));
  saveWatchlist(next);
  return next;
}

export function toggleWatchlist(movie: Movie) {
  if (!movie || !movie.id) return getWatchlist();
  if (isInWatchlist(String(movie.id))) {
    removeFromWatchlist(String(movie.id));
  } else {
    addToWatchlist(movie);
  }
  return getWatchlist();
}

export default {
  getWatchlist,
  saveWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  toggleWatchlist,
};
