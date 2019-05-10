function main() {
  var ss = SpreadsheetApp.create("漢字ドリル");
  var sheet = ss.getActiveSheet();
  var cnt = 12;
  var target = selectRandomTarget(cnt);
  sheet.setRowHeights(1, 7, 100);
  sheet.setColumnWidths(1, cnt, 100);
  sheet.getRangeList(['A1:L7']).setBorder(true, true, true, true, true, true, null, null );

  for (var i=1; i <= cnt; i++) {
    var currentTarget = target[i-1].charCodeAt(0).toString(16);
    var cell1 = sheet.getRange(1, i);
    cell1.setHorizontalAlignment("center");
    cell1.setValue("=IMAGE(\"https://cdn.rawgit.com/KanjiVG/kanjivg/r20160426/kanji/0" + currentTarget + ".svg\", 4, 100, 100)");
    var cell2 = sheet.getRange(2, i);
    cell2.setValue(getYomigana(currentTarget));
    cell2.setFontSize(11);
    cell2.setFontWeight("bold");
    cell2.setVerticalAlignment("top");
    cell2.setHorizontalAlignment("left");
  }
}

function selectRandomTarget(cnt) {
  var list = ["一", "右", "雨", "円", "王", "音", "下", "火", "花", "貝", "学", "気", "九", "休", "玉", "金", "空", "月", "犬", "見", "五", "口", "校", "左", "三", "山", "子", "四", "糸", "字", "耳", "七", "車", "手", "十", "出", "女", "小", "上", "森", "人", "水", "正", "生", "青", "夕", "石", "赤", "千", "川", "先", "早", "草", "足", "村", "大", "男", "竹", "中", "虫", "町", "天", "田", "土", "二", "日", "入", "年", "白", "八", "百", "文", "木", "本", "名", "目", "立", "力", "林", "六"];
  var result = [];
  for (var i = 0; i < cnt; i++) {
    var idx = Math.floor(Math.random() * list.length);
    result[i] = list[idx];
    list.splice(idx, 1);
  }
  return result;
}

function getYomigana(currentTarget) {
  var url = "https://mojikiban.ipa.go.jp/mji/q?%E6%BC%A2%E5%AD%97%E6%96%BD%E7%AD%96=%E5%B8%B8%E7%94%A8%E6%BC%A2%E5%AD%97&%E5%85%A5%E7%AE%A1%E6%AD%A3%E5%AD%97%E3%82%B3%E3%83%BC%E3%83%89=" + currentTarget.toUpperCase();
  Utilities.sleep(500);
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());
  var onyomi = data.results[0]["読み"]["音読み"].slice(0,4).join("\n");
  var kunyomi = data.results[0]["読み"]["訓読み"].slice(0,4).join("\n");
  return ["[音読み]", onyomi, "", "[訓読み]", kunyomi].join("\n")
}
