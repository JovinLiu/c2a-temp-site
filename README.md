# C2A Agreement Suite

A private bilingual React application containing three agreement editors:

1. Preliminary Design Agreement
2. Supply & Installation Agreement, including Schedule 1 quotation forms
3. Joinery Installation Agreement for installation services only

The active editor is selected from the dropdown near the top of the left sidebar. Each agreement keeps its own browser autosave and JSON import/export data.

In the Supply & Installation editor, quotation totals can be synced into both the printable Contract Price table and the matching sidebar price fields. Payment stages 2–5 are then calculated automatically from the effective joinery, stone, freight and installation amounts.

The printable Supply & Installation Agreement uses corrected Second and Third Payment descriptions that match the automatic calculations. Both Schedule 1 quotation sheets also show a bilingual GST treatment notice derived from the agreement's GST setting.

The Supply & Installation editor keeps the two key project date inputs—Estimated Production Commencement Date and Estimated Installation Date—in the default-open Client and Project section, directly below the project address.

## Local editor preview

```bash
npm install
npm run dev
```

This opens the React editor without the Vercel password middleware, which is useful while editing the source code.

## Test the password gate locally

1. Copy `.env.example` to `.env.local`.
2. Set `APP_PASSWORD` and `SESSION_SECRET`.
3. Run:

```bash
npm install
npm run dev:vercel
```

## Deploy to Vercel Hobby

Push the project to a private GitHub repository and import it into Vercel. In Vercel Project Settings -> Environment Variables, create:

- `APP_PASSWORD`: the password entered on the blank login page
- `SESSION_SECRET`: a long random value used to sign the 24-hour HttpOnly session cookie

Apply both variables to Production and Preview, then redeploy.

Generate a session secret on macOS, Linux or Git Bash:

```bash
openssl rand -base64 48
```

The password is checked inside a Vercel Function and is never included in the React bundle. Routing Middleware blocks the editor HTML and its static assets until the signed session cookie is valid.

## Agreement data

The three agreements use separate localStorage keys, so switching editors does not overwrite another agreement. JSON files are also exported with agreement-specific filenames.

The new Joinery Installation Agreement is limited to installation services. Its default wording excludes product supply, joinery transport, sinks, tapware, power outlets, silicone sealing or caulking, appliance installation unless separately charged, and works by other trades.

## Data storage

Agreement data is saved in the current browser's localStorage. It is not uploaded to Vercel and is not encrypted at rest in the browser. Export a separate JSON file for important client agreements and avoid using the editor on a shared computer.

## Sidebar order

The sidebar begins with Log out, followed by the agreement selector, the current editor title, and the four document action buttons.

## Installation fee calculator

The Joinery Installation Agreement includes an editor-only installation fee calculator at the end of its preview. Enter a default rate per square metre and the joinery dimensions. The calculator totals the projection area and automatically synchronises the calculated installation fee to the agreement Contract Sum. The calculator is displayed as a centred editor card matching the agreement preview and is hidden when printing or saving the agreement as PDF.
