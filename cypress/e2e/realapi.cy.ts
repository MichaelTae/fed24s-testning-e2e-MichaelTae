describe('Movie Search with Real API', () => {
  beforeEach(() => {
    // Use real API data (no mock=true parameter)
    cy.visit('/');
  });

  it('should work with real API data and sorting', () => {
    cy.get('#searchText').type('Hangover');
    cy.get('#search').click();

    // Wait longer for real API response
    cy.get('.movie', { timeout: 10000 }).should('have.length.greaterThan', 0);

    // Verify basic functionality works with real data
    cy.get('.movie h3').should('contain.text', 'Hangover');
    cy.get('.movie-year').should('be.visible');

    // Test sorting with real data
    cy.get('#sortButton').click();
    cy.get('#sortButton').should('contain.text', 'År (äldst först) ↑');

    // Verify sorting worked (years should be in ascending order)
    cy.get('.movie-year').then(($years) => {
      const years = Array.from($years).map((el) =>
        parseInt(el.textContent!.replace('Year: ', ''))
      );

      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).to.be.at.most(years[i + 1]);
      }
    });
  });

  it('should handle API errors gracefully', () => {
    // Search for something that might cause API issues (very short search)
    cy.get('#searchText').type('x');
    cy.get('#search').click();

    // Should handle search gracefully (may show no results)
    cy.get('#movie-container').should('be.visible');

    cy.get('#sortButton').should('be.visible');
  });
});
