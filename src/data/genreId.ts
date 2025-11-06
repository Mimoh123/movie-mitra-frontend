
// Genre ID to Name Mapping
export const genreIdToName: Record<number, string> = {
 28: 'Action',
 12: 'Adventure',
 16: 'Animation',
 35: 'Comedy',
 80: 'Crime',
 99: 'Documentary',
 18: 'Drama',
 10751: 'Family',
 14: 'Fantasy',
 36: 'History',
 27: 'Horror',
 10402: 'Music',
 9648: 'Mystery',
 10749: 'Romance',
 878: 'Science Fiction',
 10770: 'TV Movie',
 53: 'Thriller',
 10752: 'War',
 37: 'Western',
 10765: 'TV Movie',
};

// Helper function to get genre name from ID
export const getGenreName = (genreId: number): string => {
 return genreIdToName[genreId] || 'Unknown';
};

export const ActionAdventure = [28, 12];
export const DramaRomance = [18, 10749];
export const ComedyFun = [35];
export const ThrillerMystery = [53, 9648];
export const SciFiFantasy = [878, 14];
export const Animation = [16];
export const Family = [10751];
export const Fantasy = [14];
export const History = [36];
export const Horror = [27];
export const Music = [10402];
export const Mystery = [9648];
export const Romance = [10749];
export const ScienceFiction = [878];
export const TVMovie = [10765];