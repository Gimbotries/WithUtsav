# Prospect CSVs — Gyms & Tutors/Coaching (Delhi NCR)

Import either file into Google Sheets: **File → Import → Upload → Replace spreadsheet**.

## Files

| File | What |
|------|------|
| `01_gyms_delhi_ncr.csv` | **100** independent gyms without a strong website |
| `02_tutors_coaching_delhi_ncr.csv` | **100** IIT/NEET + Spoken English + Music prospects |
| `01_gyms_CALL_READY.csv` | Gyms that already have a public phone (start here) |
| `02_tutors_CALL_READY.csv` | Tutors/institutes with a public phone |

## Columns

- `website_status`: `none` / `instagram_only` / `unknown_likely_none` / `broken_or_template` / `urbanpro_only`
- `call_ready`: `yes` if a phone number is in the sheet
- `priority_score`: **lower = better** (sorted already)

## How to use

1. Sort/filter by `call_ready = yes` and `priority_score` ascending.
2. For blank phones: open `source_url` (Justdial → Show Number, or UrbanPro).
3. Before calling, spot-check Google Maps — status can change.
4. Skip anyone who clearly already has a polished branded site.

## Filters applied

- Excluded big gym chains (Cult, Gold’s, Anytime, etc.)
- Excluded big coaching brands (Allen, FIITJEE, Aakash, etc.) where known
- Deprioritized thin/template sites that still have some domain

## Honest limits

Phones were **never invented**. Many tutors only list on UrbanPro/Justdial with gated numbers — unlock those via the source links. Re-verify “no website” before spending call time.
