import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogCreationForm from './CreateBlog'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

test('Create new blog calls callback function with correct information', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogCreationForm onCreateBlog={createBlog} />)
  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('Url:')
  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')
  console.log('titleInput value:', titleInput.value) // Output the input value
  await user.click(screen.getByText('Create'))
  console.log('createBlog mock calls:', createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'test url',
  })
})


