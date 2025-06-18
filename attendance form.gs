er/**
 * Creates a dated, sign-in-required attendance Form,
 * then saves a QR-code PNG for the responder link in the same folder.
 *
 * Title pattern: “Diploma FYP SW workshop DD-Mon-YY”
 */

/* to use, change the DEST_FOLDER_ID with the ID from your own Google Drive*/

function createAttendanceForm() {

  /* ── 0. Destination folder ───────────────────────────────────── */
  const DEST_FOLDER_ID = 'ID';   // <- your folder
  const destFolder     = DriveApp.getFolderById(DEST_FOLDER_ID);

  /* ── 1. Date-stamped title ───────────────────────────────────── */
  const tz       = Session.getScriptTimeZone();                  // Asia/Kuala_Lumpur
  const todayStr = Utilities.formatDate(new Date(), tz, 'dd-MMM-yy');
  const title    = 'Diploma FYP SW workshop ' + todayStr;

  /* ── 2. Create the Form ─────────────────────────────────────── */
  const form = FormApp.create(title)
        .setDescription('Please sign in with your Google account and complete all required fields.')
        .setRequireLogin(true)
        .setCollectEmail(true)
        .setLimitOneResponsePerUser(true);

  /* — 3. Attendance questions — */
  form.addTextItem().setTitle('Student ID').setRequired(true);
  form.addTextItem().setTitle('Name').setRequired(true);
  form.addListItem().setTitle('Programme').setChoiceValues(['DMG', 'DMR']).setRequired(true);
  form.addTextItem()
      .setTitle('Year')
      .setRequired(true)
      .setValidation(
        FormApp.createTextValidation()
               .requireNumber()
               .setHelpText('Numbers only, e.g. 1, 2, 3 …')
               .build());
  form.addListItem().setTitle('Semester').setChoiceValues(['1', '2', '3']).setRequired(true);
  form.addListItem().setTitle('Group').setChoiceValues(['1', '2']).setRequired(true);

  /* ── 4. Move the Form file into the destination folder ───────── */
  const file = DriveApp.getFileById(form.getId());
  file.moveTo(destFolder);                                    // single call

  /* ── 5. Build & save the QR code (QuickChart) ───────────────── */
  const formUrl  = form.getPublishedUrl();                    // responder link
  const qrUrl    = 'https://quickchart.io/qr?size=400&text=' +
                   encodeURIComponent(formUrl);
  const qrBlob   = UrlFetchApp.fetch(qrUrl).getBlob()
                     .setName(title + '.png');                // same base name

  destFolder.createFile(qrBlob);                              // drops PNG in folder

  /* ── 6. Log handy links ─────────────────────────────────────── */
  Logger.log('Edit URL : ' + form.getEditUrl());
  Logger.log('Live URL : ' + formUrl);
  Logger.log('QR image saved as: ' + qrBlob.getName());
  Logger.log('Folder   : ' + destFolder.getName());
}
