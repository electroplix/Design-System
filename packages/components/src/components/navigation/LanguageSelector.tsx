"use client";
import React, { useState } from "react";
import { Icon } from "../../core/icons";
import { useNavTheme } from "../../core/provider";

export type Language = {
  code: string;
  label: string;
  flag?: string;
};

export interface LanguageSelectorProps {
  as?: React.ElementType;
  languages: Language[];
  current: string;
  onChange?: (code: string) => void;
  px?: number;
  py?: number;
  radius?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function LanguageSelector(props: LanguageSelectorProps) {
  const t = useNavTheme();

  const {
    as: Tag = "div",
    languages,
    current,
    onChange,
    px = 14,
    py = 10,
    radius = 12,
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

  const [open, setOpen] = useState(false);

  const currentLang =
    languages.find((l) => l.code === current) ?? languages[0];

  return (
    <Tag
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily,
        ...style,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: `${py}px ${px}px`,
          borderRadius: radius,
          border: `1px solid ${borderColor}`,
          background: bgColor,
          color: textColor,
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 14,
          boxShadow: "0 1px 2px rgba(9, 9, 11, 0.03)",
          transition: "all 0.2s ease",
        }}
      >
        {currentLang?.flag ? (
          <span style={{ fontSize: 18 }}>{currentLang.flag}</span>
        ) : (
          <Icon name="globe" size={16} color={mutedColor} />
        )}

        <span>{currentLang?.label}</span>

        <Icon
          name="chevron-down"
          size={16}
          color={mutedColor}
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            minWidth: "100%",
            background: "#ffffff",
            border: `1px solid ${borderColor}`,
            borderRadius: radius,
            padding: 6,
            zIndex: 50,
            boxShadow:
              "0 12px 30px rgba(9, 9, 11, 0.10), 0 2px 8px rgba(9, 9, 11, 0.04)",
          }}
        >
          {languages.map((lang) => {
            const isActive = lang.code === current;

            return (
              <button
                key={lang.code}
                onClick={() => {
                  onChange?.(lang.code);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: isActive
                    ? `1px solid ${borderColor}`
                    : "1px solid transparent",
                  background: isActive ? surfaceColor : "transparent",
                  color: isActive ? accentColor : textColor,
                  cursor: "pointer",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 14,
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                {lang.flag && (
                  <span style={{ fontSize: 16 }}>{lang.flag}</span>
                )}

                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </Tag>
  );
}