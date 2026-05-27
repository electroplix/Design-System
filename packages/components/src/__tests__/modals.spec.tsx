import { render } from '@testing-library/react';
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
});
