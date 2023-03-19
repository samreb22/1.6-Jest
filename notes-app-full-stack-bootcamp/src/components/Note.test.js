// Importaciones para realizar los tests
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import Note from "./Note";

// Test 1
test('renders content', () => { 
    const note = {
        content: 'This is a test',
        important: true
    }

    // Para comprobar si el componente <Note /> se renderiza cuando se le pasa la prop {nota}
    const component = render(<Note note={note} />)

    component.getByText('This is a test');
    component.getByText('make not important');


    /* ************* Algunos test de prueba ************* */

    // *****  Muestra el contenido que se está renderizando
    // component.debug();

    // ***** Para mostrar como se renderiza un elemento con prettyDOM
    // const li = component.container.querySelector('li');
    // console.log(prettyDOM(li));
})

// Test 2
test('clicking the button calls event handler once', () => {
    const note = {
      content: 'This is a test',
      important: true
    }
  
    // Creamos un mock, es como una especia de espía
    const mockHandler = jest.fn()
  
    const component = render(<Note note={note} toggleImportance={mockHandler} />)
  
    const button = component.getByText('make not important')
    // Para disparar un evento click sobre el botón
    fireEvent.click(button)
  
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })