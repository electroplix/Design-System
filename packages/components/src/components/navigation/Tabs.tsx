'use client';
import { type ReactNode, useState } from 'react';
import { useNavTheme } from '../../core/provider';

export type TabDef = {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  tabs: TabDef[];
  defaultTab?: number;
  orientation?: 'horizontal' | 'vertical';
  showUnderline?: boolean;
  radius?: number;
  padding?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function Tabs({
  tabs,
  defaultTab = 0,
  orientation = 'horizontal',
  showUnderline = false,
  radius: radiusProp,
  padding = 12,
  gap = 8,
  bgColor: bgColorProp,
  textColor: textColorProp,
  accentColor: accentColorProp,
  borderColor: borderColorProp,
  fontFamily: fontFamilyProp,
  className,
  style,
  ...rest
}: TabsProps) {
  const t = useNavTheme();

  const radius = radiusProp ?? t.radius ?? 14;
  const bgColor = bgColorProp ?? t.bgColor ?? '#ffffff';
  const textColor = textColorProp ?? t.textColor ?? '#09090b';
  const accentColor = accentColorProp ?? t.accentColor ?? '#18181b';
  const borderColor = borderColorProp ?? t.borderColor ?? '#e4e4e7';
  const fontFamily = fontFamilyProp ?? t.fontFamily;

  const mutedColor = '#71717a';
  const surfaceColor = '#fafafa';

  const [active, setActive] = useState(defaultTab);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        fontFamily,
        background: bgColor,
        borderRadius: radius + 4,
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: orientation === 'vertical' ? 'column' : 'row',
            gap: 4,
            padding,
            background: surfaceColor,
            borderBottom: orientation === 'horizontal' ? `1px solid ${borderColor}` : 'none',
            borderRight: orientation === 'vertical' ? `1px solid ${borderColor}` : 'none',
            minWidth: orientation === 'vertical' ? 200 : 'auto',
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = i === active;

            return (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: radius,
                  border: isActive ? `1px solid ${borderColor}` : '1px solid transparent',
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? accentColor : mutedColor,
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  position: 'relative',
                  boxShadow: isActive ? '0 1px 2px rgba(9, 9, 11, 0.03)' : 'none',
                }}
              >
                {tab.icon}

                {tab.label}

                {showUnderline && isActive && orientation === 'horizontal' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -padding - 1,
                      left: 16,
                      right: 16,
                      height: 2,
                      background: accentColor,
                      borderRadius: 999,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          style={{
            flex: 1,
            padding: 20,
            color: textColor,
            lineHeight: 1.7,
            background: '#ffffff',
          }}
        >
          {tabs[active]?.content}
        </div>
      </div>
    </div>
  );
}
