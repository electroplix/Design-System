import {
  AudioEmbed,
  AvatarProfile,
  IconGrid,
  ImageCropperUploader,
  ImageGallery,
  LightboxGallery,
  LottieOrSVG,
  MapEmbed,
  MasonryGrid,
  MediaShell,
  PolaroidImage,
  ResponsiveVideo,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleGalleryItems } from '../data/samples';

const noop = () => {};

export default function MediaPage() {
  return (
    <CategoryPage
      slug="media"
      title="Media"
      description="Video, audio, galleries, avatars, maps, image tools."
      componentCount={12}
    >
      <ComponentDemo name="MediaShell">
        <MediaShell>
          <span>Custom media composition.</span>
        </MediaShell>
      </ComponentDemo>
      <ComponentDemo name="ResponsiveVideo">
        <ResponsiveVideo src="https://example.com/sample.mp4" />
      </ComponentDemo>
      <ComponentDemo name="AudioEmbed">
        <AudioEmbed src="https://example.com/sample.mp3" title="Sample track" />
      </ComponentDemo>
      <ComponentDemo name="AvatarProfile">
        <AvatarProfile name="Alice Chen" subtitle="Engineer" />
      </ComponentDemo>
      <ComponentDemo name="IconGrid">
        <IconGrid
          icons={[
            { id: '1', name: 'star', label: 'Star' },
            { id: '2', name: 'heart', label: 'Heart' },
            { id: '3', name: 'check', label: 'Check' },
            { id: '4', name: 'plus', label: 'Plus' },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="ImageGallery">
        <ImageGallery items={sampleGalleryItems} columns={4} />
      </ComponentDemo>
      <ComponentDemo name="LightboxGallery">
        <LightboxGallery items={sampleGalleryItems} columns={4} />
      </ComponentDemo>
      <ComponentDemo name="MasonryGrid">
        <MasonryGrid items={sampleGalleryItems} columns={3} />
      </ComponentDemo>
      <ComponentDemo name="PolaroidImage">
        <PolaroidImage
          src="https://placehold.co/300x200/0b0b0c/ffffff?text=Polaroid"
          caption="Vacation 2026"
        />
      </ComponentDemo>
      <ComponentDemo name="LottieOrSVG">
        <LottieOrSVG type="svg" src="https://example.com/icon.svg" />
      </ComponentDemo>
      <ComponentDemo name="ImageCropperUploader">
        <ImageCropperUploader onUpload={noop} />
      </ComponentDemo>
      <ComponentDemo name="MapEmbed">
        <MapEmbed lat={40.7128} lng={-74.006} zoom={11} provider="openstreetmap" />
      </ComponentDemo>
    </CategoryPage>
  );
}
