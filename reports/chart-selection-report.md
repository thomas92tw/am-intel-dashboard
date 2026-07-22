# Chart Selection Report — Gate 2（Chart Recommendation Review）

日期：2026-07-22 ｜ 受眾：general（個人情報索引，中英雙語）

## 資料形狀分類

| 分析問題 | 形狀 | 選用圖表 | 說明 |
|---|---|---|---|
| 每日回填量隨時間變化？ | time-series | 直式 column chart（近 20 活躍日） | 日期不連續 → caption 明示「僅顯示有回填的日子」，不偽裝連續時間軸 |
| 哪些分類最多？ | category comparison | 橫向 bar chart（count desc） | 8 分類，橫向 bar 適合窄欄 + 長標籤 |
| 哪些區域最多？ | category comparison | 橫向 bar chart（count desc） | 9 區域，同上 |

## 考慮後拒絕的圖型

| 圖型 | 拒絕原因 |
|---|---|
| Pie / donut | 分類 8 個、區域 9 個，超過 pie 可讀上限；且比較（非構成）才是讀者問題 |
| Map | region 值混合粒度（洲級區域與 United States / China 並列），地圖會暗示不支持的地理精度 |
| 折線圖（daily） | 日期不連續，折線會暗示日間連續趨勢；column 每柱獨立，較誠實 |
| 堆疊圖 | 無「分類 × 時間」的讀者問題被提出，堆疊徒增噪音 |

## 尺度與互動

- 三圖均為 **linear、從 0 起算、比例忠實**；無截斷軸、無 log。
- 零值不畫長度（daily 只畫有回填的日子；分類/區域最小值 11 仍可見，無 min-width 灌水）。
- Hover/focus tooltip 顯示底層值（日期/類別 + 則數 + 佔比）；點擊 = 篩選（與下方查詢區 select 同步、雙向高亮）。
- 鍵盤：每柱/每列為原生 `<button>`，Tab 可及、Enter 觸發。

## 多重讀法

分類與區域是兩個獨立的比較問題 → 以 chart pack（兩張 bar）並列，不強行合成單一「最佳圖」。
