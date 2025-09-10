import { IOmdbResponse } from './../models/IOmdbResponse';
import { IMovie } from './../models/Movie';
import { getMockData } from './mockMovieService';
import axios from 'axios';

// Environment flag to use mock data (can be set via URL param or environment)
const USE_MOCK_DATA = window.location.search.includes('mock=true') || false;

export const getData = async (searchText: string): Promise<IMovie[]> => {
  if (USE_MOCK_DATA) {
    return getMockData(searchText);
  }

  return axios
    .get<IOmdbResponse>('http://omdbapi.com/?apikey=416ed51a&s=' + searchText)
    .then((data) => {
      console.log(data.data.Search);
      return data.data.Search || [];
    })
    .catch(() => {
      return [];
    });
};
