describe('URL shortener spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      ok: true,
      fixture: 'urls'
    });
    cy.visit('http://localhost:3000/');
  });

  it('When a user visits the page, they can view the page title and the existing shortened URLs', () => {
    cy.get('[data-cy="header"]').should('exist');
    cy.get('[data-cy="header"]').should('be.visible');
    cy.get('[data-cy="header"]').contains('URL Shortener');

    cy.get('[data-cy="url-card"]').should('exist');
    cy.get('[data-cy="url-card"]').should('be.visible');
    cy.get('[data-cy="url-card"]').contains('New shortened URL');
    cy.get('[data-cy="url-card"]').contains('Previous URL');
  });

  it('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get('[data-cy="form"]').should('exist');
    cy.get('[data-cy="form"]').should('be.visible');

    cy.get('[data-cy="title-label"]').contains('URL Title');
    cy.get('[data-cy="title-input"]').should('exist');
    cy.get('[data-cy="title-input"]').should('be.visible');

    cy.get('[data-cy="url-label"]').contains('URL You\'d Like to Shorten');
    cy.get('[data-cy="url-input"]').should('exist');
    cy.get('[data-cy="url-input"]').should('be.visible');

    cy.get('[data-cy="submit-button"]').should('exist');
    cy.get('[data-cy="submit-button"]').should('be.visible');
    cy.get('[data-cy="submit-button"]').contains('Shorten Please!');
  });

  it('When a user fills out the form, the information is reflected in the input fields', () => {
    cy.get('[data-cy="title-input"]').type('Sleepy Kitten');
    cy.get('[data-cy="title-input"]').should('have.value', 'Sleepy Kitten');
    cy.get('[data-cy="title-input"]').should('be.visible', 'Sleepy Kitten');

    cy.get('[data-cy="url-input"]').type('https://www.boredpanda.com/blog/wp-content/uploads/2015/07/cutest-sleeping-kitties-ever-106__605.jpg');
    cy.get('[data-cy="url-input"]').should('have.value', 'https://www.boredpanda.com/blog/wp-content/uploads/2015/07/cutest-sleeping-kitties-ever-106__605.jpg');
    cy.get('[data-cy="url-input"]').should('be.visible', 'https://www.boredpanda.com/blog/wp-content/uploads/2015/07/cutest-sleeping-kitties-ever-106__605.jpg');
  });

  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls',
      {
        statusCode: 200,
        body: {
          long_url: 'https://www.boredpanda.com/blog/wp-content/uploads/2015/07/cutest-sleeping-kitties-ever-106__605.jpg',
          title: 'Sleepy Kitten',
        }
      });
    cy.get('[data-cy="title-input"]').type('Sleepy Kitten');
    cy.get('[data-cy="url-input"]').type('https://www.boredpanda.com/blog/wp-content/uploads/2015/07/cutest-sleeping-kitties-ever-106__605.jpg');
    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="url-card"] > :nth-child(2)').should('exist');
    cy.get('[data-cy="url-card"] > :nth-child(2)').should('be.visible');

    // still working on getting my post intercept to display after click
    // cy.get('[data-cy="url-card"] > :nth-child(2)').contains('http://localhost:3001/useshorturl/2');
  });

});
