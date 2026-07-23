/**
 * AM-intel 每日經貿情報索引 — GAS Web App entry.
 * Data is fetched client-side from GitHub Pages data.json (CORS: *),
 * so this deployment never needs a daily data push.
 * 依 design-defaults 規則：外層 HtmlOutput 必須自帶 viewport meta。
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('每日經貿情報索引 — Thomas Tseng 精選')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
