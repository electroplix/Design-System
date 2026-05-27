"use client";
import React, { ReactNode, useState } from "react";
import { Icon } from "../../core/icons";
import { useNavTheme } from "../../core/provider";

export type SidebarChild = {
  label: string;
  href: string;
};

export type SidebarItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: SidebarChild[];
};

export interface SidebarMenuProps {
  items: SidebarItem[];
  width?: number;
  padding?: number;
  gap?: number;
  radius?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function SidebarMenu(props: SidebarMenuProps) {
  const t = useNavTheme();

  const {
    items,
    width = 260,
    padding = 16,
    gap = 4,
    radius = 16,
    bgColor = t.bgColor ?? "#ffffff",
    textColor = t.textColor ?? "#09090b",
    accentColor = t.accentColor ?? "#18181b",
    borderColor = t.borderColor ?? "#e4e4e7",
    fontFamily = t.fontFamily,
  } = props;

  const mutedColor = "#71717a";
  const surfaceColor = "#fafafa";

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState("");

  const toggle = (label: string) =>
    setOpen((p) => ({
      ...p,
      [label]: !p[label],
    }));

  return (
    <aside
      style={{
        width,
        background: bgColor,
        padding,
        borderRadius: radius,
        border: `1px solid ${borderColor}`,
        fontFamily,
        boxShadow: "0 1px 2px rgba(9, 9, 11, 0.04)",
      }}
    >
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap,
        }}
      >
        {items.map((it) => {
          const hasChildren = !!it.children?.length;

          const isOpen = open[it.label];

          const isActive = active === it.label;

          return (
            <li key={it.label}>
              <button
                onClick={() => {
                  setActive(it.label);

                  if (hasChildren) toggle(it.label);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: isActive
                    ? `1px solid ${borderColor}`
                    : "1px solid transparent",
                  background: isActive ? surfaceColor : "transparent",
                  color: isActive ? accentColor : textColor,
                  cursor: "pointer",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 14,
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {it.icon}
                  {it.label}
                </span>

                {hasChildren && (
                  <Icon
                    name="chevron-down"
                    size={16}
                    color={mutedColor}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                )}
              </button>

              {hasChildren && isOpen && (
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    marginLeft: 24,
                    marginTop: 6,
                    display: "grid",
                    gap: 4,
                    borderLeft: `1px solid ${borderColor}`,
                    paddingLeft: 14,
                  }}
                >
                  {it.children?.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 12px",
                          borderRadius: 10,
                          color: mutedColor,
                          textDecoration: "none",
                          fontSize: 13,
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                          border: "1px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;

                          el.style.background = surfaceColor;
                          el.style.color = textColor;
                          el.style.borderColor = borderColor;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;

                          el.style.background = "transparent";
                          el.style.color = mutedColor;
                          el.style.borderColor = "transparent";
                        }}
                      >
                        <Icon
                          name="chevron-right"
                          size={12}
                          color={mutedColor}
                        />

                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}