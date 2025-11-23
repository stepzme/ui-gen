"use client"

import { useState } from "react"
import { ButtonText, type ButtonTextColorScheme } from "./buttonText"
import type { Typography } from "./buttonText"
import { Icon } from "@/imported/components/ui/icon"
import { useTheme } from "@/hooks/use-theme"

const COLOR_SCHEMES: ButtonTextColorScheme[] = [
  "brand",
  "success",
  "info",
  "warning",
  "critical",
  "draft",
  "constant",
  "primary",
]

const TYPOGRAPHY_OPTIONS: Typography[] = ["bodyS", "bodyM", "bodyL"]

export default function ButtonTextDemo() {
  const { isDark, toggleTheme } = useTheme()

  const [colorScheme, setColorScheme] = useState<ButtonTextColorScheme>("brand")
  const [typography, setTypography] = useState<Typography>("bodyM")
  const [fullWidth, setFullWidth] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [withIcon, setWithIcon] = useState(false)
  const [label, setLabel] = useState("Подробнее")
  const [dataTestId, setDataTestId] = useState("")

  const content = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      {withIcon && (
        <Icon variant="arrow_right" aria-hidden="true" />
      )}
      <span>{label}</span>
    </span>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "var(--colors-background0-primary)",
        color: "var(--colors-text-primary)",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", margin: 0, marginBottom: "0.5rem" }}>
              ButtonText Component Demo
            </h1>
            <p style={{ margin: 0, color: "var(--colors-text-secondary)" }}>
              Управление пропсами текстовой кнопки
            </p>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--colors-elevation0-borderNormal)",
              backgroundColor: "var(--colors-background1-primary)",
              color: "var(--colors-text-primary)",
              fontSize: "0.875rem",
              cursor: "pointer",
              outline: "none",
              fontWeight: 500,
            }}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "1.5rem",
            border: "1px solid var(--colors-elevation0-borderNormal)",
            borderRadius: "0.5rem",
            backgroundColor: "var(--colors-background1-primary)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>Props</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>colorScheme</label>
            <select
              value={colorScheme}
              onChange={(event) => setColorScheme(event.target.value as ButtonTextColorScheme)}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--colors-elevation0-borderNormal)",
                backgroundColor: "var(--colors-background0-primary)",
                color: "var(--colors-text-primary)",
                fontSize: "0.875rem",
              }}
            >
              {COLOR_SCHEMES.map((scheme) => (
                <option key={scheme} value={scheme}>
                  {scheme}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>typography</label>
            <select
              value={typography}
              onChange={(event) => setTypography(event.target.value as Typography)}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--colors-elevation0-borderNormal)",
                backgroundColor: "var(--colors-background0-primary)",
                color: "var(--colors-text-primary)",
                fontSize: "0.875rem",
              }}
            >
              {TYPOGRAPHY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id="fullWidth"
              type="checkbox"
              checked={fullWidth}
              onChange={(event) => setFullWidth(event.target.checked)}
              style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
            />
            <label htmlFor="fullWidth" style={{ fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}>
              fullWidth
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id="disabled"
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
              style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
            />
            <label htmlFor="disabled" style={{ fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}>
              disabled
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id="withIcon"
              type="checkbox"
              checked={withIcon}
              onChange={(event) => setWithIcon(event.target.checked)}
              style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
            />
            <label htmlFor="withIcon" style={{ fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}>
              with icon
            </label>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>label</label>
            <input
              type="text"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--colors-elevation0-borderNormal)",
                backgroundColor: "var(--colors-background0-primary)",
                color: "var(--colors-text-primary)",
                fontSize: "0.875rem",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>data-test-id</label>
            <input
              type="text"
              value={dataTestId}
              onChange={(event) => setDataTestId(event.target.value)}
              placeholder="ButtonText"
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--colors-elevation0-borderNormal)",
                backgroundColor: "var(--colors-background0-primary)",
                color: "var(--colors-text-primary)",
                fontSize: "0.875rem",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.5rem",
            border: "1px solid var(--colors-elevation0-borderNormal)",
            borderRadius: "0.5rem",
            backgroundColor: "var(--colors-background1-primary)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>Preview</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <ButtonText
              colorScheme={colorScheme}
              typography={typography}
              fullWidth={fullWidth}
              disabled={disabled}
              data-test-id={dataTestId || undefined}
            >
              {content}
            </ButtonText>
          </div>
        </div>
      </div>
    </div>
  )
}


