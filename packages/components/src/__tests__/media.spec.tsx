import { render } from '@testing-library/react';
/**
 * @electroplix/components – media tests
 */
import type React from 'react';
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
} from '../components/media';
import { TestWrapper } from './test-utils';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);
const noop = () => {};

describe('Media components', () => {
  it('MediaShell renders', () => {
    const { container } = wrap(
      <MediaShell>
        <span>content</span>
      </MediaShell>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('ResponsiveVideo renders', () => {
    const { container } = wrap(<ResponsiveVideo src="test.mp4" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AudioEmbed renders', () => {
    const { container } = wrap(<AudioEmbed src="audio.mp3" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('AvatarProfile renders', () => {
    const { container } = wrap(<AvatarProfile name="Alice" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('IconGrid renders', () => {
    const { container } = wrap(<IconGrid icons={[{ id: '1', name: 'star', label: 'Star' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ImageGallery renders', () => {
    const { container } = wrap(<ImageGallery items={[{ id: '1', src: 'img.jpg', alt: 'test' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('LightboxGallery renders', () => {
    const { container } = wrap(
      <LightboxGallery items={[{ id: '1', src: 'img.jpg', alt: 'test' }]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('MasonryGrid renders', () => {
    const { container } = wrap(<MasonryGrid items={[{ id: '1', src: 'img.jpg', alt: 'test' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PolaroidImage renders', () => {
    const { container } = wrap(<PolaroidImage src="photo.jpg" caption="Vacation" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('LottieOrSVG renders', () => {
    const { container } = wrap(<LottieOrSVG type="svg" src="/icon.svg" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('ImageCropperUploader renders', () => {
    const { container } = wrap(<ImageCropperUploader onUpload={noop} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('MapEmbed renders with address', () => {
    const { container } = wrap(<MapEmbed address="123 Main St" title="Our Location" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('MapEmbed renders with coordinates', () => {
    const { container } = wrap(
      <MapEmbed lat={40.7128} lng={-74.006} zoom={12} provider="openstreetmap" />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
