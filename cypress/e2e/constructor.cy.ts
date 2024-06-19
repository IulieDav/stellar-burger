describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('should add bun', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('should add main', () => {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-main]')
      .contains('Ингредиент 2')
      .should('exist');
  });
});

describe('Ingredient modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('should open ingredient modal', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('should close ingredient modal', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should close ingredient modal on overlay', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should create order', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '1'] });

    cy.get('[data-cy=order-number]').contains('123456').should('exist');

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Ингредиент 1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Ингредиент 2').should('not.exist');
  });
});
