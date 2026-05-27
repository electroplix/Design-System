/**
 * @electroplix/components – buttons tests
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from './test-utils';
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  IconButton,
  FloatingActionButton,
  ButtonGroup,
  LoadingButton,
  ShareButton,
  DownloadButton,
  PrintButton,
} from '../components/buttons';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe('Button components', () => {
  it('PrimaryButton renders', () => {
    const { container } = wrap(<PrimaryButton label="Go" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('SecondaryButton renders', () => {
    const { container } = wrap(<SecondaryButton label="Cancel" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('TertiaryButton renders', () => {
    const { container } = wrap(<TertiaryButton label="Dismiss" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('IconButton renders', () => {
    const { container } = wrap(<IconButton icon="star" ariaLabel="Fav" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('FloatingActionButton renders', () => {
    const { container } = wrap(<FloatingActionButton icon="plus" ariaLabel="Add" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ButtonGroup renders', () => {
    const { container } = wrap(<ButtonGroup buttons={[{ label: 'A' }, { label: 'B' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('LoadingButton renders', () => {
    const { container } = wrap(<LoadingButton label="Save" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ShareButton renders', () => {
    const { container } = wrap(<ShareButton label="Share" url="https://example.com" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('DownloadButton renders', () => {
    const { container } = wrap(<DownloadButton label="Download" href="/file.pdf" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PrintButton renders', () => {
    const { container } = wrap(<PrintButton label="Print" />);
    expect(container.firstChild).toBeTruthy();
  });
});
