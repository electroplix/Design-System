"use client";

import React, { useState } from "react";
import { Icon } from "../../core/icons";
import { useHeroTheme } from "../../core/provider";

export interface CTAOverlayHeroProps {
  as?: React.ElementType;
  title?: string;
  subtitle?: string;
  bgImage?: string;
  overlay?: number;
  form?: boolean;
  buttonText?: string;
  onSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  inputPlaceholder?: string;
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
  ring: "rgba(9,9,11,0.08)",
};

export function CTAOverlayHero(props: CTAOverlayHeroProps) {
  const t = useHeroTheme();

  const {
    as: Tag = "section",
    title = "Transform Your Ideas Into Reality",
    subtitle = "Join thousands of creators building the future with our powerful platform.",
    bgImage,
    overlay = 0.6,
    form = true,
    buttonText = "Get Started",
    onSubmit,
    inputPlaceholder = "Enter your email",
    titleSize = 52,
    subtitleSize = 20,
    bgColor,
    textColor,
    accentColor,
    borderColor,
    fontFamily = t.fontFamily,
    minH = t.minH ?? "70vh",
    maxW = t.maxW ?? 1200,
    px = t.px ?? 24,
    py = t.py ?? 64,
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

  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tag
      className={className}
      style={{
        display: "grid",
        placeItems: "center",
        background: bgImage ? undefined : bg,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: bgImage ? ui.white : fg,
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
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: bgImage
            ? `rgba(9,9,11,${overlay})`
            : "linear-gradient(180deg, rgba(250,250,250,0.85), rgba(255,255,255,0))",
          zIndex: 0,
        }}
      />

      {!bgImage && (
        <>
          <div
            style={{
              position: "absolute",
              top: "12%",
              left: "14%",
              width: 280,
              height: 280,
              background: "rgba(9,9,11,0.04)",
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "16%",
              right: "12%",
              width: 260,
              height: 260,
              background: "rgba(9,9,11,0.035)",
              filter: "blur(70px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <div
        style={{
          width: "100%",
          maxWidth: maxW,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "grid",
          gap,
        }}
      >
        <div>
          {title && (
            <h2
              style={{
                fontSize: titleSize,
                margin: 0,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.05em",
                color: bgImage ? ui.white : fg,
              }}
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              style={{
                fontSize: subtitleSize,
                color: bgImage
                  ? "rgba(255,255,255,0.78)"
                  : ui.muted,
                marginTop: 20,
                marginBottom: 0,
                maxWidth: 640,
                marginInline: "auto",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {form ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.(
                Object.fromEntries(new FormData(e.currentTarget).entries()),
              );
            }}
            style={{
              marginTop: 8,
              display: "inline-flex",
              gap: 6,
              alignItems: "center",
              justifySelf: "center",
              background: bgImage
                ? "rgba(255,255,255,0.12)"
                : ui.white,
              padding: 6,
              borderRadius: 16,
              border: `1px solid ${
                bgImage ? "rgba(255,255,255,0.18)" : border
              }`,
              backdropFilter: "blur(12px)",
              flexWrap: "wrap",
              justifyContent: "center",
              boxShadow: bgImage
                ? "0 16px 40px rgba(0,0,0,0.18)"
                : "0 1px 2px rgba(9,9,11,0.06)",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                name="mail"
                size={18}
                style={
                  {
                    position: "absolute",
                    left: 16,
                    color: bgImage ? "rgba(255,255,255,0.7)" : ui.muted,
                  } as any
                }
              />

              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputPlaceholder}
                style={{
                  padding: "16px 16px 16px 48px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: bgImage ? ui.white : fg,
                  width: 280,
                  fontSize: 15,
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                padding: "16px 28px",
                borderRadius: 12,
                border: `1px solid ${accent}`,
                background: accent,
                color: ui.white,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: isHovered
                  ? "0 8px 24px rgba(9,9,11,0.18)"
                  : "0 1px 2px rgba(9,9,11,0.12)",
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.2s ease",
              }}
            >
              {buttonText}
              <Icon name="arrow-right" size={18} />
            </button>
          </form>
        ) : (
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "16px 32px",
                borderRadius: 12,
                border: `1px solid ${accent}`,
                background: accent,
                color: ui.white,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 1px 2px rgba(9,9,11,0.12)",
              }}
            >
              {buttonText}
              <Icon name="arrow-right" size={18} />
            </button>

            <button
              style={{
                padding: "16px 32px",
                borderRadius: 12,
                border: `1px solid ${
                  bgImage ? "rgba(255,255,255,0.22)" : border
                }`,
                background: bgImage
                  ? "rgba(255,255,255,0.1)"
                  : ui.white,
                color: bgImage ? ui.white : fg,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
                backdropFilter: "blur(8px)",
                boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
              }}
            >
              <Icon name="play" size={18} />
              Watch Demo
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            color: bgImage ? "rgba(255,255,255,0.7)" : ui.muted,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <span>✓ No credit card required</span>
          <span>✓ Free 14-day trial</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>
    </Tag>
  );
}