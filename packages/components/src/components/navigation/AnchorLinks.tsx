"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "../../core/icons";
import { useNavTheme } from "../../core/provider";

export type AnchorItem = { label: string; targetId: string };

export interface AnchorLinksProps {
  as?: React.ElementType;
  items: AnchorItem[];
  orientation?: "horizontal" | "vertical";
  offset?: number;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function AnchorLinks(props: AnchorLinksProps) {
  const t = useNavTheme();

  const {
    as: Tag = "nav",
    items,
    orientation = "horizontal",
    offset = 80,
    maxW = 1100,
    px = 20,
    py = 12,
    radius = t.radius ?? 16,
    gap = 8,
    bgColor = t.bgColor ?? "#ffffff",
    textColor = t.textColor ?? "#09090b",
    accentColor = t.accentColor ?? "#18181b",
    borderColor = t.borderColor ?? "#e4e4e7",
    fontFamily = t.fontFamily,
    style = {},
    className = "",
  } = props;

  const mutedColor = "#71717a";
  const surfaceColor = "#fafafa";

  const [active, setActive] = useState<string | null>(
    items[0]?.targetId ?? null
  );

  useEffect(() => {
    const onScroll = () => {
      for (const it of items) {
        const el = document.getElementById(it.targetId);

        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= offset + 20 && rect.bottom > offset) {
            setActive(it.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [items, offset]);

  return (
    <Tag
      className={className}
      style={{
        background: bgColor,
        color: textColor,
        fontFamily,
        paddingInline: px,
        paddingBlock: py,
        borderRadius: radius,
        border: `1px solid ${borderColor}`,
        boxShadow: "0 1px 2px rgba(9, 9, 11, 0.04)",
        ...style,
      }}
    >
      <div style={{ marginInline: "auto", maxWidth: maxW }}>
        <div
          style={{
            display: "flex",
            flexDirection: orientation === "vertical" ? "column" : "row",
            gap,
            alignItems: orientation === "vertical" ? "stretch" : "center",
          }}
        >
          {items.map((it) => {
            const isActive = active === it.targetId;

            return (
              <a
                key={it.targetId}
                href={`#${it.targetId}`}
                onClick={(e) => {
                  e.preventDefault();

                  const el = document.getElementById(it.targetId);

                  if (el) {
                    window.scrollTo({
                      top: el.offsetTop - offset,
                      behavior: "smooth",
                    });

                    setActive(it.targetId);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: isActive ? surfaceColor : "transparent",
                  color: isActive ? accentColor : mutedColor,
                  textDecoration: "none",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  transition: "all 0.2s ease",
                  border: isActive
                    ? `1px solid ${borderColor}`
                    : "1px solid transparent",
                  boxShadow: isActive
                    ? "0 1px 2px rgba(9, 9, 11, 0.03)"
                    : "none",
                }}
              >
                {isActive && (
                  <Icon name="link-2" size={14} color={accentColor} />
                )}

                {it.label}
              </a>
            );
          })}
        </div>
      </div>
    </Tag>
  );
}