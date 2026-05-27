"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "../../core/icons";
import { useHeroTheme } from "../../core/provider";

export type Slide = {
  image: string;
  title?: string;
  subtitle?: string;
};

export interface CarouselHeroProps {
  as?: React.ElementType;
  slides?: Slide[];
  autoplay?: boolean;
  intervalMs?: number;
  titleSize?: number;
  subtitleSize?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  minH?: string | number;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
}

const ui = {
  white: "#ffffff",
  black: "#09090b",
  text: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  surface: "#fafafa",
  surfaceHover: "#f4f4f5",
  overlay: "rgba(9,9,11,0.72)",
};

export function CarouselHero(props: CarouselHeroProps) {
  const t = useHeroTheme();

  const {
    as: Tag = "section",
    slides: rawSlides,
    autoplay = true,
    intervalMs = 4000,
    titleSize = 42,
    subtitleSize = 18,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? "70vh",
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 48,
    radius = t.cardRadius ?? 20,
    gap = t.gap ?? 24,
    style = {},
    className = "",
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border =
    borderColor ?? t.cardBorder ?? t.borderColor ?? ui.border;

  const slides =
    Array.isArray(rawSlides) && rawSlides.length > 0
      ? rawSlides
      : [
          {
            image: "",
            title: "Welcome to Our Platform",
            subtitle: "Discover amazing features",
          },
          {
            image: "",
            title: "Built for Speed",
            subtitle: "Lightning fast performance",
          },
          {
            image: "",
            title: "Modern Design",
            subtitle: "Beautiful and responsive",
          },
        ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;

    const id = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [autoplay, slides.length, intervalMs]);

  const current = slides[idx] || {
    image: "",
    title: "",
    subtitle: "",
  };

  const prev = () =>
    setIdx((i) => (i - 1 + slides.length) % slides.length);

  const next = () => setIdx((i) => (i + 1) % slides.length);

  return (
    <Tag
      className={className}
      style={{
        display: "grid",
        placeItems: "center",
        background: bg,
        color: fg,
        fontFamily,
        minHeight: typeof minH === "number" ? `${minH}px` : minH,
        padding: `${py}px ${px}px`,
        borderRadius: radius,
        border: `1px solid ${border}`,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(250,250,250,0.7), rgba(255,255,255,0))",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          display: "grid",
          gap,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 400,
            borderRadius: 16,
            overflow: "hidden",
            background: ui.surface,
            border: `1px solid ${border}`,
            boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
          }}
        >
          {current.image ? (
            <img
              src={current.image}
              alt={current.title || `slide-${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.5s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: ui.surface,
                color: ui.muted,
              }}
            >
              <Icon
                name="image"
                size={64}
                color={ui.muted}
                style={{ opacity: 0.55 }}
              />

              <span
                style={{
                  marginTop: 12,
                  color: ui.muted,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Slide {idx + 1}
              </span>
            </div>
          )}

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "999px",
                  border: `1px solid rgba(255,255,255,0.18)`,
                  background: ui.overlay,
                  color: ui.white,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 24px rgba(9,9,11,0.16)",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon name="chevron-left" size={24} />
              </button>

              <button
                type="button"
                onClick={next}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "999px",
                  border: `1px solid rgba(255,255,255,0.18)`,
                  background: ui.overlay,
                  color: ui.white,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 24px rgba(9,9,11,0.16)",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon name="chevron-right" size={24} />
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          {current.title && (
            <h2
              style={{
                fontSize: titleSize,
                margin: 0,
                fontWeight: 700,
                color: fg,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              {current.title}
            </h2>
          )}

          {current.subtitle && (
            <p
              style={{
                fontSize: subtitleSize,
                color: ui.muted,
                marginTop: 12,
                marginBottom: 0,
                lineHeight: 1.6,
              }}
            >
              {current.subtitle}
            </p>
          )}
        </div>

        {slides.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === idx ? 32 : 10,
                  height: 10,
                  borderRadius: 999,
                  border: `1px solid ${
                    i === idx ? accent : border
                  }`,
                  background: i === idx ? accent : ui.white,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow:
                    i === idx
                      ? "0 1px 2px rgba(9,9,11,0.12)"
                      : "0 1px 2px rgba(9,9,11,0.04)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Tag>
  );
}