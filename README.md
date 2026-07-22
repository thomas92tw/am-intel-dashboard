# AM-intel Dashboard

AM-intel 新聞資料庫（`news_item/` 每則一筆 Markdown note）的靜態 HTML Dashboard，部署於 GitHub Pages：

**https://thomas92tw.github.io/am-intel-dashboard/**

## 架構

```
Obsidian vault: AM-intel/news_item/**/*.md   (frontmatter = 資料源)
        │
        ▼  AM-intel/scripts/build_dashboard.py（掃 frontmatter、筆數完整性檢核）
data.json ──▶ index.html（vanilla JS：統計卡 / 分佈圖 / 搜尋 / 篩選 / Markdown 匯出）
        │
        ▼  --push（git commit + push → GitHub Pages）
```

## 每日更新

由 `AM-intel/AGENTS.md` 的 **Dashboard Publish Policy** 驅動：每日 news_item 回填 +
`新聞總索引.md` 刷新完成後，執行回填的機器順帶執行：

```bash
python3 "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/AM-intel/scripts/build_dashboard.py" --push
```

前置需求（每台機器一次性）：clone 本 repo 到 `~/Projects/am-intel-dashboard` + `gh auth login`。

## 設計

- 視覺：Gamma design system（navy `#021A54` + hot pink `#FF85BB`、Inter Tight、24px 圓角卡片）
- `gamma-tokens.css` 是 `~/.claude/skills/gamma-design/colors_and_type.css` 的**副本** —
  source of truth 在 skill 端，勿在本 repo 直接修改；skill 更新後重新複製
- Markdown 匯出格式遵循 `AM-intel/AGENTS.md` Markdown Export Policy（保留原始連結、
  付費牆標示 `來源名稱（付費牆）`，不使用繞過付費牆的第三方快照連結）

## 檔案

| 檔案 | 說明 |
|---|---|
| `index.html` | Dashboard 主頁（單檔，讀 `data.json`） |
| `data.json` | 由 builder 產生（勿手動編輯） |
| `gamma-tokens.css` | Gamma design tokens 副本 |
