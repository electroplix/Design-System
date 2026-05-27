/**
 * @electroplix/components – hero tests
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from './test-utils';
import {
  HeroShell,
  StaticHero,
  CarouselHero,
  CTAOverlayHero,
  PatternedHero,
  SplitHero,
  VideoHeaderHero,
} from '../components/hero';

const wrap = (ui: React.ReactElement) => render(<TestWrapper>{ui}</TestWrapper>);

describe('Hero components', () => {
  it('HeroShell renders', () => {
    const { container } = wrap(
      <HeroShell>
        <span>Hero</span>
      </HeroShell>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('StaticHero renders', () => {
    const { container } = wrap(<StaticHero headline="Hello" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('CarouselHero renders', () => {
    const { container } = wrap(<CarouselHero slides={[{ id: '1', headline: 'Slide 1' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('CTAOverlayHero renders', () => {
    const { container } = wrap(<CTAOverlayHero headline="CTA" ctaLabel="Click" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PatternedHero renders', () => {
    const { container } = wrap(<PatternedHero headline="Pattern" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('SplitHero renders', () => {
    const { container } = wrap(<SplitHero headline="Split" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('VideoHeaderHero renders', () => {
    const { container } = wrap(<VideoHeaderHero videoSrc="test.mp4" headline="Video" />);
    expect(container.firstChild).toBeTruthy();
  });
});
