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
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';

export default function ButtonsPage() {
  return (
    <CategoryPage
      slug="buttons"
      title="Buttons"
      description="Every button variant: primary, icon, FAB, group, share, more."
      componentCount={11}
    >
      <ComponentDemo name="PrimaryButton" description="Main CTA button.">
        <PrimaryButton label="Get started" />
      </ComponentDemo>
      <ComponentDemo name="SecondaryButton">
        <SecondaryButton label="Cancel" />
      </ComponentDemo>
      <ComponentDemo name="TertiaryButton">
        <TertiaryButton label="Dismiss" />
      </ComponentDemo>
      <ComponentDemo name="IconButton">
        <IconButton icon="star" ariaLabel="Favorite" />
      </ComponentDemo>
      <ComponentDemo name="Button" description="Variant-driven generic button.">
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button>Default</Button>
          <Button variant="primary" bgColor="#e94560" textColor="#fff">
            Primary Action
          </Button>
          <Button radius={0}>Square</Button>
          <Button radius={50}>Pill</Button>
          <Button shadow="0 4px 14px 0 rgba(0,118,255,0.39)">Shadow</Button>
        </div>
      </ComponentDemo>
      <ComponentDemo name="FloatingActionButton" description="Floats in the lower-right corner.">
        <div style={{ position: 'relative', minHeight: 80 }}>
          <FloatingActionButton icon="plus" ariaLabel="Add" />
        </div>
      </ComponentDemo>
      <ComponentDemo name="ButtonGroup">
        <ButtonGroup buttons={[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]} />
      </ComponentDemo>
      <ComponentDemo name="LoadingButton">
        <LoadingButton label="Save changes" />
      </ComponentDemo>
      <ComponentDemo name="ShareButton">
        <ShareButton label="Share" url="https://electroplix.com" />
      </ComponentDemo>
      <ComponentDemo name="DownloadButton">
        <DownloadButton label="Download" fileUrl="/example.pdf" />
      </ComponentDemo>
      <ComponentDemo name="PrintButton">
        <PrintButton label="Print this page" />
      </ComponentDemo>
    </CategoryPage>
  );
}
