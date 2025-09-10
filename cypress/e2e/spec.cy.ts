describe('Movie Search and Sort Application', () => {
  beforeEach(() => {
    // Use mock data
    cy.visit('/?mock=true');
  });

  it('should display the search form and sort button', () => {
    cy.get('#searchText').should('be.visible');
    cy.get('#search').should('be.visible');
    cy.get('#sortButton')
      .should('be.visible')
      .and('contain.text', 'Sortera efter år');
  });

  it('should successfully search for movies and display results with years', () => {
    cy.get('#searchText').type('Batman');
    cy.get('#search').click();

    cy.get('#movie-container').should('be.visible');
    cy.get('.movie').should('have.length.greaterThan', 0);

    cy.get('.movie h3').should('contain.text', 'Batman');
    cy.get('.movie-year').should('be.visible');
    cy.get('.movie-year').first().should('contain.text', 'Year:');
  });

  it('should sort movies by year in ascending order', () => {
    // Search for Batman movies
    cy.get('#searchText').type('Batman');
    cy.get('#search').click();

    cy.get('.movie').should('have.length.greaterThan', 1);

    // Click sort button once (should sort ascending)
    cy.get('#sortButton').click();
    cy.get('#sortButton').should('contain.text', 'År (äldst först) ↑');

    // Verify movies are sorted by year ascending
    cy.get('.movie-year').then(($years) => {
      const years = Array.from($years).map((el) =>
        parseInt(el.textContent!.replace('Year: ', ''))
      );

      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).to.be.at.most(years[i + 1]);
      }
    });
  });

  it('should sort movies by year in descending order', () => {
    // Search for Batman movies
    cy.get('#searchText').type('Batman');
    cy.get('#search').click();

    cy.get('.movie').should('have.length.greaterThan', 1);

    // Click sort button twice (should sort descending)
    cy.get('#sortButton').click();
    cy.get('#sortButton').click();
    cy.get('#sortButton').should('contain.text', 'År (nyast först) ↓');

    // Verify movies are sorted by year descending
    cy.get('.movie-year').then(($years) => {
      const years = Array.from($years).map((el) =>
        parseInt(el.textContent!.replace('Year: ', ''))
      );

      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).to.be.at.least(years[i + 1]);
      }
    });
  });

  it('should reset to no sorting when clicked three times', () => {
    // Search for Batman movies
    cy.get('#searchText').type('Batman');
    cy.get('#search').click();

    cy.get('.movie').should('have.length.greaterThan', 1);

    cy.get('.movie h3').then(($titles) => {
      const originalTitles = Array.from($titles).map((el) => el.textContent);

      // Click sort button three times (should return to original order)
      cy.get('#sortButton').click(); // ascending
      cy.get('#sortButton').click(); // descending
      cy.get('#sortButton').click(); // no sort
      cy.get('#sortButton').should('contain.text', 'Sortera efter år');

      // Verify order is back to original
      cy.get('.movie h3').then(($newTitles) => {
        const newTitles = Array.from($newTitles).map((el) => el.textContent);
        expect(newTitles).to.deep.equal(originalTitles);
      });
    });
  });

  it('should reset sort order when performing a new search', () => {
    // First search
    cy.get('#searchText').type('Batman');
    cy.get('#search').click();
    cy.get('.movie').should('have.length.greaterThan', 0);

    // Sort the results
    cy.get('#sortButton').click();
    cy.get('#sortButton').should('contain.text', 'År (äldst först) ↑');

    // Perform new search
    cy.get('#searchText').clear().type('Dark');
    cy.get('#search').click();
    cy.get('.movie').should('have.length.greaterThan', 0);

    // Sort button should be reset
    cy.get('#sortButton').should('contain.text', 'Sortera efter år');
  });

  it('should handle empty search results', () => {
    // Search for something that won't return results
    cy.get('#searchText').type('NonExistentMovie12345');
    cy.get('#search').click();

    cy.get('#movie-container').should(
      'contain.text',
      'Inga sökresultat att visa'
    );

    // Sort button should still be visible but clicking shouldn't do anything
    cy.get('#sortButton').should('be.visible');
    cy.get('#sortButton').click();
    cy.get('#sortButton').should('contain.text', 'Sortera efter år');
  });

  it('should verify specific movie years are displayed correctly', () => {
    // Search for Batman movies
    cy.get('#searchText').type('Batman');
    cy.get('#search').click();

    cy.get('.movie').should('have.length.greaterThan', 0);

    // Check for specific movies and their years from mock data
    cy.get('.movie h3')
      .contains('The Batman')
      .parent()
      .should('contain.text', 'Year: 2022');
    cy.get('.movie h3')
      .contains('Batman Begins')
      .parent()
      .should('contain.text', 'Year: 2005');
    cy.get('.movie h3')
      .contains('Batman Forever')
      .parent()
      .should('contain.text', 'Year: 1995');
  });
});
