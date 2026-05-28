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
} from '@electroplix/components';
import { useState } from 'react';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';

const noop = () => {};

export default function ModalsPage() {
  const [overlay, setOverlay] = useState(false);
  const [generic, setGeneric] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [cookies, setCookies] = useState(true);

  return (
    <CategoryPage
      slug="modals"
      title="Modals & Overlays"
      description="Dialogs, drawers, tooltips, toasts, confirmation flows."
      componentCount={9}
    >
      <ComponentDemo name="OverlayBase">
        <button type="button" onClick={() => setOverlay(true)} style={{ padding: '0.5rem 1rem' }}>
          Open overlay
        </button>
        <OverlayBase isOpen={overlay} onClose={() => setOverlay(false)}>
          <div style={{ padding: 24 }}>
            <h3>Custom overlay</h3>
            <button type="button" onClick={() => setOverlay(false)}>
              Close
            </button>
          </div>
        </OverlayBase>
      </ComponentDemo>
      <ComponentDemo name="GenericModal">
        <button type="button" onClick={() => setGeneric(true)} style={{ padding: '0.5rem 1rem' }}>
          Open modal
        </button>
        <GenericModal isOpen={generic} title="Generic modal" onClose={() => setGeneric(false)}>
          <p>This is the modal body.</p>
        </GenericModal>
      </ComponentDemo>
      <ComponentDemo name="ConfirmDialog">
        <button type="button" onClick={() => setConfirm(true)} style={{ padding: '0.5rem 1rem' }}>
          Confirm
        </button>
        <ConfirmDialog
          isOpen={confirm}
          message="Delete this item?"
          onConfirm={() => setConfirm(false)}
          onCancel={() => setConfirm(false)}
        />
      </ComponentDemo>
      <ComponentDemo name="FormDialog">
        <button
          type="button"
          onClick={() => setFormDialog(true)}
          style={{ padding: '0.5rem 1rem' }}
        >
          New item
        </button>
        <FormDialog
          isOpen={formDialog}
          title="New item"
          onClose={() => setFormDialog(false)}
          onSubmit={() => setFormDialog(false)}
        >
          <input placeholder="Name" />
        </FormDialog>
      </ComponentDemo>
      <ComponentDemo name="LoadingOverlay">
        <button type="button" onClick={() => setLoading(true)} style={{ padding: '0.5rem 1rem' }}>
          Show loading
        </button>
        <LoadingOverlay isOpen={loading} message="Saving…" />
        {loading && (
          <button type="button" onClick={() => setLoading(false)} style={{ marginTop: 8 }}>
            Hide
          </button>
        )}
      </ComponentDemo>
      <ComponentDemo name="Tooltip">
        <Tooltip text="Hint about this control">
          <button type="button" style={{ padding: '0.5rem 1rem' }}>
            Hover me
          </button>
        </Tooltip>
      </ComponentDemo>
      <ComponentDemo name="ToastBanners">
        <ToastBanners
          toasts={[
            { id: '1', message: 'Saved successfully', type: 'success' },
            { id: '2', message: 'Heads up', type: 'info' },
          ]}
          onDismiss={noop}
        />
      </ComponentDemo>
      <ComponentDemo name="CookieNotice">
        <CookieNotice
          isOpen={cookies}
          onAccept={() => setCookies(false)}
          onDecline={() => setCookies(false)}
        />
      </ComponentDemo>
      <ComponentDemo name="WelcomePopup">
        <button type="button" onClick={() => setWelcome(true)} style={{ padding: '0.5rem 1rem' }}>
          Open welcome
        </button>
        <WelcomePopup
          isOpen={welcome}
          message="Welcome to Electroplix!"
          onCta={() => setWelcome(false)}
          onClose={() => setWelcome(false)}
        />
      </ComponentDemo>
    </CategoryPage>
  );
}
