describe('Login ', () => {

  beforeEach(()=>{
    cy.visit('localhost:4200')
  })

  it('Login should visited', () => {
    cy.contains('Inicio de sesión')
    cy.wait(5000)
  })

  it('Login without email', () => {
    cy.contains('Inicio de sesión')
    cy.get('input#loginpassword').type('123', { delay: 200 })
    cy.get('button[type=submit]').click()
    cy.wait(5000)
    cy.get('button.swal2-confirm.swal2-styled').click()
    cy.contains('Inicio de sesión')
    cy.wait(5000)
  })
  
  it('Login without password', () => {
    cy.contains('Inicio de sesión')
    cy.get('input[type=email]').type('martinsantiago.se@gmail.com', { delay: 200 })
    cy.get('button[type=submit]').click()
    cy.wait(5000)
    cy.get('button.swal2-confirm.swal2-styled').click()
    cy.contains('Inicio de sesión')
    cy.wait(5000)
  })

  it('Login without user', () => {
    cy.contains('Inicio de sesión')
    cy.get('input[type=email]').type('martinsantiago.se@gmail.com', { delay: 200 })
    cy.get('input#loginpassword').type('123456', { delay: 200 })
    cy.get('button[type=submit]').click()
    cy.wait(5000)
    cy.get('button.swal2-confirm.swal2-styled').click()
    cy.contains('Inicio de sesión')
    cy.wait(5000)
  })

  it('Go to forget password', () => {
    cy.contains('Inicio de sesión')
    cy.get('a#gforgetpassword').click()
    cy.contains('Ingresa tu correo electronico para solicitar recuperar tu clave')
    cy.wait(5000)
  })

  it('Go to registro', () => {
    cy.contains('Inicio de sesión')
    cy.get('a#gregistro').click()
    
    cy.wait(5000)
  })

})