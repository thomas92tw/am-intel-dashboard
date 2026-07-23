# AM-intel Dashboard

AM-intel 新聞資料庫（`news_item/` 每則一筆 Markdown note）的靜態 HTML Dashboard，部署於 GitHub Pages：

**https://thomas92tw.github.io/am-intel-dashboard/**

對外分享版（Google Apps Script，讀取同一份 Pages data.json，資料永遠同步、不需每日推送）：

**https://script.google.com/macros/s/AKfycbz2nREYzoWtvPI5nHy9GLqFNKymBCYhCPir6-YLx9bZcJEj-BWYMn73u0mgOALdcnu7/exec**

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

## GAS 版維護

- `gas/` = Apps Script 專案（Code.gs + appsscript.json + index.html 副本）
- **資料每日自動同步**（頁面 client-side fetch Pages data.json，CORS 已開），GAS 端零維護
- **UI 改版時**才需要：`cp index.html gas/index.html && cd gas && clasp push -f && clasp deploy --deploymentId AKfycbz2nREYzoWtvPI5nHy9GLqFNKymBCYhCPir6-YLx9bZcJEj-BWYMn73u0mgOALdcnu7`
- ⚠️ **GAS 序列陷阱**：HtmlService 會改寫頁面內（含 script 註解）的「協定+雙斜線+網域」URL 樣式，使載入器拋 Invalid token — script 區的絕對 URL 必須用片段 join 組裝（見 index.html 內註解）

## 設計

- 視覺：**narrow-rwd 模板**（`vault/_templates/narrow-rwd/narrow-rwd-report-blog-template.html`）—
  500px 窄欄、Bondi Mint `#2ec4b6`、ZH/EN 雙語 toggle、card-style rows、`© Thomas Tseng 2026`
- 互動圖表：依 `interactive-data-chart-builder` skill 三 Gate 流程產製 —
  spec 在 `chart-spec.json`，Gate 證據在 `gate-status.json` 與 `reports/`；
  圖表說明文字由執行時從 data.json 計算（每日更新後數字不會過期）
- Markdown 匯出格式遵循 `AM-intel/AGENTS.md` Markdown Export Policy（保留原始連結、
  付費牆標示 `來源名稱（付費牆）`，不使用繞過付費牆的第三方快照連結）

## 檔案

| 檔案 | 說明 |
|---|---|
| `index.html` | Dashboard 主頁（Pages 版讀 `data.json`；若偵測到內嵌 `#dataset` 則離線直用） |
| （vault）`AM-intel/dashboard.html` | builder 每次執行順帶產出的**自足離線版**（資料內嵌，雙擊即開；勿手動編輯） |
| `data.json` | 由 builder 產生（勿手動編輯） |
| `chart-spec.json` | 互動圖表規格（scale / encoding / interactions） |
| `gate-status.json` | interactive-data-chart-builder Gate 1/2/3 驗證狀態 |
| `reports/` | data-quality + chart-selection 報告（Gate 證據） |
