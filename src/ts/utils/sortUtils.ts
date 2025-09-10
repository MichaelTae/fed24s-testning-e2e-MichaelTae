import { IMovie } from '../models/Movie';

export type SortOrder = 'asc' | 'desc' | 'none';

export const sortMoviesByYear = (
  movies: IMovie[],
  order: SortOrder
): IMovie[] => {
  if (order === 'none') {
    return movies;
  }

  return [...movies].sort((a, b) => {
    const yearA = parseInt(a.Year);
    const yearB = parseInt(b.Year);

    if (order === 'asc') {
      return yearA - yearB;
    } else {
      return yearB - yearA;
    }
  });
};
