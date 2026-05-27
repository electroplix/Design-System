import type { Meta, StoryObj } from '@storybook/react';
import {
  CTAOverlayHero,
  CarouselHero,
  PatternedHero,
  SplitHero,
  StaticHero,
  VideoHeaderHero,
} from './index';

const meta: Meta = {
  title: 'Components/Hero',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const StaticHeroStory: Story = {
  render: () => (
    <StaticHero title="Welcome to Electroplix" subtitle="Build faster, ship smarter." />
  ),
};

export const SplitHeroStory: Story = {
  render: () => (
    <SplitHero
      title="Split Layout Hero"
      description="Content on one side, media on the other."
      imageSrc="https://placehold.co/600x400"
    />
  ),
};

export const CarouselHeroStory: Story = {
  render: () => (
    <CarouselHero
      slides={[
        { title: 'Slide 1', imageSrc: 'https://placehold.co/800x400' },
        { title: 'Slide 2', imageSrc: 'https://placehold.co/800x400' },
      ]}
    />
  ),
};

export const VideoHeaderHeroStory: Story = {
  render: () => <VideoHeaderHero title="Video Hero" videoSrc="https://example.com/video.mp4" />,
};

export const CTAOverlayHeroStory: Story = {
  render: () => (
    <CTAOverlayHero
      title="Get Started Today"
      ctaLabel="Sign Up"
      ctaHref="/signup"
      backgroundSrc="https://placehold.co/1200x600"
    />
  ),
};

export const PatternedHeroStory: Story = {
  render: () => <PatternedHero title="Patterned Background" pattern="dots" />,
};
