import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog, CookieNotice, FormDialog, GenericModal, PromoPopup } from './index';

const meta: Meta = {
  title: 'Components/Modals',
  tags: ['autodocs'],
};
export default meta;

export const GenericModalStory: StoryObj = {
  render: () => (
    <GenericModal open title="Sample Modal" onClose={() => {}}>
      <p>Modal content goes here.</p>
    </GenericModal>
  ),
};

export const ConfirmDialogStory: StoryObj = {
  render: () => (
    <ConfirmDialog
      open
      title="Delete item?"
      message="This action cannot be undone."
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  ),
};

export const FormDialogStory: StoryObj = {
  render: () => (
    <FormDialog open title="Edit Profile" onClose={() => {}} onSubmit={() => {}}>
      <input placeholder="Name" />
    </FormDialog>
  ),
};

export const PromoPopupStory: StoryObj = {
  render: () => (
    <PromoPopup open title="50% Off!" description="Limited time offer." onClose={() => {}} />
  ),
};

export const CookieNoticeStory: StoryObj = {
  render: () => <CookieNotice open onAccept={() => {}} onDecline={() => {}} />,
};
