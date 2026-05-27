"use client";
import React from "react";
import { Icon } from "../../core/icons";
import { useFormsTheme } from "../../core/provider";

export interface ValidationWrapperProps {
  as?: React.ElementType;
  errors?: string[];
  title?: string;
  children?: React.ReactNode;
  success?: boolean;
  successMessage?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
  maxW?: number;
  px?: number;
  py?: number;
  radius?: number;
  gap?: number;
  titleSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function ValidationWrapper(props: ValidationWrapperProps) {
  const t = useFormsTheme();
  const { as: Tag = "div", errors = [], title = "Please fix the following", children, success = false, successMessage = "All validations passed!", bgColor = t.bgColor, textColor = t.textColor, accentColor = t.accentColor, borderColor = t.borderColor, fontFamily = t.fontFamily, maxW = t.maxW ?? 700, px = t.px ?? 24, py = t.py ?? 24, radius = t.cardRadius ?? 16, gap = t.gap ?? 16, titleSize = 14, style = {}, className = "" } = props;
  const safeErrors = Array.isArray(errors) ? errors : [];
  const hasErrors = safeErrors.length > 0;
  const showSuccess = success && !hasErrors;

  return (
    <Tag className={className} style={{ background: bgColor, color: textColor, fontFamily, padding: `${py}px ${px}px`, borderRadius: radius, border: `1px solid ${borderColor}`, ...style }}>
      <div style={{ marginInline: "auto", maxWidth: maxW, display: "flex", flexDirection: "column" as const, gap }}>
        {children && <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${borderColor}` }}>{children}</div>}
        {showSuccess && (
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#22C55E", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="check-circle" size={18} style={{ color: "#fff" } as any} /></div>
            <span style={{ fontWeight: 500, color: "#22C55E" }}>{successMessage}</span>
          </div>
        )}
        {hasErrors && (
          <div style={{ padding: 16, borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><Icon name="alert-circle" size={18} style={{ color: "#EF4444" } as any} /><strong style={{ fontSize: titleSize, color: "#EF4444" }}>{title}</strong></div>
            <ul style={{ margin: 0, paddingInlineStart: 0, listStyle: "none" }}>
              {safeErrors.map((e, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: i < safeErrors.length - 1 ? "1px solid rgba(239,68,68,0.2)" : "none" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(239,68,68,0.2)", display: "grid", placeItems: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: "#EF4444" }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: "#F87171", lineHeight: 1.5 }}>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Tag>
  );
}
