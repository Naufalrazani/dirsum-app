/**
 * - Login spec
 *
 * - should display login page correctly
 * - should display alert when email and password are wrong
 * - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="nama@email.com"]').should('be.visible');
    cy.get('input[placeholder="••••••••"]').should('be.visible');
    cy.get('button').contains('Masuk Sekarang').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="nama@email.com"]').type('wrongemail@test.com');
    cy.get('input[placeholder="••••••••"]').type('wrongpassword');
    cy.get('button').contains('Masuk Sekarang').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="nama@email.com"]').type(
      'muhammadmirza@gmail.com'
    );
    cy.get('input[placeholder="••••••••"]').type('12345678');
    cy.get('button').contains('Masuk Sekarang').click();
    cy.get('button').contains('Keluar').should('be.visible');
    cy.get('nav').should('be.visible');
  });
});
