"use client";
import React, { useState, useRef } from "react";
import { Icon } from "../../core/icons";
import { useFormsTheme } from "../../core/provider";

export interface FileUploaderProps {
  as?: React.ElementType;
  multiple?: boolean;
  accept?: string;
  label?: string;
  onFiles?: (files: File[]) => void;
  maxSize?: number;
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
  style?: React.CSSProperties;
  className?: string;
}

export function FileUploader(props: FileUploaderProps) {
  const t = useFormsTheme();
  const { as: Tag = "div", multiple = true, accept = "*", label = "Upload files", onFiles, maxSize = 10, bgColor = t.bgColor, textColor = t.textColor, accentColor = t.accentColor, borderColor = t.borderColor, inputBg = t.inputBg ?? "rgba(255,255,255,0.05)", fontFamily = t.fontFamily, maxW = t.maxW ?? 700, px = t.px ?? 0, py = t.py ?? 0, radius = t.cardRadius ?? 12, gap = t.gap ?? 12, style = {}, className = "" } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (nf: File[]) => { setFiles((p) => [...p, ...nf]); onFiles?.(nf); };
  const removeFile = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));
  const fmtSize = (b: number) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  return (
    <Tag className={className} style={{ background: bgColor, color: textColor, fontFamily, padding: `${py}px ${px}px`, ...style }}>
      <div style={{ maxWidth: maxW, display: "flex", flexDirection: "column" as const, gap }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{label}<div style={{ fontSize: 12, opacity: 0.6 }}>Drag & drop or click to browse · Max {maxSize}MB</div></div>
        <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(Array.from(e.dataTransfer.files)); }} onClick={() => inputRef.current?.click()} style={{ padding: 32, borderRadius: radius, border: `2px dashed ${isDragging ? accentColor : borderColor}`, background: isDragging ? `${accentColor}10` : inputBg, cursor: "pointer", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 12, textAlign: "center" as const, transition: "all 0.2s ease" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${accentColor}20`, display: "grid", placeItems: "center" }}><Icon name="upload" size={24} style={{ color: accentColor } as any} /></div>
          <div><div style={{ fontWeight: 600, fontSize: 14 }}>{isDragging ? "Drop files here" : "Click to upload"}</div><div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>or drag and drop files here</div></div>
          <input ref={inputRef} type="file" multiple={multiple} accept={accept} onChange={(e) => handleFiles(Array.from(e.target.files ?? []))} style={{ display: "none" }} />
        </div>
        {files.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: inputBg, border: `1px solid ${borderColor}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${accentColor}20`, display: "grid", placeItems: "center" }}><Icon name={f.type.startsWith("image/") ? "image" : "file"} size={20} style={{ color: accentColor } as any} /></div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 500, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{f.name}</div><div style={{ fontSize: 12, opacity: 0.6 }}>{fmtSize(f.size)}</div></div>
                <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(i); }} style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "rgba(239,68,68,0.1)", color: "#EF4444", cursor: "pointer", display: "grid", placeItems: "center" }}><Icon name="x" size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Tag>
  );
}
