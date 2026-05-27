"use client";
import React, { useState } from "react";
import { Icon } from "../../core/icons";
import { useFormsTheme } from "../../core/provider";

export type SelectOption = { label: string; value: string; disabled?: boolean };
export interface SelectDropdownProps {
  as?: React.ElementType;
  name: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  label?: string;
  placeholder?: string;
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
  labelSize?: number;
  selectSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function SelectDropdown(props: SelectDropdownProps) {
  const t = useFormsTheme();
  const { as: Tag = "div", name = "select", options = [], value, defaultValue, onChange, label = "Select an option", placeholder = "Choose...", bgColor = t.bgColor, textColor = t.textColor, accentColor = t.accentColor, borderColor = t.borderColor, inputBg = t.inputBg ?? "rgba(255,255,255,0.05)", fontFamily = t.fontFamily, maxW = t.maxW ?? 700, px = t.px ?? 0, py = t.py ?? 0, radius = t.cardRadius ?? 12, gap = t.gap ?? 12, labelSize = 13, selectSize = 14, style = {}, className = "" } = props;
  const [local, setLocal] = useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const current = value ?? local;
  const safeOpts = Array.isArray(options) ? options : [];
  const sel = safeOpts.find((o) => o.value === current);

  return (
    <Tag className={className} style={{ background: bgColor, color: textColor, fontFamily, padding: `${py}px ${px}px`, ...style }}>
      <div style={{ maxWidth: maxW, display: "flex", flexDirection: "column" as const, gap }}>
        {label && <label htmlFor={name} style={{ fontSize: labelSize, fontWeight: 600 }}>{label}</label>}
        <div style={{ position: "relative" as const }}>
          <button type="button" onClick={() => setIsOpen(!isOpen)} onFocus={() => setIsFocused(true)} onBlur={() => { setIsFocused(false); setTimeout(() => setIsOpen(false), 150); }} style={{ width: "100%", padding: "14px 44px 14px 14px", borderRadius: radius, border: `1px solid ${isFocused || isOpen ? accentColor : borderColor}`, background: inputBg, color: sel ? textColor : "rgba(255,255,255,0.5)", fontSize: selectSize, textAlign: "left" as const, cursor: "pointer", outline: "none", transition: "all 0.2s ease", boxShadow: isFocused || isOpen ? `0 0 0 3px ${accentColor}20` : "none", position: "relative" as const, boxSizing: "border-box" as const }}>{sel?.label || placeholder}<span style={{ position: "absolute" as const, right: 14, top: "50%", transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`, transition: "transform 0.2s ease", display: "flex" }}><Icon name="chevron-down" size={20} /></span></button>
          {isOpen && (
            <div style={{ position: "absolute" as const, top: "100%", left: 0, right: 0, marginTop: 8, background: bgColor, border: `1px solid ${borderColor}`, borderRadius: radius, overflow: "hidden", zIndex: 50, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", maxHeight: 240, overflowY: "auto" as const }}>
              {safeOpts.map((opt) => (
                <button key={opt.value} type="button" disabled={opt.disabled} onClick={() => { if (!opt.disabled) { setLocal(opt.value); onChange?.(opt.value); setIsOpen(false); } }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "12px 14px", cursor: opt.disabled ? "not-allowed" : "pointer", background: current === opt.value ? `${accentColor}15` : "transparent", opacity: opt.disabled ? 0.5 : 1, borderBottom: `1px solid ${borderColor}`, border: "none", borderBlockEnd: `1px solid ${borderColor}`, color: textColor, fontSize: 14, boxSizing: "border-box" as const, transition: "background 0.15s ease", textAlign: "left" as const }}><span>{opt.label}</span>{current === opt.value && <Icon name="check" size={16} style={{ color: accentColor } as any} />}</button>
              ))}
            </div>
          )}
          <select id={name} name={name} value={current} onChange={(e) => { setLocal(e.target.value); onChange?.(e.target.value); }} style={{ display: "none" }}>{safeOpts.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}</select>
        </div>
      </div>
    </Tag>
  );
}
