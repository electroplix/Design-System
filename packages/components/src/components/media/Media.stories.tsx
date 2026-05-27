import type { Meta, StoryObj } from '@storybook/react';
import {
  AudioEmbed,
  IconGrid,
  ImageGallery,
  LightboxGallery,
  LottieOrSVG,
  MasonryGrid,
  PolaroidImage,
  ResponsiveVideo,
} from './index';

const meta: Meta = {
  title: 'Components/Media',
  tags: ['autodocs'],
};
export default meta;

export const ImageGalleryStory: StoryObj = {
  render: () => (
    <ImageGallery
      images={[
        { id: '1', src: 'https://via.placeholder.com/300', alt: 'Image 1' },
        { id: '2', src: 'https://via.placeholder.com/300', alt: 'Image 2' },
      ]}
    />
  ),
};

export const ResponsiveVideoStory: StoryObj = {
  render: () => (
    <ResponsiveVideo src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Sample Video" />
  ),
};

export const AudioEmbedStory: StoryObj = {
  render: () => (
    <AudioEmbed
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      title="Sample Audio"
    />
  ),
};

export const LightboxGalleryStory: StoryObj = {
  render: () => (
    <LightboxGallery
      images={[
        {
          id: '1',
          src: 'https://via.placeholder.com/600',
          thumb: 'https://via.placeholder.com/150',
          alt: 'Photo 1',
        },
        {
          id: '2',
          src: 'https://via.placeholder.com/600',
          thumb: 'https://via.placeholder.com/150',
          alt: 'Photo 2',
        },
      ]}
    />
  ),
};

export const IconGridStory: StoryObj = {
  render: () => (
    <IconGrid
      icons={[
        { id: '1', name: 'Home', icon: '🏠' },
        { id: '2', name: 'Settings', icon: '⚙️' },
        { id: '3', name: 'User', icon: '👤' },
      ]}
    />
  ),
};

export const MasonryGridStory: StoryObj = {
  render: () => (
    <MasonryGrid
      items={[
        { id: '1', src: 'https://via.placeholder.com/300x200', alt: 'Masonry 1' },
        { id: '2', src: 'https://via.placeholder.com/300x400', alt: 'Masonry 2' },
      ]}
    />
  ),
};

export const PolaroidImageStory: StoryObj = {
  render: () => <PolaroidImage src="https://via.placeholder.com/300" caption="Summer 2024" />,
};

export const LottieOrSVGStory: StoryObj = {
  render: () => <LottieOrSVG src="/animation.json" type="lottie" alt="Animation" />,
};
