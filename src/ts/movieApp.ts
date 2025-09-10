import { IMovie } from './models/Movie';
import { getData } from './services/movieService';
import { sortMoviesByYear, SortOrder } from './utils/sortUtils';

let movies: IMovie[] = [];
let currentSortOrder: SortOrder = 'none';

export const init = () => {
  let form = document.getElementById('searchForm') as HTMLFormElement;
  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  });

  // Add event listener for sort button
  let sortButton = document.getElementById('sortButton') as HTMLButtonElement;
  sortButton.addEventListener('click', handleSort);
};

export async function handleSubmit() {
  let searchText = (document.getElementById('searchText') as HTMLInputElement)
    .value;

  let container: HTMLDivElement = document.getElementById(
    'movie-container'
  ) as HTMLDivElement;
  container.innerHTML = '';

  try {
    movies = await getData(searchText);
    // Reset sort order when new search is performed
    currentSortOrder = 'none';
    updateSortButtonText();

    if (movies.length > 0) {
      createHtml(movies, container);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
}

export function handleSort() {
  if (movies.length === 0) return;

  // Cycle through sort orders: none -> asc -> desc -> none
  switch (currentSortOrder) {
    case 'none':
      currentSortOrder = 'asc';
      break;
    case 'asc':
      currentSortOrder = 'desc';
      break;
    case 'desc':
      currentSortOrder = 'none';
      break;
  }

  updateSortButtonText();
  displaySortedMovies();
}

function updateSortButtonText() {
  let sortButton = document.getElementById('sortButton') as HTMLButtonElement;
  switch (currentSortOrder) {
    case 'none':
      sortButton.textContent = 'Sortera efter år';
      break;
    case 'asc':
      sortButton.textContent = 'År (äldst först) ↑';
      break;
    case 'desc':
      sortButton.textContent = 'År (nyast först) ↓';
      break;
  }
}

function displaySortedMovies() {
  let container: HTMLDivElement = document.getElementById(
    'movie-container'
  ) as HTMLDivElement;
  container.innerHTML = '';

  const sortedMovies = sortMoviesByYear(movies, currentSortOrder);
  createHtml(sortedMovies, container);
}

export const createHtml = (movies: IMovie[], container: HTMLDivElement) => {
  for (let i = 0; i < movies.length; i++) {
    let movie = document.createElement('div');
    let title = document.createElement('h3');
    let year = document.createElement('p');
    let img = document.createElement('img');

    movie.classList.add('movie');
    title.innerHTML = movies[i].Title;
    year.innerHTML = `Year: ${movies[i].Year}`;
    year.classList.add('movie-year');
    img.src = movies[i].Poster;
    img.alt = movies[i].Title;

    movie.appendChild(title);
    movie.appendChild(year);
    movie.appendChild(img);

    container.appendChild(movie);
  }
};

export const displayNoResult = (container: HTMLDivElement) => {
  let noMessage = document.createElement('p');

  noMessage.innerHTML = 'Inga sökresultat att visa';

  container.appendChild(noMessage);
};
