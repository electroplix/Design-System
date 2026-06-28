import { fireEvent, render, screen } from '@testing-library/react';
/**
 * @electroplix/components – modals tests
 */
import type React from 'react';
import {
  ConfirmDialog,
  CookieNotice,
  FormDialog,
  GenericModal,
  LoadingOverlay,
  OverlayBase,
  ToastBanners,
  Tooltip,
  WelcomePopup,
} from '../components/modals';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('Modal components', () => {
  it('OverlayBase renders when open', () => {
    const { container } = wrap(
      <OverlayBase isOpen onClose={noop}>
        <span>content</span>
      </OverlayBase>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('GenericModal renders', () => {
    const { container } = wrap(
      <GenericModal isOpen title="Test" onClose={noop}>
        <p>Body</p>
      </GenericModal>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('ConfirmDialog renders', () => {
    const { container } = wrap(
      <ConfirmDialog isOpen message="Delete?" onConfirm={noop} onCancel={noop} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('FormDialog renders', () => {
    const { container } = wrap(
      <FormDialog isOpen title="New" onClose={noop} onSubmit={noop}>
        <input />
      </FormDialog>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('LoadingOverlay renders', () => {
    const { container } = wrap(<LoadingOverlay isOpen />);
    expect(container.firstChild).toBeTruthy();
  });

  it('Tooltip renders', () => {
    const { container } = wrap(
      <Tooltip text="Hint">
        <button type="button">Hover</button>
      </Tooltip>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('ToastBanners renders', () => {
    const { container } = wrap(
      <ToastBanners toasts={[{ id: '1', message: 'Saved!', type: 'success' }]} onDismiss={noop} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('CookieNotice renders', () => {
    const { container } = wrap(<CookieNotice isOpen onAccept={noop} onDecline={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('WelcomePopup renders', () => {
    const { container } = wrap(
      <WelcomePopup isOpen message="Hi there!" onCta={noop} onClose={noop} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  describe('OverlayBase behavioral', () => {
    it('renders nothing when closed', () => {
      const { container } = wrap(
        <OverlayBase isOpen={false} onClose={noop}>
          <span>content</span>
        </OverlayBase>,
      );
      expect(container.firstChild).toBeNull();
    });

    it('renders children when open', () => {
      wrap(
        <OverlayBase isOpen onClose={noop}>
          <span>Modal Content</span>
        </OverlayBase>,
      );
      expect(screen.getByText('Modal Content')).toBeTruthy();
    });
  });

  describe('GenericModal behavioral', () => {
    it('renders nothing when closed', () => {
      const { container } = wrap(
        <GenericModal isOpen={false} title="Test" onClose={noop}>
          <p>Body</p>
        </GenericModal>,
      );
      expect(container.firstChild).toBeNull();
    });

    it('displays title', () => {
      wrap(
        <GenericModal isOpen title="My Modal" onClose={noop}>
          <p>Body</p>
        </GenericModal>,
      );
      expect(screen.getByText('My Modal')).toBeTruthy();
    });
  });

  describe('ConfirmDialog behavioral', () => {
    it('renders nothing when closed', () => {
      const { container } = wrap(
        <ConfirmDialog isOpen={false} message="Delete?" onConfirm={noop} onCancel={noop} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it('displays message text', () => {
      wrap(<ConfirmDialog isOpen message="Delete item?" onConfirm={noop} onCancel={noop} />);
      expect(screen.getAllByText('Delete item?').length).toBeGreaterThanOrEqual(1);
    });

    it('calls onConfirm when confirm clicked', () => {
      const onConfirm = jest.fn();
      wrap(<ConfirmDialog isOpen message="Delete?" onConfirm={onConfirm} onCancel={noop} />);
      const confirmBtn = screen.getByText('Confirm');
      fireEvent.click(confirmBtn);
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when cancel clicked', () => {
      const onCancel = jest.fn();
      wrap(<ConfirmDialog isOpen message="Delete?" onConfirm={noop} onCancel={onCancel} />);
      const cancelBtn = screen.getByText('Cancel');
      fireEvent.click(cancelBtn);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('WelcomePopup behavioral', () => {
    it('renders nothing when closed', () => {
      const { container } = wrap(
        <WelcomePopup isOpen={false} message="Hi!" onCta={noop} onClose={noop} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it('displays message', () => {
      wrap(<WelcomePopup isOpen message="Welcome here!" onCta={noop} onClose={noop} />);
      expect(screen.getAllByText('Welcome here!').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('CookieNotice behavioral', () => {
    it('calls onAccept when accept clicked', () => {
      const onAccept = jest.fn();
      wrap(<CookieNotice isOpen onAccept={onAccept} onDecline={noop} />);
      const acceptBtn = screen.getByText('Accept');
      fireEvent.click(acceptBtn);
      expect(onAccept).toHaveBeenCalledTimes(1);
    });
  });

  describe('ToastBanners behavioral', () => {
    it('renders toast messages', () => {
      wrap(
        <ToastBanners
          toasts={[
            { id: '1', message: 'Saved!', type: 'success' },
            { id: '2', message: 'Error!', type: 'error' },
          ]}
          onDismiss={noop}
        />,
      );
      expect(screen.getByText('Saved!')).toBeTruthy();
      expect(screen.getByText('Error!')).toBeTruthy();
    });
  });
});
