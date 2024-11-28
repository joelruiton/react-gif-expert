import { render, screen, fireEvent } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe('Pruebas en el componente <AddCategory />', () => {
  test('Debe de cambiar el valor de la caja de texto', () => {
    const inputValue = 'Dragon Ball';
    render(<AddCategory onAddCategory={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: inputValue } });
    //screen.debug();
    expect(input.value).toBe(inputValue);
  });

  test('Debe de llamar a onAddCategory si el input tiene un valor', () => {
    const inputValue = 'Dragon Ball';
    const onAddCategory = jest.fn();
    render(<AddCategory onAddCategory={onAddCategory} />);
    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');
    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);
    expect(input.value).toBe('');
    expect(onAddCategory).toHaveBeenCalled();
    expect(onAddCategory).toHaveBeenCalledTimes(1);
    expect(onAddCategory).toHaveBeenCalledWith(inputValue);
  });

  test('No debe de llamar a onAddCategory si el input esta vacio', () => {
    const onAddCategory = jest.fn();
    render(<AddCategory onAddCategory={onAddCategory} />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(onAddCategory).not.toHaveBeenCalled();
    expect(onAddCategory).toHaveBeenCalledTimes(0);
  });
})
