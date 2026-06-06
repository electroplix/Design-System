'use client';
import {
  Button,
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
} from '@electroplix/components';

export default function ButtonsTest() {
  return (
    <div>
      <h1>Buttons</h1>
      <PrimaryButton id="pb-1" data-testid="primary" label="Primary" />
      <SecondaryButton id="sb-1" label="Secondary" />
      <TertiaryButton id="tb-1" label="Tertiary" />
      <IconButton id="ib-1" icon="star" />
      <Button id="b-1" label="Button" variant="primary" />
      <FloatingActionButton id="fab-1" icon="plus" fixed={false} />
      <ButtonGroup id="bg-1" buttons={[{ label: 'A' }, { label: 'B' }]} />
      <LoadingButton id="lb-1" label="Loading..." />
      <ShareButton id="share-1" />
      <DownloadButton id="dl-1" />
      <PrintButton id="pr-1" />
    </div>
  );
}
