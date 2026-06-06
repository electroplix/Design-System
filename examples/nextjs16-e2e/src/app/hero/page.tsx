'use client';
import {
  CTAOverlayHero,
  CarouselHero,
  HeroShell,
  PatternedHero,
  SplitHero,
  StaticHero,
  VideoHeaderHero,
} from '@electroplix/components';

export default function HeroTest() {
  return (
    <div>
      <h1>Hero</h1>
      <HeroShell id="hs-1" data-testid="hero-shell" />
      <StaticHero id="sh-1" title="Static Hero" subtitle="Test" />
      <CarouselHero
        id="ch-1"
        slides={[{ image: 'https://placehold.co/800x400', title: 'Slide' }]}
      />
      <CTAOverlayHero id="cta-1" title="CTA" buttonText="Go" />
      <PatternedHero id="ph-1" pattern="grid" title="Patterned" />
      <SplitHero id="sph-1" title="Split" subtitle="Left/Right" />
      <VideoHeaderHero id="vh-1" videoSrc="https://example.com/video.mp4" title="Video Hero" />
    </div>
  );
}
