import { render } from '@testing-library/react';

import ComponentsForm from './components-form';

describe('ComponentsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentsForm />);
    expect(baseElement).toBeTruthy();
  });
});
