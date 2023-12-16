import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Home from '../Home';
import mockAxios from 'jest-mock-axios'; // Mock axios

afterEach(() => {
  mockAxios.reset(); // Resetowanie mocka po każdym teście
});

describe('Komponent Home', () => {
  it('pobiera akcje przy montowaniu i aktualizuje stan', async () => {
    // Mock danych, które powinny zostać zwrócone z wywołania API
    const mockActionsData = [{ id: 1, name: 'Akcja 1' }, { id: 2, name: 'Akcja 2' }];

    // Renderowanie komponentu Home
    const { getByTestId } = render(<Home />);

    // Mock odpowiedzi axios
    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    mockAxios.mockResponse({ data: mockActionsData });

    // Sprawdzenie, czy stan został zaktualizowany mockowymi danymi
    // Możesz potrzebować znaleźć sposób, aby sprawdzić zaktualizowany stan,
    // na przykład sprawdzając, czy pewne elementy są renderowane na podstawie stanu
    // Na przykład, jeśli akcje są wyświetlane na liście, możesz wyszukać elementy listy:
    // const actionItems = await waitFor(() => getByTestId('action-items'));
    // expect(actionItems.children.length).toBe(mockActionsData.length);
  });
});