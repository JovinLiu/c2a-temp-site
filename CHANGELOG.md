# Changelog

## 4.3.0

- Clarified Installation Agreement clause 1.4 so stone products are expressly outside the installation scope, including stone benchtops, stone splashbacks and other stonework.
- Updated the Chinese clause to use “石材产品安装（包括石材台面、石材背板及其他石材工程）”.
- Added saved-data and imported-JSON migration for the earlier clause wording, while preserving custom wording entered by the user.

## 4.2.0

- Fixed the Installation Fee Calculator container being rendered as an inline element because of the generic `no-print` display rule.
- Restored the calculator to a centred white document card matching the agreement preview width.
- Kept the rate controls, table, row buttons and totals inside the card with clean borders and spacing.
- Preserved the existing calculation, Contract Sum synchronisation, saved data and print-hiding behaviour.

## 4.1.0

- Added an editor-only installation fee calculator to the Joinery Installation Agreement.
- Added editable rows with space, joinery, dimensions, finishes and description fields.
- Added automatic projection-area and installation-fee calculations using a default rate per square metre.
- Automatically syncs the calculated installation fee to the installation agreement Contract Sum.
- Keeps the calculator hidden from printed and PDF output.

## v4.0.0

- Corrected the Supply & Installation Agreement Second Payment formula wording to state that the First Payment is deducted.
- Updated the Third Payment formula wording and delivery-day payment paragraph to include the Handling Fee and Packaging, Pallets and Waste Disposal Fee without retaining the former outstanding-balance wording.
- Added bilingual GST treatment notices to both the Custom Joinery Quotation and Stone Quotation. The notice changes automatically for plus GST, including GST, or GST not applicable.
- Added saved-data migration for the former Second and Third Payment wording, so existing browser data and older imported JSON files update automatically while custom wording is preserved.
- No changes were made to payment rounding, projection-area display, contract compliance clauses, or any other previously identified review items.

## v3.9.0

- Renamed the Supply & Installation Agreement field and printable Schedule label from "Estimated commencement date" to "Estimated production commencement date".
- Updated the Chinese label to "预计生产开始日期".
- Preserved the existing saved-data field, so previously entered dates continue to display without migration or reset.

## v3.8.0

- Moved the Supply & Installation Agreement's Estimated Commencement Date and Estimated Installation Date controls into the default-open Client and Project section directly below the project address.
- Removed the duplicate date controls from the collapsed Schedule section.
- The printable Schedule fields remain linked to the same saved values, so entering either date in the sidebar immediately fills the corresponding blank in the agreement preview.

## v3.7.0

- Updated the Supply & Installation Agreement Third Payment calculation to `(joinery + stone + sea/land transport) / 2 + handling fee + packaging, pallets and waste disposal fee`.
- Updated the English and Chinese formula wording shown in the sidebar and printable agreement.
- Added a data migration so agreements already saved in browser localStorage, or imported from the prior version, receive the revised default Third Payment wording without requiring a reset.

## v3.6.0

- Synced the Joinery and Stone quotation totals into the corresponding price fields in the supply agreement sidebar whenever quotation syncing is enabled.
- Made the synced sidebar price fields read-only and clearly labelled as quotation-sourced values.
- Automatically calculates the Second Payment as `(joinery + stone + sea/land transport) / 2 - First Payment`.
- Automatically calculates the Third Payment as `(joinery + stone + sea/land transport) / 2`.
- Automatically calculates both the Fourth and Fifth Payments as `Installation Fee / 2`.
- Shows all four automatic payment amounts in both the sidebar and the printable agreement preview.

## v3.5.0

- Revised Installation Agreement clause 1.4 to exclude installation of stone benchtops, stone splashbacks and other stonework, together with the existing listed exclusions.

## v3.4.0

- Updated Installation Agreement clause 1.4 to expressly exclude benchtop installation / 台面安装 from the installation scope unless otherwise agreed in writing.

## v3.3.0

- Added a third editor: Joinery Installation Agreement / 全屋定制安装协议.
- Based the new template on the supplied two-page installation agreement.
- Added bilingual editable sections for scope, programme, contract sum, two payment stages, retention, bank details, warranty, variations, responsibilities and signatures.
- Kept this agreement installation-only: it does not include product supply, freight or quotation appendices.
- Added a separate localStorage key and agreement-specific JSON import/export filename.
- Added the third agreement to every editor dropdown.
- Preserved the Vercel Hobby password gate and existing sidebar order.

## v3.2.0

- Unified the top section order in both agreement editors.
- New order: Log out, agreement selector, current editor title, then the four document action buttons.
- No agreement wording, saved data structure, authentication logic, or quotation calculations were changed.

## v3.1.0

- Reordered the sidebar controls in both agreement editors.
- The logout button now appears first.
- The agreement selector appears second.
- The current editor title appears below the selector.
- Print, export, import and reset remain as the four action buttons below the title.

## v3.0.0

- Combined the Preliminary Design Agreement and Supply & Installation Agreement into one React application.
- Added an agreement editor dropdown at the top of the left sidebar.
- Preserved separate autosave and JSON data for both agreements.
- Added a lightweight server-side shared-password login for Vercel Hobby.
- Added signed 24-hour HttpOnly session cookies, logout, Routing Middleware protection, and deployment documentation.
