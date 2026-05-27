'use client';
import { Icon } from '../../core/icons';
import { useNavTheme } from '../../core/provider';

export type Step = {
  label: string;
  description?: string;
};

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  showNumbers?: boolean;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function Stepper(props: StepperProps) {
  const t = useNavTheme();

  const {
    steps,
    currentStep,
    orientation = 'horizontal',
    showNumbers = true,
    bgColor = t.bgColor ?? '#ffffff',
    textColor = t.textColor ?? '#09090b',
    accentColor = t.accentColor ?? '#18181b',
    borderColor = t.borderColor ?? '#e4e4e7',
    fontFamily = t.fontFamily,
  } = props;

  const mutedColor = '#71717a';
  const surfaceColor = '#fafafa';
  const successColor = '#16a34a';

  const idx = currentStep;

  return (
    <div
      style={{
        fontFamily,
        padding: 20,
        borderRadius: 16,
        background: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      <ol
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap: orientation === 'vertical' ? 24 : 0,
          alignItems: orientation === 'vertical' ? 'stretch' : 'center',
          justifyContent: orientation === 'horizontal' ? 'space-between' : 'flex-start',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {steps.map((s, i) => {
          const isDone = i < idx;
          const isActive = i === idx;
          const isLast = i === steps.length - 1;

          return (
            <li
              key={s.label}
              style={{
                display: 'flex',
                alignItems: orientation === 'vertical' ? 'flex-start' : 'center',
                flex: orientation === 'horizontal' && !isLast ? 1 : 'none',
                gap: orientation === 'vertical' ? 12 : 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isDone ? successColor : isActive ? accentColor : surfaceColor,
                    border:
                      isDone || isActive
                        ? `1px solid ${isDone ? successColor : accentColor}`
                        : `1px solid ${borderColor}`,
                    color: isDone || isActive ? '#ffffff' : mutedColor,
                    fontWeight: 700,
                    fontSize: 14,
                    boxShadow: isActive
                      ? '0 1px 2px rgba(9, 9, 11, 0.08)'
                      : '0 1px 2px rgba(9, 9, 11, 0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isDone ? (
                    <Icon name="check" size={16} color="#ffffff" />
                  ) : showNumbers ? (
                    i + 1
                  ) : (
                    <Icon name="circle" size={8} color={isActive ? '#ffffff' : mutedColor} />
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: isDone || isActive ? textColor : mutedColor,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {s.label}
                  </div>

                  {s.description && (
                    <div
                      style={{
                        fontSize: 12,
                        color: mutedColor,
                        marginTop: 2,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.description}
                    </div>
                  )}
                </div>
              </div>

              {orientation === 'horizontal' && !isLast && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    marginInline: 16,
                    background: isDone ? accentColor : borderColor,
                    borderRadius: 999,
                    transition: 'background 0.2s ease',
                  }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
