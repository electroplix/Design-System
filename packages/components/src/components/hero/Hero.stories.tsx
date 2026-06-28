import type { Meta, StoryObj } from '@storybook/react';
import {
  CTAOverlayHero,
  CarouselHero,
  HeroShell,
  ImageHero,
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

export const HeroShellStory: Story = {
  render: () => (
    <HeroShell>
      <div style={{ textAlign: 'center', padding: 40 }}>
        <h2>Hero Shell Layout</h2>
        <p>Wraps any content in a consistent hero container.</p>
      </div>
    </HeroShell>
  ),
};

export const StaticHeroStory: Story = {
  render: () => (
    <StaticHero title="Welcome to Electroplix" subtitle="Build faster, ship smarter." />
  ),
};

export const SplitHeroStory: Story = {
  render: () => (
    <SplitHero
      title="Split Layout Hero"
      subtitle="Content on one side, media on the other."
      image="https://placehold.co/600x400"
    />
  ),
};

export const ImageHeroStory: Story = {
  render: () => (
    <ImageHero
      eyebrow="Welcome"
      title="Build Something"
      titleAccent="Amazing"
      subtitle="The all-in-one platform for modern teams."
      ctaLabel="Get Started"
      ctaSecondaryLabel="Learn More"
      imageSrc="https://placehold.co/600x400"
      imageAlt="Hero image"
      stats={[
        { value: '10K+', label: 'Users' },
        { value: '99.9%', label: 'Uptime' },
      ]}
    />
  ),
};

export const CarouselHeroStory: Story = {
  render: () => (
    <CarouselHero
      slides={[
        { title: 'Slide 1', image: 'https://placehold.co/800x400' },
        { title: 'Slide 2', image: 'https://placehold.co/800x400' },
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
      buttonText="Sign Up"
      bgImage="https://placehold.co/1200x600"
    />
  ),
};

export const PatternedHeroStory: Story = {
  render: () => <PatternedHero title="Patterned Background" pattern="dots" />,
};
