import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

const renderInput = (props) => {
  const utils = render(<Input name="Name" label="Name" {...props} />);
  const input = screen.getByLabelText(/name/i);

  return { ...utils, input };
};

describe('Input component', () => {
  test('renders input element', () => {
    const { input } = renderInput();
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
    const { input } = renderInput();
    expect(input).toBeInTheDocument();

    // fire event - read: https://testing-library.com/docs/dom-testing-library/api-events
    fireEvent.change(input, { target: { value: 'john' } });
    expect(input).toHaveValue('john');
  });

  test('prevents user from passing numbers', () => {
    const { input } = renderInput();
    fireEvent.change(input, { target: { value: 'John123' } });
    expect(input).toHaveValue('John');
  });

  test('displays error when passing special character', () => {
    const { input, container } = renderInput();

    expect(container).not.toHaveTextContent(/error/i);

    fireEvent.change(input, { target: { value: 'John$@#&' } });
    expect(container).toHaveTextContent(/error/i);

    fireEvent.change(input, { target: { value: 'John' } });
    expect(container).not.toHaveTextContent(/error/i);
  });
});
