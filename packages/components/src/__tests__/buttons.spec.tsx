import { fireEvent, render, screen } from '@testing-library/react';
/**
 * @electroplix/components – buttons tests
 */
import type React from 'react';
import {
  ButtonGroup,
  DownloadButton,
  FloatingActionButton,
  IconButton,
  LoadingButton,
  PrimaryButton,
  PrintButton,
  SecondaryButton,
  ShareButton,
  TertiaryButton,
} from '../components/buttons';
import { TestWrapper } from './test-utils';

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

  describe('PrimaryButton behavioral', () => {
    it('has type="button"', () => {
      wrap(<PrimaryButton label="Go" />);
      const btn = screen.getByRole('button');
      expect(btn.getAttribute('type')).toBe('button');
    });

    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      wrap(<PrimaryButton label="Go" onClick={onClick} />);
      fireEvent.click(screen.getByText('Go'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isLoading', () => {
      wrap(<PrimaryButton label="Save" isLoading />);
      const btn = screen.getByRole('button');
      expect(btn.hasAttribute('disabled')).toBe(true);
    });

    it('is disabled when disabled prop is true', () => {
      wrap(<PrimaryButton label="Save" disabled />);
      const btn = screen.getByRole('button');
      expect(btn.hasAttribute('disabled')).toBe(true);
    });

    it('displays label text', () => {
      wrap(<PrimaryButton label="Submit Form" />);
      expect(screen.getByText('Submit Form')).toBeTruthy();
    });

    it('displays children over label', () => {
      wrap(
        <PrimaryButton label="Label">
          <span>Child Content</span>
        </PrimaryButton>,
      );
      expect(screen.getByText('Child Content')).toBeTruthy();
    });
  });

  describe('SecondaryButton behavioral', () => {
    it('has type="button"', () => {
      wrap(<SecondaryButton label="Cancel" />);
      const btn = screen.getByRole('button');
      expect(btn.getAttribute('type')).toBe('button');
    });

    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      wrap(<SecondaryButton label="Cancel" onClick={onClick} />);
      fireEvent.click(screen.getByText('Cancel'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('TertiaryButton behavioral', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      wrap(<TertiaryButton label="Dismiss" onClick={onClick} />);
      fireEvent.click(screen.getByText('Dismiss'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('IconButton behavioral', () => {
    it('has type="button"', () => {
      wrap(<IconButton icon="star" />);
      const btn = screen.getByRole('button');
      expect(btn.getAttribute('type')).toBe('button');
    });
  });

  describe('FloatingActionButton behavioral', () => {
    it('has type="button"', () => {
      wrap(<FloatingActionButton icon="plus" />);
      const btn = screen.getByRole('button');
      expect(btn.getAttribute('type')).toBe('button');
    });
  });

  describe('ButtonGroup behavioral', () => {
    it('renders all buttons', () => {
      wrap(<ButtonGroup buttons={[{ label: 'First' }, { label: 'Second' }]} />);
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
    });

    it('calls onChange when button clicked', () => {
      const onChange = jest.fn();
      wrap(<ButtonGroup buttons={[{ label: 'A' }, { label: 'B' }]} onChange={onChange} />);
      fireEvent.click(screen.getByText('B'));
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });
});
