'use client';
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

export default function MediaTest() {
  return (
    <div>
      <h1>Media</h1>
      <MediaShell id="ms-1" data-testid="media-shell" />
      <ResponsiveVideo id="rv-1" src="https://example.com/video.mp4" />
      <AudioEmbed id="ae-1" src="https://example.com/audio.mp3" />
      <AvatarProfile id="ap-1" name="Alice" />
      <IconGrid id="ig-1" icons={[]} />
      <ImageGallery id="img-1" items={[]} />
      <LightboxGallery id="lbg-1" items={[]} />
      <MasonryGrid id="mg-1" items={[]} />
      <PolaroidImage id="pi-1" src="https://example.com/photo.jpg" caption="Photo" />
      <LottieOrSVG id="los-1" type="svg" src="https://example.com/icon.svg" />
      <ImageCropperUploader id="icu-1" />
      <MapEmbed id="me-1" />
    </div>
  );
}
