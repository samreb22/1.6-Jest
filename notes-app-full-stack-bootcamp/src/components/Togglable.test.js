// Importaciones para realizar los tests
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import Togglable from "./Togglable";
import i18n from '../i18n/index'

// Hago un describe para dar un contexto a los tests. y para agrupar los tests del Togglable
describe('<Toggable />', () => {
    const buttonLabel = 'show'
    let component
  
    // Esto se ejecutará antes de cada test
    beforeEach(() => {
      component = render(
        <Togglable buttonLabel={buttonLabel}>
          <div>testDivContent</div>
        </Togglable>
      )
    })
  
    test('renders its children', () => {
      component.getByText('testDivContent')
    })
  
    test('renders its children but they are not visible', () => {
      const el = component.getByText('testDivContent')
      expect(el.parentNode).not.toBeVisible()
    })
  
    test('after clicking its children must be shown', () => {
      const button = component.getByText(buttonLabel)
       // Para disparar un evento click sobre el botón
      fireEvent.click(button)
  
      const el = component.getByText('testDivContent')
      expect(el.parentNode).toBeVisible()
    })
  
    // Pensando en el caso de que un usuario estuviera realizando el test
    test('toggled content can be closed', () => {
      const button = component.getByText(buttonLabel)
      fireEvent.click(button)
  
      const el = component.getByText('testDivContent')
      expect(el.parentNode).toBeVisible()
  
      // Probando que el botón contenga en texto que hay definido en "i18n"
      const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
      fireEvent.click(cancelButton)
  
      expect(el.parentNode).not.toBeVisible()
    })
})

// Ejecutar 'npm test -- -- coverage' para ver como tenemos de cubiertos de test a nuestro proyecto y sus componentes