import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog/>', () => {
    beforeEach(() => {
        const blog = {
            author: 'Test Author',
            id: 'somestringid',
            likes: 1,
            title: 'Test Title',
            url: 'testUrl',
            user: {
                id: 'anotherstringid',
                name: 'Test Name',
                username: 'testUsername'
            }
        }
        const userId = 'anotherstringid'
        const mockLiker = jest.fn()
        const mockRemover = jest.fn()

        render(<Blog
            blog={blog}
            likeBlog={mockLiker}
            removeBlog={mockRemover}
            userId={userId}
        />)
    })

    test('renders initially only title and author', () => {
        screen.getByText('Test Title Test Author')

        const url = screen.queryByText('testUrl')
        const likes = screen.queryByText('likes 1')
        const name = screen.queryByText('Test Name')

        expect(url).toBeNull()
        expect(likes).toBeNull()
        expect(name).toBeNull()
    })

    test('renders everything after view is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        screen.getByText('Test Title Test Author')
        screen.getByText('testUrl')
        screen.getByText('likes 1')
        screen.getByText('Test Name')
    })
})

test('clicking like twice calls event handler twice', async () => {
    const blog = {
        author: 'Test Author',
        id: 'somestringid',
        likes: 1,
        title: 'Test Title',
        url: 'testUrl',
        user: {
            id: 'anotherstringid',
            name: 'Test Name',
            username: 'testUsername'
        }
    }
    const userId = 'anotherstringid'
    const mockLiker = jest.fn()
    const mockRemover = jest.fn()

    render(<Blog
        blog={blog}
        likeBlog={mockLiker}
        removeBlog={mockRemover}
        userId={userId}
    />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLiker.mock.calls).toHaveLength(2)
})