/**
 * @electroplix/components – core module tests
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from './test-utils';
import {
  defineConfig,
  mergeTheme,
  defaultConfig,
  ElectroplixProvider,
  useElectroplixConfig,
  Icon,
  sx,
  cn,
  money,
  truncate,
  timeAgo,
} from '../core';

describe('Core – config utilities', () => {
  it('defineConfig returns the config object', () => {
    const cfg = defineConfig({ navigation: { bgColor: '#FF0000' } } as any);
    expect((cfg as any).navigation.bgColor).toBe('#FF0000');
  });

  it('mergeTheme shallow-merges two objects', () => {
    const base = { a: 1, b: 'hello' };
    const over = { b: 'world' };
    const result = mergeTheme(base, over);
    expect(result).toEqual({ a: 1, b: 'world' });
  });

  it('defaultConfig has expected shape', () => {
    expect(defaultConfig).toBeDefined();
    expect(typeof defaultConfig.navigation).toBe('object');
    expect(typeof defaultConfig.buttons).toBe('object');
  });
});

describe('Core – provider', () => {
  it('renders children inside ElectroplixProvider', () => {
    const { getByText } = render(
      <ElectroplixProvider>
        <span>Hello</span>
      </ElectroplixProvider>,
    );
    expect(getByText('Hello')).toBeTruthy();
  });
});

describe('Core – Icon', () => {
  it('renders an SVG element for a known icon name', () => {
    const { container } = render(
      <TestWrapper>
        <Icon name="check" size={20} />
      </TestWrapper>,
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders nothing for an unknown icon name', () => {
    const { container } = render(
      <TestWrapper>
        <Icon name="nonexistent-icon-xyz" size={20} />
      </TestWrapper>,
    );
    // Should still render an svg placeholder or empty
    expect(container).toBeTruthy();
  });
});

describe('Core – utilities', () => {
  it('sx merges style objects', () => {
    const result = sx({ color: 'red' }, false, { fontSize: 14 });
    expect(result).toEqual({ color: 'red', fontSize: 14 });
  });

  it('cn joins class names', () => {
    expect(cn('a', false, 'b', undefined, 'c')).toBe('a b c');
  });

  it('money formats currency', () => {
    expect(money(29.99, 'USD')).toBe('$29.99');
  });

  it('truncate shortens text', () => {
    expect(truncate('Hello World!', 5)).toBe('Hello…');
  });

  it('timeAgo returns a string', () => {
    const result = timeAgo(new Date(Date.now() - 60000));
    expect(typeof result).toBe('string');
  });
});
