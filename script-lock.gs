function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  ss.addMenu("test", [
    {name: "Datetime更新", functionName: "changeDateTime"}
  ]);
}

function changeDateTime() {
  var scriptLock = LockService.getScriptLock();
  // ドキュメントに対してLockをかける
  if (scriptLock.tryLock(500)) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];

    var rangeLockStatus = sheet.getRange("A1");
    rangeLockStatus.setValue("スクリプトロック開始");
    var range = sheet.getRange("A2");
    range.setValue(Date.now());

    // Lockかけた状態のまま１０秒待つ
    Utilities.sleep(10000);

    // Lockの解放
    scriptLock.releaseLock();
    rangeLockStatus.setValue("スクリプトロック終了");
  }
}
