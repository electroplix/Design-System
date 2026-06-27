'use client';
import {
  ConfirmDialog,
  CookieNotice,
  FormDialog,
  GenericModal,
  LoadingOverlay,
  ToastBanners,
  Tooltip,
  WelcomePopup,
} from '@electroplix/components';

export default function ModalsTest() {
  return (
    <div>
      <h1>Modals</h1>
      <GenericModal id="gm-1" data-testid="generic-modal" isOpen={false} onClose={() => {}}>
        <p>Modal content</p>
      </GenericModal>
      <ConfirmDialog
        id="cd-1"
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Are you sure?"
      />
      <FormDialog id="fd-1" isOpen={false} onClose={() => {}} onSubmit={() => {}} title="Form" />
      <LoadingOverlay id="lo-1" isOpen={false} />
      <Tooltip id="tt-1" text="Tooltip text">
        <button type="button">Hover me</button>
      </Tooltip>
      <ToastBanners id="tb-1" toasts={[]} />
      <CookieNotice id="cn-1" isOpen={false} onAccept={() => {}} />
      <WelcomePopup id="wp-1" isOpen={false} onClose={() => {}} title="Welcome" />
    </div>
  );
}
