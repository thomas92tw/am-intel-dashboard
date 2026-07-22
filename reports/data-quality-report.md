# Data Quality Report — Gate 1（Cleaned Data Acceptance）

日期：2026-07-22 ｜ 資料：`data.json`（326 筆，builder: `AM-intel/scripts/build_dashboard.py`）

## 驗收結果：PASS（附註記）

| 檢核 | 結果 |
|---|---|
| 原始 vs 清理筆數 | 326 個 `news_item/**/*.md` → 326 筆，builder 內建硬檢核（不一致即報錯退出，非靜默） |
| 欄位變形 | 無改名／合併／衍生欄位；僅 frontmatter 原樣抽取 + 依 `date` desc 排序 |
| 粒度 / 唯一鍵 | 每筆 = 一個 note；`note` 路徑 326/326 唯一 |
| 單位一致性 | 圖表僅使用計數（則數），無混合單位 |
| 可追溯性 | 每筆帶 `note` 相對路徑，可回溯 vault 原始檔 |
| 日期覆蓋 | 2026-05-26 → 2026-07-22，44 個活躍日（**不連續**，圖表 caption 已明示） |

## 缺值註記（不改變圖表語義）

| 欄位 | 缺值 | 處理 |
|---|---|---|
| `signal_title_zh` / `signal_title_en` | 12 筆（早期回填） | 顯示層 fallback `topic`（與 `新聞總索引.md` DataviewJS 同規則），不影響計數型圖表 |
| `paywall` | 12 筆 | falsy 視為 false（與總索引行為一致）；付費牆計數 10 筆為 `paywall: true` 明示值 |
| 其他關鍵欄位（date/region/category/summary/source_url） | 0 | — |

## Stop 條件檢查

無語義改變、無資料刪除、無混合單位、無不可回溯衍生欄位 → 不觸發 stop。
