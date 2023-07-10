import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
}

test('Renders blog title and author, but not url or likes', () => {
  const user = {
    name: 'Dan'
  }
  const createBlog = jest.fn()


  render(<Blog name={'Dan'} blog={blog} user={user} createBlog={createBlog} />)
  expect(screen.getByText(/test title/)).toBeDefined()
  expect(screen.getByText(/test author/)).toBeDefined()
  expect(screen.queryByText(/url/)).toBeNull()
  expect(screen.queryByText(/likes/)).toBeNull()
})

test('Clicking the view button shows the url and likes', async () => {
  const user = {
    name: 'Dan'
  }
  const createBlog = jest.fn()
  render(<Blog name={'Dan'} blog={blog} user={user} createBlog={createBlog} />)
  const button = screen.getByText('View more')
  await userEvent.click(button)
  expect(screen.getByText(/test url/)).toBeDefined()
  expect(screen.getByText(/Likes/)).toBeDefined()
}
)

test('Clicking the like button twice calls the event handler twice', async () => {
  const user = {
    name: 'Dan'
  }
  const createBlog = jest.fn()
  const handleLike = jest.fn()
  render(<Blog name={'Dan'} blog={blog} user={user} createBlog={createBlog} handleLike={handleLike} />)
  const viewButton = screen.getByText('View more')
  await userEvent.click(viewButton)
  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)
  expect(handleLike.mock.calls).toHaveLength(2)
}
)

