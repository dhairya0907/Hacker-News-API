import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from "../Screens/Home";

test('Render Home', () => {
  render(<Home />);
});
test('Test API', () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);
});