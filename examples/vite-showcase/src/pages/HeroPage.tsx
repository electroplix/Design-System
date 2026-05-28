import {
  CTAOverlayHero,
  CarouselHero,
  HeroShell,
  PatternedHero,
  SplitHero,
  StaticHero,
  VideoHeaderHero,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';

export default function HeroPage() {
  return (
    <CategoryPage
      slug="hero"
      title="Hero"
      description="Above-the-fold heroes with patterns, video, carousels, CTAs."
      componentCount={7}
    >
      <ComponentDemo name="HeroShell">
        <HeroShell>
          <h2>Custom hero content</h2>
          <p>Use HeroShell to wrap your own composition.</p>
        </HeroShell>
      </ComponentDemo>
      <ComponentDemo name="StaticHero">
        <StaticHero
          title="Modern Component Library"
          subtitle="Robust, Enterprise-Ready Design System"
          ctaLabel="Explore Components"
        />
      </ComponentDemo>
      <ComponentDemo name="CarouselHero">
        <CarouselHero
          slides={[
            {
              image: 'https://placehold.co/1200x400/0b0b0c/ffffff?text=Slide+One',
              title: 'Slide one',
              subtitle: 'First slide description',
            },
            {
              image: 'https://placehold.co/1200x400/8B5CF6/ffffff?text=Slide+Two',
              title: 'Slide two',
              subtitle: 'Second slide description',
            },
          ]}
        />
      </ComponentDemo>
      <ComponentDemo name="CTAOverlayHero">
        <CTAOverlayHero
          title="Ship faster"
          subtitle="Launch your next product in days, not months."
          buttonText="Try it free"
        />
      </ComponentDemo>
      <ComponentDemo name="PatternedHero">
        <PatternedHero
          title="Patterned background"
          subtitle="Decorative patterns supported."
          pattern="dots"
        />
      </ComponentDemo>
      <ComponentDemo name="SplitHero">
        <SplitHero title="Split-layout hero" subtitle="Text on one side, media on the other." />
      </ComponentDemo>
      <ComponentDemo name="VideoHeaderHero">
        <VideoHeaderHero
          videoSrc="https://example.com/video.mp4"
          title="Video hero"
          subtitle="Background video supported."
        />
      </ComponentDemo>
    </CategoryPage>
  );
}
