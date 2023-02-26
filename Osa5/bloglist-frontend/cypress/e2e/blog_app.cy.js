describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Testaaja',
            username: 'käyttäjä',
            password: 'salasana'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('käyttäjä')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('Testaaja logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('käyttäjä')
            cy.get('#password').type('väärä')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'wrong username or password')
            cy.get('html').should('not.contain', 'logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'käyttäjä', password: 'salasana' })
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title-input').type('new blog')
            cy.get('#author-input').type('new author')
            cy.get('#url-input').type('new url')
            cy.get('#create-button').click()
            cy.contains('new blog new author')
        })

        describe('And a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Blog title',
                    author: 'Some Author',
                    url: 'someurl'
                })
            })

            it('A blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('A blog can be removed', function() {
                cy.contains('view').click()
                cy.get('#delete-button').click()
                cy.get('html').should('not.contain', 'Blog title Some Author')
            })

            // eslint-disable-next-line quotes
            it("Only blog's adder can see delete button", function() {
                const newUser = {
                    name: 'Uusi',
                    username: 'uusi',
                    password: 'lyhyt'
                }
                cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
                cy.login({ username: 'uusi', password: 'lyhyt' })

                cy.contains('view').click()
                cy.get('#delete-button').should('not.exist')
            })
        })
    })
})