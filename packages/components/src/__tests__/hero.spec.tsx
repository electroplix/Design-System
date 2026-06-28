import { fireEvent, render, screen } from '@testing-library/react';
/**
 * @electroplix/components – hero tests
 */
import type React from 'react';
import {
  CTAOverlayHero,
  CarouselHero,
  HeroShell,
  PatternedHero,
  SplitHero,
  StaticHero,
  VideoHeaderHero,
} from '../components/hero';
import { TestWrapper } from './test-utils';

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

  it('HeroShell renders children', () => {
    wrap(
      <HeroShell>
        <span>Custom Content</span>
      </HeroShell>,
    );
    expect(screen.getByText('Custom Content')).toBeTruthy();
  });

  it('StaticHero renders', () => {
    const { container } = wrap(<StaticHero headline="Hello" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('StaticHero displays title', () => {
    wrap(<StaticHero title="Welcome" />);
    expect(screen.getByText('Welcome')).toBeTruthy();
  });

  it('CarouselHero renders', () => {
    const { container } = wrap(<CarouselHero slides={[{ image: 'test.jpg', title: 'Slide 1' }]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('CTAOverlayHero renders', () => {
    const { container } = wrap(<CTAOverlayHero title="CTA" buttonText="Click" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('PatternedHero renders', () => {
    const { container } = wrap(<PatternedHero title="Pattern" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('SplitHero renders', () => {
    const { container } = wrap(<SplitHero title="Split" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('SplitHero displays title and subtitle', () => {
    wrap(<SplitHero title="Hero Title" subtitle="Hero Subtitle" />);
    expect(screen.getByText('Hero Title')).toBeTruthy();
    expect(screen.getByText('Hero Subtitle')).toBeTruthy();
  });

  it('VideoHeaderHero renders', () => {
    const { container } = wrap(<VideoHeaderHero videoSrc="test.mp4" title="Video" />);
    expect(container.firstChild).toBeTruthy();
  });

  describe('StaticHero CTA', () => {
    it('calls onCta when CTA button clicked', () => {
      const onCta = jest.fn();
      wrap(<StaticHero title="Test" ctaLabel="Click Me" onCta={onCta} />);
      fireEvent.click(screen.getByText('Click Me'));
      expect(onCta).toHaveBeenCalledTimes(1);
    });
  });

  describe('SplitHero features', () => {
    it('renders feature list', () => {
      wrap(<SplitHero title="Features" features={['Fast', 'Secure', 'Reliable']} />);
      expect(screen.getByText('Fast')).toBeTruthy();
      expect(screen.getByText('Secure')).toBeTruthy();
      expect(screen.getByText('Reliable')).toBeTruthy();
    });
  });
});
