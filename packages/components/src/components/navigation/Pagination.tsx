'use client';
import React, { useMemo } from 'react';
import { Icon } from '../../core/icons';
import { useNavTheme } from '../../core/provider';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (n: number) => void;
  maxVisible?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  radius?: number;
  gap?: number;
}

export function Pagination(props: PaginationProps) {
  const t = useNavTheme();

  const {
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 5,
    showFirstLast = true,
    showPrevNext = true,
    bgColor = t.bgColor ?? '#ffffff',
    textColor = t.textColor ?? '#09090b',
    accentColor = t.accentColor ?? '#18181b',
    borderColor = t.borderColor ?? '#e4e4e7',
    fontFamily = t.fontFamily,
    fontSize = 14,
    radius = 10,
    gap = 8,
  } = props;

  const mutedColor = '#71717a';
  const surfaceColor = '#fafafa';

  const pages = useMemo(() => {
    const arr: (number | '...')[] = [];

    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);

    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      arr.push(1);

      if (start > 2) arr.push('...');
    }

    for (let i = start; i <= end; i++) {
      arr.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) arr.push('...');

      arr.push(totalPages);
    }

    return arr;
  }, [totalPages, currentPage, maxVisible]);

  const Btn = ({
    children,
    page,
    active,
    disabled,
    icon,
  }: {
    children?: React.ReactNode;
    page?: number;
    active?: boolean;
    disabled?: boolean;
    icon?: boolean;
  }) => (
    <button
      disabled={disabled}
      onClick={() => page && onPageChange(page)}
      style={{
        width: icon ? 40 : 'auto',
        minWidth: icon ? 'auto' : 40,
        height: 40,
        padding: icon ? 0 : '0 14px',
        borderRadius: radius,
        border: active ? `1px solid ${accentColor}` : `1px solid ${borderColor}`,
        background: active ? accentColor : '#ffffff',
        color: active ? '#ffffff' : disabled ? '#a1a1aa' : textColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: active ? 700 : 500,
        fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        boxShadow: active ? '0 1px 2px rgba(9, 9, 11, 0.08)' : '0 1px 2px rgba(9, 9, 11, 0.03)',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        fontFamily,
        padding: 8,
        borderRadius: radius + 4,
        background: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
    >
      {showFirstLast && (
        <Btn page={1} disabled={currentPage === 1} icon>
          <Icon name="chevrons-left" size={16} color={currentPage === 1 ? '#a1a1aa' : mutedColor} />
        </Btn>
      )}

      {showPrevNext && (
        <Btn page={currentPage - 1} disabled={currentPage === 1} icon>
          <Icon name="chevron-left" size={16} color={currentPage === 1 ? '#a1a1aa' : mutedColor} />
        </Btn>
      )}

      {pages.map((pg, i) =>
        pg === '...' ? (
          <span
            key={`e-${i}`}
            style={{
              padding: '0 8px',
              color: mutedColor,
              fontSize,
              userSelect: 'none',
            }}
          >
            …
          </span>
        ) : (
          <Btn key={pg} page={pg as number} active={pg === currentPage}>
            {pg}
          </Btn>
        ),
      )}

      {showPrevNext && (
        <Btn page={currentPage + 1} disabled={currentPage === totalPages} icon>
          <Icon
            name="chevron-right"
            size={16}
            color={currentPage === totalPages ? '#a1a1aa' : mutedColor}
          />
        </Btn>
      )}

      {showFirstLast && (
        <Btn page={totalPages} disabled={currentPage === totalPages} icon>
          <Icon
            name="chevrons-right"
            size={16}
            color={currentPage === totalPages ? '#a1a1aa' : mutedColor}
          />
        </Btn>
      )}
    </div>
  );
}
