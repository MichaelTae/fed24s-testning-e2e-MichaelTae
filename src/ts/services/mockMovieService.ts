import { IMovie } from '../models/Movie';

export const mockMovieData: IMovie[] = [
  {
    Title: 'The Dark Knight',
    imdbID: 'tt0468569',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    Year: '2008',
  },
  {
    Title: 'Batman Begins',
    imdbID: 'tt0372784',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    Year: '2005',
  },
  {
    Title: 'The Dark Knight Rises',
    imdbID: 'tt1345836',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',
    Year: '2012',
  },
  {
    Title: 'Batman',
    imdbID: 'tt0096895',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
    Year: '1989',
  },
  {
    Title: 'Batman Returns',
    imdbID: 'tt0103776',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg',
    Year: '1992',
  },
  {
    Title: 'Batman Forever',
    imdbID: 'tt0112462',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    Year: '1995',
  },
  {
    Title: 'Batman & Robin',
    imdbID: 'tt0118688',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg',
    Year: '1997',
  },
  {
    Title: 'Justice League',
    imdbID: 'tt0974015',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWVhZjZkYTItOGIwYS00NmRkLWJlYjctMWM0ZjFmMDU4ZjEzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    Year: '2017',
  },
  {
    Title: 'Batman v Superman: Dawn of Justice',
    imdbID: 'tt2975590',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    Year: '2016',
  },
  {
    Title: 'The Batman',
    imdbID: 'tt1877830',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg',
    Year: '2022',
  },
];

export const getMockData = async (searchText: string): Promise<IMovie[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter mock data based on search text
      const filteredData = mockMovieData.filter((movie) =>
        movie.Title.toLowerCase().includes(searchText.toLowerCase())
      );
      resolve(filteredData);
    }, 500);
  });
};
