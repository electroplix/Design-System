"use client";

import React, { useState } from "react";
import { Icon } from "../../core/icons";
import { useFormsTheme } from "../../core/provider";

export interface NewsletterSignupProps {
  as?: React.ElementType;
  title?: string;
  subtitle?: string;
  onSubmit?: (email: string) => void;
  buttonText?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  inputBg?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  titleSize?: number;
  subtitleSize?: number;
  inputSize?: number;
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
  success: "#16a34a",
  successSoft: "#f0fdf4",
  ring: "rgba(9,9,11,0.08)",
};

export function NewsletterSignup(props: NewsletterSignupProps) {
  const t = useFormsTheme();

  const {
    as: Tag = "section",
    title = "Stay Updated",
    subtitle = "Get the latest news delivered to your inbox.",
    onSubmit,
    buttonText = "Subscribe",
    bgColor,
    textColor,
    accentColor,
    borderColor,
    inputBg,
    fontFamily = t.fontFamily,
    maxW = t.maxW ?? 700,
    px = t.px ?? 24,
    py = t.py ?? 24,
    radius = t.cardRadius ?? 16,
    gap = t.gap ?? 16,
    titleSize = 20,
    subtitleSize = 14,
    inputSize = 14,
    style = {},
    className = "",
  } = props;

  const bg = bgColor ?? t.bgColor ?? ui.white;
  const fg = textColor ?? t.textColor ?? ui.text;
  const accent = accentColor ?? t.accentColor ?? ui.black;
  const border = borderColor ?? t.borderColor ?? ui.border;
  const inputSurface = inputBg ?? t.inputBg ?? ui.white;

  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
    setSubmitted(true);
  };

  return (
    <Tag
      className={className}
      style={{
        background: bg,
        color: fg,
        fontFamily,
        padding: `${py}px ${px}px`,
        borderRadius: radius,
        border: `1px solid ${border}`,
        boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
        ...style,
      }}
    >
      <div
        style={{
          marginInline: "auto",
          maxWidth: maxW,
          display: "flex",
          flexDirection: "column",
          gap,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: ui.black,
              border: `1px solid ${ui.black}`,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 1px 2px rgba(9,9,11,0.12)",
            }}
          >
            <Icon
              name="mail"
              size={22}
              style={{ color: ui.white } as any}
            />
          </div>

          <div>
            <strong
              style={{
                fontSize: titleSize,
                fontWeight: 700,
                display: "block",
                color: fg,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </strong>

            <div
              style={{
                fontSize: subtitleSize,
                color: ui.muted,
                marginTop: 2,
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        {submitted ? (
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              background: ui.successSoft,
              border: `1px solid rgba(22,163,74,0.16)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              textAlign: "center",
              boxShadow: "0 1px 2px rgba(9,9,11,0.04)",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "999px",
                background: ui.success,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon
                name="check"
                size={26}
                style={{ color: ui.white } as any}
              />
            </div>

            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: fg,
              }}
            >
              You're subscribed!
            </div>

            <div
              style={{
                color: ui.muted,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              Check your inbox for a confirmation email.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: 1,
                minWidth: 200,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: isFocused ? accent : ui.muted,
                  transition: "color 0.2s ease",
                  display: "flex",
                  zIndex: 2,
                }}
              >
                <Icon name="mail" size={18} />
              </div>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 44px",
                  borderRadius: 12,
                  border: `1px solid ${isFocused ? accent : border}`,
                  background: inputSurface,
                  color: fg,
                  fontSize: inputSize,
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxShadow: isFocused
                    ? `0 0 0 4px ${ui.ring}`
                    : "0 1px 2px rgba(9,9,11,0.04)",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "14px 24px",
                borderRadius: 12,
                border: `1px solid ${ui.black}`,
                background: ui.black,
                color: ui.white,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 1px 2px rgba(9,9,11,0.12)",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {buttonText}
              <Icon name="arrow-right" size={18} />
            </button>
          </form>
        )}

        {!submitted && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 4,
            }}
          >
            {["No spam, ever", "Unsubscribe anytime", "Weekly updates"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: ui.muted,
                    fontWeight: 500,
                  }}
                >
                  <Icon
                    name="sparkles"
                    size={12}
                    style={{ color: ui.muted } as any}
                  />
                  {t}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </Tag>
  );
}