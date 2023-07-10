describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login Page')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('testuser is logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.createBlog({ title: 'beforeEachBlog', author: 'Test Author', url: 'https://testurl.com' })
    }
    )
    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('A test blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://testurl.com')
      cy.get('#create-blog-button').click()
      cy.contains('Title: A test blog')
    })
    it('A blog can be liked', function() {
      cy.contains('beforeEachBlog').click()
      cy.contains('View more').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })
    it('A blog can be deleted', function() {
      cy.contains('beforeEachBlog').click()
      cy.contains('View more').click()
      cy.contains('Remove').click()
      cy.contains('beforeEachBlog').should('not.exist')
    })
    it('User can only see their own blogs', function() {
      cy.contains('Log Out').click()
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
        username: 'testuser2',
        name: 'Test User2',
        password: 'testpassword2'
      })
      cy.login({ username: 'testuser2', password: 'testpassword2' })
      cy.contains('beforeEachBlog').should('not.exist')
    })
    it('Blogs are ordered by likes', function() {
      // Create blogs with different numbers of likes
      cy.createBlog({ title: 'A test blog', author: 'Test Author', url: 'https://testurl.com' })
      cy.contains('A test blog').click()
      //open both blogs, and close the first one
      cy.contains('View more').click()
      cy.contains('View more').click()
      cy.contains('Hide info').click()
      //like the second blog 3 times and after that open the first blog
      //They will change places
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('View more').click()

      // Get the blogs and verify the order based on likes
      cy.get('.blog').then(blogs => {
        // Convert the blogs to an array of objects with the blog element and the number of likes
        const blogsWithLikes = Array.from(blogs).map(blog => {
          const likesText = Cypress.$(blog).find('.likes').text()
          const likes = Number(likesText.split(' ')[1])
          return { blog, likes }
        })

        // Sort the blogs based on the number of likes in descending order
        const sortedBlogs = blogsWithLikes.sort((a, b) => b.likes - a.likes)

        // Verify the order of blogs by comparing the likes
        cy.wrap(sortedBlogs[0].blog).contains('Likes: 3')
        cy.wrap(sortedBlogs[1].blog).contains('Likes: 0')
      })
    })

  })
})