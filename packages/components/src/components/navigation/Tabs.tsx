"use client";
import React, { ReactNode, useState } from "react";
import { useNavTheme } from "../../core/provider";

export type TabDef = {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

export interface TabsProps {
  tabs: TabDef[];
  defaultTab?: number;
  orientation?: "horizontal" | "vertical";
  showUnderline?: boolean;
  radius?: number;
  padding?: number;
  gap?: number;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export function Tabs(props: TabsProps) {
  const t = useNavTheme();

  const {
    tabs,
    defaultTab = 0,
    orientation = "horizontal",
    showUnderline = false,
    radius = t.radius ?? 14,
    padding = 12,
    gap = 8,
    bgColor = t.bgColor ?? "#ffffff",
    textColor = t.textColor ?? "#09090b",
    accentColor = t.accentColor ?? "#18181b",
    borderColor = t.borderColor ?? "#e4e4e7",
    fontFamily = t.fontFamily,
  } = props;

  const mutedColor = "#71717a";
  const surfaceColor = "#fafafa";

  const [active, setActive] = useState(defaultTab);

  return (
    <div
      style={{
        width: "100%",
        fontFamily,
        background: bgColor,
        borderRadius: radius + 4,
        border: `1px solid ${borderColor}`,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(9, 9, 11, 0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:
            orientation === "vertical" ? "column" : "row",
          gap,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection:
              orientation === "vertical" ? "column" : "row",
            gap: 4,
            padding,
            background: surfaceColor,
            borderBottom:
              orientation === "horizontal"
                ? `1px solid ${borderColor}`
                : "none",
            borderRight:
              orientation === "vertical"
                ? `1px solid ${borderColor}`
                : "none",
            minWidth:
              orientation === "vertical" ? 200 : "auto",
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = i === active;

            return (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderRadius: radius,
                  border: isActive
                    ? `1px solid ${borderColor}`
                    : "1px solid transparent",
                  background: isActive
                    ? "#ffffff"
                    : "transparent",
                  color: isActive
                    ? accentColor
                    : mutedColor,
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  position: "relative",
                  boxShadow: isActive
                    ? "0 1px 2px rgba(9, 9, 11, 0.03)"
                    : "none",
                }}
              >
                {tab.icon}

                {tab.label}

                {showUnderline &&
                  isActive &&
                  orientation === "horizontal" && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -padding - 1,
                        left: 16,
                        right: 16,
                        height: 2,
                        background: accentColor,
                        borderRadius: 999,
                      }}
                    />
                  )}
              </button>
            );
          })}
        </div>

        <div
          style={{
            flex: 1,
            padding: 20,
            color: textColor,
            lineHeight: 1.7,
            background: "#ffffff",
          }}
        >
          {tabs[active]?.content}
        </div>
      </div>
    </div>
  );
}