import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/res/HelperFunctions', () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      page: {
        title: 'Romantic Comedy',
        'total-content-items': '2',
        'page-num-requested': '1',
        'page-size-requested': '20',
        'page-size-returned': '2',
        'content-items': {
          content: [
            {
              name: 'The Birds',
              'poster-image': 'poster1.jpg',
            },
            {
              name: 'Rear Window',
              'poster-image': 'poster2.jpg',
            },
          ],
        },
      },
    }),
  ),
  getImage: jest.fn(url => url),
}));

describe('App Component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<App />);
    const searchbar = getByTestId('searchbar');
    expect(searchbar).toBeDefined();
  });

  it('initially shows loading indicator', () => {
    const {getByTestId} = render(<App />);
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeDefined();
  });

  it('renders "No Data Found" component when no data is present', () => {
    const {getByText} = render(<App />);
    const noDataElement = getByText('No Data Found');
    expect(noDataElement).toBeDefined();
  });
});

describe('App Component - Initial Load', () => {
  it('fetches and displays data on initial load', async () => {
    const {getByText} = render(<App />);

    await waitFor(() => {
      expect(getByText('The Birds')).toBeTruthy();
      expect(getByText('Rear Window')).toBeTruthy();
    });
  });
});
