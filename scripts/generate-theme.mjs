#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const upstreamThemeUrl =
  "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/src/cli/cmd/tui/context/theme/opencode.json"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const themeOutputs = [
  ["themes/opencode-color-theme.json", "OpenCode", (theme) => theme],
  ["themes/opencode-vibrant-color-theme.json", "OpenCode Vibrant", createVibrantTheme],
]

const response = await fetch(upstreamThemeUrl)
if (!response.ok) {
  throw new Error(`Failed to fetch OpenCode theme: ${response.status} ${response.statusText}`)
}

const source = await response.json()
const theme = resolveOpenCodeTheme(source, "dark")
for (const [relativeOutputPath, name, prepareTheme] of themeOutputs) {
  const outputPath = path.join(root, relativeOutputPath)
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(buildVscodeTheme(name, prepareTheme(theme)), null, 2)}\n`)
  console.log(`Generated ${relativeOutputPath} from ${upstreamThemeUrl}`)
}

function buildVscodeTheme(name, c) {
  return {
    $schema: "vscode://schemas/color-theme",
    name,
    type: "dark",
    semanticHighlighting: true,
    colors: {
      foreground: c.text,
      disabledForeground: c.textMuted,
      descriptionForeground: c.textMuted,
      errorForeground: c.error,
      focusBorder: c.borderActive,
      "selection.background": c.selection,
      "textBlockQuote.background": c.backgroundPanel,
      "textBlockQuote.border": c.border,
      "textCodeBlock.background": c.backgroundPanel,
      "textLink.activeForeground": c.primaryActive,
      "textLink.foreground": c.primary,
      "textPreformat.foreground": c.markdownCode,
      "button.background": c.primary,
      "button.foreground": c.background,
      "button.hoverBackground": c.primaryActive,
      "button.secondaryBackground": c.backgroundElement,
      "button.secondaryForeground": c.text,
      "button.secondaryHoverBackground": c.backgroundHover,
      "dropdown.background": c.backgroundPanel,
      "dropdown.border": c.border,
      "dropdown.foreground": c.text,
      "input.background": c.backgroundPanel,
      "input.border": c.borderSubtle,
      "input.foreground": c.text,
      "input.placeholderForeground": c.textMuted,
      "inputOption.activeBackground": c.backgroundHover,
      "inputOption.activeBorder": c.primary,
      "inputValidation.errorBackground": c.diffRemovedBg,
      "inputValidation.errorBorder": c.error,
      "inputValidation.infoBackground": c.diffAddedBg,
      "inputValidation.infoBorder": c.info,
      "inputValidation.warningBackground": c.warningBg,
      "inputValidation.warningBorder": c.warning,
      "scrollbar.shadow": `${c.background}00`,
      "scrollbarSlider.activeBackground": `${c.borderActive}cc`,
      "scrollbarSlider.background": `${c.selection}99`,
      "scrollbarSlider.hoverBackground": `${c.border}cc`,
      "badge.background": c.backgroundElement,
      "badge.foreground": c.primary,
      "progressBar.background": c.primary,
      "list.activeSelectionBackground": c.backgroundHover,
      "list.activeSelectionForeground": c.text,
      "list.dropBackground": `${c.diffAddedBg}99`,
      "list.focusBackground": c.backgroundElement,
      "list.focusForeground": c.text,
      "list.highlightForeground": c.primary,
      "list.hoverBackground": c.backgroundPanel,
      "list.hoverForeground": c.text,
      "list.inactiveSelectionBackground": c.backgroundElement,
      "list.inactiveSelectionForeground": c.text,
      "list.warningForeground": c.warning,
      "list.errorForeground": c.error,
      "activityBar.background": c.background,
      "activityBar.border": c.backgroundHover,
      "activityBar.foreground": c.primary,
      "activityBar.inactiveForeground": c.textMuted,
      "activityBarBadge.background": c.primary,
      "activityBarBadge.foreground": c.background,
      "sideBar.background": c.background,
      "sideBar.border": c.backgroundHover,
      "sideBar.foreground": c.text,
      "sideBarSectionHeader.background": c.backgroundPanel,
      "sideBarSectionHeader.border": c.backgroundHover,
      "sideBarTitle.foreground": c.text,
      "editorGroup.border": c.backgroundHover,
      "editorGroup.dropBackground": `${c.diffAddedBg}99`,
      "editorGroupHeader.tabsBackground": c.background,
      "editorGroupHeader.tabsBorder": c.backgroundHover,
      "tab.activeBackground": c.backgroundPanel,
      "tab.activeBorderTop": c.primary,
      "tab.activeForeground": c.text,
      "tab.border": c.backgroundHover,
      "tab.inactiveBackground": c.background,
      "tab.inactiveForeground": c.textMuted,
      "tab.unfocusedActiveForeground": c.text,
      "tab.unfocusedInactiveForeground": c.borderActive,
      "editor.background": c.background,
      "editor.foreground": c.text,
      "editor.findMatchBackground": `${c.primary}55`,
      "editor.findMatchBorder": c.primary,
      "editor.findMatchHighlightBackground": `${c.primary}22`,
      "editor.lineHighlightBackground": c.backgroundPanel,
      "editor.lineHighlightBorder": `${c.backgroundHover}00`,
      "editor.selectionBackground": c.selection,
      "editor.selectionHighlightBackground": `${c.selection}88`,
      "editor.wordHighlightBackground": `${c.backgroundHover}b8`,
      "editor.wordHighlightStrongBackground": `${c.borderSubtle}b8`,
      "editorBracketHighlight.foreground1": c.primary,
      "editorBracketHighlight.foreground2": c.accent,
      "editorBracketHighlight.foreground3": c.info,
      "editorBracketHighlight.foreground4": c.success,
      "editorBracketHighlight.foreground5": c.syntaxType,
      "editorBracketHighlight.foreground6": c.warning,
      "editorCursor.foreground": c.primary,
      "editorError.foreground": c.error,
      "editorGroupHeader.noTabsBackground": c.background,
      "editorGutter.addedBackground": c.diffAdded,
      "editorGutter.background": c.background,
      "editorGutter.deletedBackground": c.diffRemoved,
      "editorGutter.modifiedBackground": c.primary,
      "editorIndentGuide.activeBackground1": c.borderActive,
      "editorIndentGuide.background1": c.backgroundHover,
      "editorLineNumber.activeForeground": c.primary,
      "editorLineNumber.foreground": c.borderActive,
      "editorOverviewRuler.border": c.background,
      "editorOverviewRuler.addedForeground": c.diffAdded,
      "editorOverviewRuler.deletedForeground": c.diffRemoved,
      "editorOverviewRuler.modifiedForeground": c.primary,
      "editorWarning.foreground": c.warning,
      "editorWidget.background": c.backgroundPanel,
      "editorWidget.border": c.border,
      "editorWidget.foreground": c.text,
      "peekView.border": c.border,
      "peekViewEditor.background": c.background,
      "peekViewEditor.matchHighlightBackground": `${c.primary}44`,
      "peekViewResult.background": c.backgroundPanel,
      "peekViewResult.matchHighlightBackground": `${c.primary}44`,
      "peekViewTitle.background": c.backgroundElement,
      "panel.background": c.background,
      "panel.border": c.backgroundHover,
      "panelTitle.activeBorder": c.primary,
      "panelTitle.activeForeground": c.text,
      "panelTitle.inactiveForeground": c.textMuted,
      "statusBar.background": c.background,
      "statusBar.border": c.backgroundHover,
      "statusBar.debuggingBackground": c.accent,
      "statusBar.debuggingForeground": c.background,
      "statusBar.foreground": c.text,
      "statusBar.noFolderBackground": c.background,
      "statusBarItem.prominentBackground": c.backgroundElement,
      "statusBarItem.remoteBackground": c.primary,
      "statusBarItem.remoteForeground": c.background,
      "titleBar.activeBackground": c.background,
      "titleBar.activeForeground": c.text,
      "titleBar.border": c.backgroundHover,
      "titleBar.inactiveBackground": c.background,
      "titleBar.inactiveForeground": c.textMuted,
      "menu.background": c.backgroundPanel,
      "menu.foreground": c.text,
      "menu.selectionBackground": c.backgroundHover,
      "menu.selectionForeground": c.text,
      "menubar.selectionBackground": c.backgroundPanel,
      "menubar.selectionForeground": c.text,
      "notificationCenter.border": c.border,
      "notificationCenterHeader.background": c.backgroundPanel,
      "notificationToast.border": c.border,
      "notifications.background": c.backgroundPanel,
      "notifications.border": c.border,
      "notifications.foreground": c.text,
      "notificationsErrorIcon.foreground": c.error,
      "notificationsInfoIcon.foreground": c.info,
      "notificationsWarningIcon.foreground": c.warning,
      "quickInput.background": c.backgroundPanel,
      "quickInput.foreground": c.text,
      "quickInputTitle.background": c.backgroundElement,
      "pickerGroup.border": c.backgroundHover,
      "pickerGroup.foreground": c.primary,
      "terminal.background": c.background,
      "terminal.foreground": c.text,
      "terminal.ansiBlack": c.background,
      "terminal.ansiBlue": c.secondary,
      "terminal.ansiBrightBlack": c.borderActive,
      "terminal.ansiBrightBlue": c.secondary,
      "terminal.ansiBrightCyan": c.info,
      "terminal.ansiBrightGreen": c.success,
      "terminal.ansiBrightMagenta": c.accent,
      "terminal.ansiBrightRed": c.error,
      "terminal.ansiBrightWhite": c.text,
      "terminal.ansiBrightYellow": c.syntaxType,
      "terminal.ansiCyan": c.info,
      "terminal.ansiGreen": c.success,
      "terminal.ansiMagenta": c.accent,
      "terminal.ansiRed": c.error,
      "terminal.ansiWhite": c.text,
      "terminal.ansiYellow": c.warning,
      "terminalCursor.foreground": c.primary,
      "breadcrumb.background": c.background,
      "breadcrumb.foreground": c.textMuted,
      "breadcrumb.focusForeground": c.text,
      "breadcrumb.activeSelectionForeground": c.primary,
      "gitDecoration.addedResourceForeground": c.diffAdded,
      "gitDecoration.deletedResourceForeground": c.diffRemoved,
      "gitDecoration.ignoredResourceForeground": c.borderActive,
      "gitDecoration.modifiedResourceForeground": c.primary,
      "gitDecoration.untrackedResourceForeground": c.diffAdded,
      "diffEditor.border": c.border,
      "diffEditor.insertedTextBackground": c.diffAddedBg,
      "diffEditor.removedTextBackground": c.diffRemovedBg,
      "diffEditor.insertedLineBackground": c.diffAddedBg,
      "diffEditor.removedLineBackground": c.diffRemovedBg,
      "diffEditor.diagonalFill": c.backgroundHover,
      "diffEditor.unchangedRegionBackground": c.diffContextBg,
      "diffEditor.unchangedRegionForeground": c.diffLineNumber,
      "diffEditor.unchangedRegionShadow": `${c.background}00`,
      "diffEditorGutter.insertedLineBackground": c.diffAddedLineNumberBg,
      "diffEditorGutter.removedLineBackground": c.diffRemovedLineNumberBg,
      "diffEditorOverview.insertedForeground": c.diffAdded,
      "diffEditorOverview.removedForeground": c.diffRemoved,
      "minimapGutter.addedBackground": c.diffAdded,
      "minimapGutter.deletedBackground": c.diffRemoved,
      "minimapGutter.modifiedBackground": c.primary,
      "merge.border": c.border,
      "merge.currentContentBackground": c.diffAddedBg,
      "merge.currentHeaderBackground": c.diffAddedLineNumberBg,
      "merge.incomingContentBackground": c.diffRemovedBg,
      "merge.incomingHeaderBackground": c.diffRemovedLineNumberBg,
      "settings.headerForeground": c.primary,
      "settings.modifiedItemIndicator": c.primary,
      "welcomePage.progress.background": c.backgroundElement,
      "welcomePage.progress.foreground": c.primary,
    },
    tokenColors: [
      rule(["comment", "punctuation.definition.comment"], c.syntaxComment, "italic"),
      rule(["keyword", "storage.type", "storage.modifier", "support.type.property-name.css"], c.syntaxKeyword, "italic"),
      rule(["entity.name.function", "support.function", "meta.function-call", "variable.function"], c.syntaxFunction),
      rule(["string", "constant.other.symbol", "markup.inline.raw.string"], c.syntaxString),
      rule(["constant.numeric", "constant.language.boolean", "constant.language.null", "constant.language.undefined"], c.syntaxNumber),
      rule(["entity.name.type", "entity.name.class", "entity.name.struct", "support.class", "support.type", "meta.type.annotation"], c.syntaxType),
      rule(["variable", "variable.other.readwrite", "entity.name.variable"], c.syntaxVariable),
      rule(["variable.other.property", "support.variable.property", "meta.object-literal.key", "property"], c.syntaxVariable),
      rule(["entity.other.attribute-name", "meta.attribute", "storage.type.annotation"], c.warning),
      rule(["entity.name.tag", "support.class.component"], c.error),
      rule(["punctuation.definition.tag"], c.syntaxOperator),
      rule(["keyword.operator", "punctuation.separator", "punctuation.accessor"], c.syntaxOperator),
      rule(["punctuation", "meta.brace", "meta.delimiter"], c.syntaxPunctuation),
      rule(["markup.heading", "markup.heading entity.name"], c.markdownHeading, "bold"),
      rule(["markup.bold", "markup.strong"], c.markdownStrong, "bold"),
      rule("markup.italic", c.markdownEmph, "italic"),
      rule(["markup.list", "punctuation.definition.list"], c.markdownListItem),
      rule("markup.raw.inline", c.markdownCode),
      rule("markup.raw.block", c.markdownCodeBlock),
      rule("markup.underline.link", c.markdownLink),
      rule(["string.other.link", "markup.underline.link.image"], c.markdownLinkText),
      rule("markup.quote", c.markdownBlockQuote, "italic"),
      rule(["markup.inserted", "markup.diff.header.to-file", "diff.plus"], c.diffAdded, undefined, c.diffAddedBg),
      rule(["markup.deleted", "markup.diff.header.from-file", "diff.minus"], c.diffRemoved, undefined, c.diffRemovedBg),
      rule(["markup.changed", "diff.delta"], c.diffContext, undefined, c.diffContextBg),
      rule(["meta.diff.header", "meta.diff.range", "markup.diff"], c.diffHunkHeader),
      rule("punctuation.definition.inserted.diff", c.diffHighlightAdded),
      rule("punctuation.definition.deleted.diff", c.diffHighlightRemoved),
      rule("invalid", c.error),
    ],
    semanticTokenColors: {
      class: c.syntaxType,
      decorator: c.warning,
      enum: c.syntaxType,
      enumMember: c.syntaxNumber,
      function: c.syntaxFunction,
      interface: c.syntaxType,
      keyword: c.syntaxKeyword,
      label: c.markdownLinkText,
      method: c.syntaxFunction,
      namespace: c.syntaxType,
      number: c.syntaxNumber,
      operator: c.syntaxOperator,
      parameter: c.syntaxVariable,
      property: c.syntaxVariable,
      string: c.syntaxString,
      struct: c.syntaxType,
      type: c.syntaxType,
      typeParameter: c.syntaxType,
      variable: c.syntaxVariable,
    },
  }
}

function createVibrantTheme(theme) {
  const harmony = createVibrantHarmony(theme)

  return {
    ...theme,
    text: harmony.neutralForeground(0.96, 0.006),
    textMuted: harmony.neutralForeground(0.68, 0.012),
    primary: vibrantForeground(theme.primary, { lightness: 0.74, maxLightness: 0.77, chroma: 0.18, maxChroma: 0.21 }),
    primaryActive: vibrantForeground(theme.primaryActive, { lightness: 0.81, maxLightness: 0.83, chroma: 0.15, maxChroma: 0.18 }),
    secondary: vibrantForeground(theme.secondary, { lightness: 0.73, maxLightness: 0.76, chroma: 0.17, maxChroma: 0.2 }),
    accent: vibrantForeground(theme.accent, { lightness: 0.75, maxLightness: 0.78, chroma: 0.18, maxChroma: 0.21 }),
    info: vibrantForeground(theme.info, { lightness: 0.72, maxLightness: 0.75, chroma: 0.15, maxChroma: 0.18 }),
    success: vibrantForeground(theme.success, { lightness: 0.72, maxLightness: 0.75, chroma: 0.16, maxChroma: 0.19 }),
    warning: vibrantForeground(theme.warning, { lightness: 0.74, maxLightness: 0.77, chroma: 0.16, maxChroma: 0.19 }),
    error: vibrantForeground(theme.error, { lightness: 0.73, maxLightness: 0.76, chroma: 0.17, maxChroma: 0.2 }),
    syntaxComment: harmony.neutralForeground(0.66, 0.018),
    syntaxKeyword: vibrantForeground(theme.syntaxKeyword, { lightness: 0.75, maxLightness: 0.78, chroma: 0.18, maxChroma: 0.21 }),
    syntaxFunction: vibrantForeground(theme.syntaxFunction, { lightness: 0.74, maxLightness: 0.77, chroma: 0.18, maxChroma: 0.21 }),
    syntaxString: vibrantForeground(theme.syntaxString, { lightness: 0.72, maxLightness: 0.75, chroma: 0.16, maxChroma: 0.19 }),
    syntaxNumber: vibrantForeground(theme.syntaxNumber, { lightness: 0.74, maxLightness: 0.77, chroma: 0.15, maxChroma: 0.18 }),
    syntaxType: vibrantForeground(theme.syntaxType, { lightness: 0.75, maxLightness: 0.78, chroma: 0.16, maxChroma: 0.19 }),
    syntaxVariable: vibrantForeground(theme.syntaxVariable, { lightness: 0.76, maxLightness: 0.79, chroma: 0.14, maxChroma: 0.17 }),
    syntaxOperator: vibrantForeground(theme.syntaxOperator, { lightness: 0.73, maxLightness: 0.76, chroma: 0.14, maxChroma: 0.17 }),
    syntaxPunctuation: harmony.neutralForeground(0.9, 0.01),
    markdownHeading: vibrantForeground(theme.markdownHeading, { lightness: 0.76, maxLightness: 0.79, chroma: 0.17, maxChroma: 0.2 }),
    markdownStrong: harmony.neutralForeground(0.96, 0.006),
    markdownEmph: vibrantForeground(theme.markdownEmph, { lightness: 0.75, maxLightness: 0.78, chroma: 0.17, maxChroma: 0.2 }),
    markdownListItem: vibrantForeground(theme.markdownListItem, { lightness: 0.74, maxLightness: 0.77, chroma: 0.16, maxChroma: 0.19 }),
    markdownCode: vibrantForeground(theme.markdownCode, { lightness: 0.72, maxLightness: 0.75, chroma: 0.16, maxChroma: 0.19 }),
    markdownCodeBlock: vibrantForeground(theme.markdownCodeBlock, { lightness: 0.72, maxLightness: 0.75, chroma: 0.16, maxChroma: 0.19 }),
    markdownLink: vibrantForeground(theme.markdownLink, { lightness: 0.74, maxLightness: 0.77, chroma: 0.18, maxChroma: 0.21 }),
    markdownLinkText: vibrantForeground(theme.markdownLinkText, { lightness: 0.74, maxLightness: 0.77, chroma: 0.16, maxChroma: 0.19 }),
    markdownBlockQuote: vibrantForeground(theme.markdownBlockQuote, { lightness: 0.7, maxLightness: 0.73, chroma: 0.12, maxChroma: 0.15 }),
    diffAdded: vibrantForeground(theme.diffAdded, { lightness: 0.72, maxLightness: 0.75, chroma: 0.15, maxChroma: 0.18 }),
    diffRemoved: vibrantForeground(theme.diffRemoved, { lightness: 0.72, maxLightness: 0.75, chroma: 0.16, maxChroma: 0.19 }),
    diffContext: vibrantForeground(theme.diffContext, { lightness: 0.71, maxLightness: 0.74, chroma: 0.13, maxChroma: 0.16 }),
    diffHighlightAdded: vibrantForeground(theme.diffHighlightAdded, { lightness: 0.78, maxLightness: 0.81, chroma: 0.15, maxChroma: 0.18 }),
    diffHighlightRemoved: vibrantForeground(theme.diffHighlightRemoved, { lightness: 0.75, maxLightness: 0.79, chroma: 0.16, maxChroma: 0.19 }),
    diffHunkHeader: vibrantForeground(theme.diffHunkHeader, { lightness: 0.73, maxLightness: 0.76, chroma: 0.15, maxChroma: 0.18 }),
    diffLineNumber: harmony.neutralForeground(0.69, 0.012),
    diffAddedBg: vibrantBackground(theme.diffAddedBg, { lightness: 0.22, chroma: 0.035, maxChroma: 0.05 }),
    diffRemovedBg: vibrantBackground(theme.diffRemovedBg, { lightness: 0.22, chroma: 0.035, maxChroma: 0.05 }),
    diffContextBg: increaseNeutralContrast(theme.diffContextBg, 0.16),
    diffAddedLineNumberBg: vibrantBackground(theme.diffAddedBg, { lightness: 0.2, chroma: 0.032, maxChroma: 0.045 }),
    diffRemovedLineNumberBg: vibrantBackground(theme.diffRemovedBg, { lightness: 0.2, chroma: 0.032, maxChroma: 0.045 }),
    warningBg: vibrantBackground(theme.warningBg, { lightness: 0.22, chroma: 0.032, maxChroma: 0.045 }),
  }
}

function createVibrantHarmony(theme) {
  const hue = hexToOklch(theme.primary).h

  return {
    surface: (lightness, chroma) => oklchToGamutMappedHex({ l: lightness, c: chroma, h: normalizeHue(hue - 8) }),
    neutralForeground: (lightness, chroma) => oklchToGamutMappedHex({ l: lightness, c: chroma, h: normalizeHue(hue - 18) }),
  }
}

function vibrantForeground(hex, { chroma = 0.18, lightness = 0.72, maxLightness = 0.78, maxChroma = 0.21 } = {}) {
  const oklch = hexToOklch(hex)
  if (oklch.c === 0) return increaseNeutralContrast(hex, lightness)

  return oklchToGamutMappedHex({
    l: clamp(oklch.l, lightness, maxLightness),
    c: clamp(oklch.c * 1.75, chroma, maxChroma),
    h: oklch.h,
  })
}

function vibrantBackground(hex, { chroma = 0.035, lightness = 0.22, maxChroma = 0.05 } = {}) {
  const oklch = hexToOklch(hex)
  if (oklch.c === 0) return increaseNeutralContrast(hex, lightness)

  return oklchToGamutMappedHex({
    l: Math.max(oklch.l, lightness),
    c: clamp(oklch.c * 1.1, chroma, maxChroma),
    h: oklch.h,
  })
}

function increaseNeutralContrast(hex, lightness) {
  const oklch = hexToOklch(hex)

  return oklchToGamutMappedHex({
    h: oklch.h,
    c: oklch.c,
    l: Math.max(oklch.l, lightness),
  })
}

function hexToOklch(hex) {
  const [r, g, b] = [1, 3, 5].map((index) => srgbToLinear(Number.parseInt(hex.slice(index, index + 2), 16) / 255))
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const lRoot = Math.cbrt(l)
  const mRoot = Math.cbrt(m)
  const sRoot = Math.cbrt(s)
  const okL = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot
  const okA = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot
  const okB = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot
  const c = Math.hypot(okA, okB)
  const h = c === 0 ? 0 : normalizeHue((Math.atan2(okB, okA) * 180) / Math.PI)

  return { l: okL, c, h }
}

function oklchToGamutMappedHex(oklch) {
  if (isInSrgbGamut(oklch)) return oklchToHex(oklch)

  let low = 0
  let high = oklch.c
  for (let i = 0; i < 24; i += 1) {
    const mid = (low + high) / 2
    if (isInSrgbGamut({ ...oklch, c: mid })) low = mid
    else high = mid
  }

  return oklchToHex({ ...oklch, c: low })
}

function oklchToHex(oklch) {
  return rgbToHex(oklchToSrgb(oklch).map((value) => clamp(value, 0, 1)))
}

function isInSrgbGamut(oklch) {
  return oklchToSrgb(oklch).every((value) => value >= 0 && value <= 1)
}

function oklchToSrgb({ l, c, h }) {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const lRoot = l + 0.3963377774 * a + 0.2158037573 * b
  const mRoot = l - 0.1055613458 * a - 0.0638541728 * b
  const sRoot = l - 0.0894841775 * a - 1.291485548 * b
  const lLinear = lRoot ** 3
  const mLinear = mRoot ** 3
  const sLinear = sRoot ** 3
  const r = +4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear
  const g = -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear
  const blue = -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear

  return [linearToSrgb(r), linearToSrgb(g), linearToSrgb(blue)]
}

function srgbToLinear(value) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function linearToSrgb(value) {
  return value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055
}

function rgbToHex(rgb) {
  return `#${rgb.map((value) => Math.round(value * 255).toString(16).padStart(2, "0")).join("")}`
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeHue(hue) {
  return ((hue % 360) + 360) % 360
}

function resolveOpenCodeTheme(source, mode) {
  const defs = source.defs ?? {}

  const resolve = (value, chain = []) => {
    if (typeof value === "string") {
      if (value.startsWith("#")) return value.toLowerCase()
      if (chain.includes(value)) throw new Error(`Circular color reference: ${[...chain, value].join(" -> ")}`)
      const next = defs[value] ?? source.theme[value]
      if (next === undefined) throw new Error(`Unknown OpenCode color reference: ${value}`)
      return resolve(next, [...chain, value])
    }
    if (value && typeof value === "object" && mode in value) return resolve(value[mode], chain)
    throw new Error(`Unsupported OpenCode color value: ${JSON.stringify(value)}`)
  }

  const resolved = Object.fromEntries(Object.entries(source.theme).map(([key, value]) => [key, resolve(value)]))

  return {
    ...resolved,
    selection: resolve("darkStep5"),
    primaryActive: resolve("darkStep10"),
    backgroundHover: resolve("darkStep4"),
    warningBg: "#2d281f",
  }
}

function rule(scope, foreground, fontStyle, background) {
  return {
    scope,
    settings: {
      foreground,
      ...(background ? { background } : {}),
      ...(fontStyle ? { fontStyle } : {}),
    },
  }
}
