import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  test('first test', () => {
    /* 1. Render component */
    render(<Input />);
    // const { container, rerender } = render(<Input />);

    /* 2. Find element on page
    There are many methods (queries) to get element/elements. 
    Read: https://testing-library.com/docs/queries/about. 
    Good extension: https://testing-playground.com/ */
    const input = screen.getByRole('textbox');

    // const input = container.querySelector('input'); // better not do that! Use screen instead and selectors.

    /* 3. Expect something (matchers) 
    Read: https://jestjs.io/docs/expect
    Read: https://github.com/testing-library/jest-dom
    */
    expect(input).toBeInTheDocument();
  });

  test('renders input element', () => {
    render(<Input name="Name" label="Name" />);

    const input = screen.getByLabelText(/name/i);
    expect(input).toBeInTheDocument();
  });

  test('displays placeholder', () => {
    // default placeholder
    const { rerender } = render(<Input name="Name" label="Name" />);

    let placeholder = 'Name';
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();

    // placeholder passed by prop
    placeholder = 'First name';
    rerender(<Input name="Name" label="Name" placeholder={placeholder} />); // re-render the same component with different props
    const inputWithProp = screen.getByPlaceholderText(placeholder);
    expect(inputWithProp).toBeInTheDocument();
  });

  test('displays proper value', () => {
    render(<Input name="Name" label="Name" />);

    const input = screen.getByLabelText(/name/i);
    expect(input).toBeInTheDocument();

    // fire event - read: https://testing-library.com/docs/dom-testing-library/api-events
    fireEvent.change(input, { target: { value: 'john' } });
    expect(input).toHaveValue('john');
  });

  test('prevents user from passing numbers', () => {
    render(<Input name="name" label="Name" />);

    const input = screen.getByLabelText(/name/i);
    fireEvent.change(input, { target: { value: 'John123' } });
    expect(input).toHaveValue('John');
  });

  test('displays error when passing special character', () => {
    const { container } = render(<Input name="name" label="Name" />);

    const input = screen.getByLabelText(/name/i);
    // const error = screen.getByText(/error/i); // can't do that, because initially it doesn't exist - need to use container instead

    expect(container).not.toHaveTextContent(/error/i);

    fireEvent.change(input, { target: { value: 'John$@#&' } });
    expect(container).toHaveTextContent(/error/i);

    fireEvent.change(input, { target: { value: 'John' } });
    expect(container).not.toHaveTextContent(/error/i);
  });
});

// refactor of repeated code in Input2.test.js
