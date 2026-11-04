# Plate leaf v3: handover

Status on 2026-11-03: v2 of the traced plate leaf is built and published (4 source photos, ellipse-rectified, priority-merged — see artifact https://claude.ai/artifact/JkziXYt3Eu71QFsX1y5kdK). User asked to go further: rebuild it as if there had never been any cutlery on the plate at all — a clean, confident, finished trace, not a visible photo-merge. A background agent may already be doing this — check the AURA artifact gallery for a "Plate Leaf Trace v3" before starting fresh work.

Background reading if context is missing: `docs/home-redesign-handover.md` section 5 (plate visual extraction spec: colors, usage, 15KB budget, sign-off requirement).

## Scratch state from the v2 build

Everything lives in: `C:\Users\WORLDTECH COMPUTER\AppData\Local\Temp\claude\D--Sak-Projects-AURA-aura\11addee9-4108-4914-9510-57c65ee16f54\scratchpad\leaf\`

Key files already there:
- `src_pork.jpg`, `src_trio.jpg`, `src_amok.jpg`, `src_popcorn.jpg` — 4 source crops.
- `rect_pork.png`, `rect_trio.png`, `rect_amok.png`, `rect_popcorn.png` — ellipse-rectified (perspective-corrected) top-down views.
- `r_{name}_deep.png` / `r_{name}_lime.png` / `r_{name}_occ.png` / `r_{name}_vis.png` for each source — color masks + occlusion mask, on the rectified images.
- `m2_deep.png` / `m2_lime.png` / `m2_unknown.png` / `m2_source_map.png` — priority-merged result (pork > trio > popcorn > amok), unknown=1,018px.
- `m4_deep.png` / `m4_lime.png` — after inpainting the tiny unknown speckles.
- `m5_deep.png` / `m5_lime.png` / `m5_vis.png` — after gentle smoothing (final v2 masks; deep=96,527px, lime=57,634px).
- `leaf_v2.svg` — vectorized result, 11,729 bytes.
- `build_signoff_v2.py`, `signoff_v2.html` — sign-off page builder/output (reuse as a template).

Registration alignment already solved (brute-force rotation+translation grid search, IoU-maximized against pork as reference): `trio: theta=282.6, dx=-9, dy=-12`; `amok: theta=177.0, dx=11, dy=2`; `popcorn: theta=249.2, dx=25, dy=-10`. Don't redo this unless you suspect it's wrong — it's expensive (ran ~164s as a background task).

## What "picture perfect" still requires (the gap between v2 and this ask)

v2 fixed occlusion coverage (1,018 unknown px instead of 13,527) but is still visibly a photo-merge in places. Look for and fix:
1. Jagged seam lines at source-boundary edges (where the priority merge switches from one source to another — check `m2_source_map.png`).
2. Slight green-tone mismatches between sources' contributions (different lighting/white balance per photo).
3. Small amoeba-blobs from sub-pixel registration error.
4. Edges that are soft/fuzzy from cutlery shadow bleed rather than true leaf boundary.

Fix approach: smooth/snap ambiguous seam boundaries to the most natural continuous curve, using the leaf's own structure (consistent lobe width, consistent vein-hole size, smooth midrib curve) as the guide — **not generic left-right symmetry** (the leaf design is confirmed NOT bilaterally symmetric from the sharper amok/popcorn photos; don't mirror-fill).

## Steps

1. Clean up m5_deep/m5_lime per the 4 issues above.
2. Re-vectorize: same method as before (`RETR_CCOMP`, `approxPolyDP`, two layers deep `#3E8952`/shadow `#114715` and lime `#ACBC15`, even-odd fill). Keep under ~15KB. Tune epsilon for smoother curves if it helps it read as art rather than photo-trace.
3. Build a v1→v2→v3 side-by-side comparison image.
4. Build a new sign-off artifact (reuse `build_signoff_v2.py` structure), explaining what changed from v2 and why it now reads as "uncovered." Publish with icon `"leaf"`, title along the lines of "Plate Leaf Trace v3".
5. Be honest in the sign-off page about any remaining genuine ambiguity (best-guess reconstruction vs. real pixels) — don't paper over it.

## Constraints

- Scratch-only. Do not touch `D:\Sak\Projects\AURA\aura\src` or `assets` — this stays unsigned-off until the user approves it, same as v1/v2.
- Report back with the artifact URL and a concise, honest explanation of what was cleaned up.
