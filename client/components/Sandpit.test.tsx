// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Sandpit from './Sandpit' // Adjust this import to your file structure

describe('Sandpit component', () => {
  it('displays "Sandpit" on the page', () => {
    render(<Sandpit />)
    // screen.debug()
    const button = screen.getByRole('button')
    expect(button.textContent).toMatch('Show Sandpit')
    // expect(container.includes('Sandpit')).toBe(true)
  })
  // expect(1).toBe(true)
  // it('displays "Sandpit" on the page', () => {
  //   // Your test code here
  // })

  // it('has a functional button', () => {
  //   // Your test code here
  // })
})
