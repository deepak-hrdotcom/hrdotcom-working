---
name: newsletter-sponsor-ad-tracker-integration
description: Guides the integration and configuration of sponsor ads, DoubleClick click tracking URLs, and 1x1 impression tracking pixels into HR.com community newsletters and eBulletins. Trigger keywords include "insert ad tracker", "doubleclick tracker", "sponsor ad tracker", "1x1 impression pixel", "chro newsletter ad", "ebulletin sponsor ad".
---

# Newsletter Sponsor Ad & DoubleClick Tracker Integration

This skill documents the exact workflow, code structure, and rules for inserting sponsor advertisements, DoubleClick click trackers, and 1x1 impression tracking pixels into HR.com newsletters (CHRO Excellence, Weekly eBulletin, etc.).

---

## 🎯 When to Use This Skill
- Adding or swapping a sponsor ad banner in HR.com newsletters or eBulletins.
- Configuring 3rd-party click tracking URLs (e.g. Google DoubleClick `trackclk`).
- Inserting 1x1 impression tracking pixels (e.g. Google DoubleClick `trackimp`).
- Replacing timestamp placeholders (`[TIMESTAMP]`) with campaign live dates.
- Trigger phrases: "insert ad tracker", "doubleclick ad", "sponsor ad", "impression pixel", "update ad in newsletter".

---

## 📁 Repository Reference Locations
- **Active Newsletter Folder:** [`00-emailers/chro-community-newsletter/`](file:///e:/HR/00-html/00-emailers/chro-community-newsletter/)
- **Sample Reference File:** [`00-emailers/chro-community-newsletter/sample-reference-test-2.html`](file:///e:/HR/00-html/00-emailers/chro-community-newsletter/sample-reference-test-2.html)
- **Live Campaign Example:** [CCM Campaign 6aa86f9234a4dd6740d63560](https://ccmnew.hr.com/campaigns/6aa86f9234a4dd6740d63560/)

---

## 🧩 The Two Tracking Components

Every 3rd-party tracked advertisement consists of **two parts**:

### 1. The Click Tracker (Applied to the Banner Link `<a>`)
Redirects the user through the ad network tracker before landing on the client's destination page.
- URL structure: `https://ad.doubleclick.net/ddm/trackclk/...`
- Contains parameters: `dc_trk_aid`, `dc_trk_cid`, `gdpr=${GDPR}`, `gdpr_consent=${GDPR_CONSENT_755}`, `dc_tdv=1`.

### 2. The 1x1 Impression Tracker (Inserted as `<img>` at the document bottom)
Fires an impression when the email is opened by the recipient.
- URL structure: `https://ad.doubleclick.net/ddm/trackimp/...`
- Contains timestamp parameter: `ord=[YYYYMMDD];` (or `ord=[TIMESTAMP]`).
- Tag attributes: `attributionsrc="" border="0" height="1" width="1" alt="Advertisement"`.

---

## ⚙️ Standard Implementation Workflow

### Step 1: Update Masthead Banner Date
Ensure the newsletter masthead publication date reflects the scheduled send date (e.g., `Wednesday, September 16, 2026`).

```html
<p style="font: 700 14px/16px Roboto, Arial, sans-serif; white-space: nowrap; margin-block: 0; padding-top: 12px; padding-bottom: 12px; color: #334155;">
  Wednesday, September 16, 2026
</p>
```

### Step 2: Replace Top Right Sponsor Ad
In the 2-column header/editorial section, locate the right column (`width="300"`):
1. **Remove placeholder text**: Remove `<p>Advertise Here</p>` or similar placeholder headers so the ad card sits flush and aligns cleanly with the left content.
2. **Apply Click Tracker URL**: Place the DoubleClick `trackclk` link in the `<a href="..." target="_blank">`.
3. **Insert Responsive Ad Image**: Maintain 300px width with email-safe inline styles.

```html
<!-- Right Column: Sponsor Ad -->
<table class="column" role="presentation" style="border-spacing: 0; vertical-align: top; width: 100%; max-width: 300px; display: inline-block;">
  <tr>
    <td class="padding last" align="center" style="padding: 20px 0; background-color: #ffffff; text-align: center;">
      <table role="presentation" style="border-spacing: 0; margin: 0 auto; text-align: center; width: 100%; max-width: 300px;">
        <tr>
          <td align="center" style="padding: 0;">
            <a href="https://ad.doubleclick.net/ddm/trackclk/N5506.4680424MEDIASPACESOLUTIONS/B36717118.456388876;dc_trk_aid=650993101;dc_trk_cid=264866517;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ltd=;dc_tdv=1" target="_blank" style="display: inline-block;">
              <img class="third-img-last" src="https://media-cdn.hr.com/media.hr.com/email_images/ebulletins/sponsorads/2026/Intuit-Quickbooks-ebulletin-2027.png" width="300" alt="Quickbooks Workforce" style="display: block; margin: 0 auto; border: 0; width: 100%; max-width: 300px; height: auto;" />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

### Step 3: Insert 1x1 Impression Tracking Pixel at Document Bottom
Place the tracking `<img>` tag right before the closing `</body>` tag (after the outermost table / container `</div>`).
- Replace `[TIMESTAMP]` in `ord=[TIMESTAMP];` with the live date in `YYYYMMDD` format (e.g. `20260916` -> `ord=[20260916];`).

```html
      </div>
    </div>
    <!-- 1x1 DoubleClick Impression Tracker -->
    <img src="https://ad.doubleclick.net/ddm/trackimp/N5506.4680424MEDIASPACESOLUTIONS/B36717118.456388876;dc_trk_aid=650993101;dc_trk_cid=264866517;ord=[20260916];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ltd=;dc_tdv=1?" attributionsrc="" border="0" height="1" width="1" alt="Advertisement">
  </body>
</html>
```

---

## 🔍 Quality Assurance & Verification Checklist
- [ ] **Date Verification:** Both the masthead text date and the `ord=[YYYYMMDD]` impression parameter match the exact scheduled send date.
- [ ] **No Escaped Query Characters:** Ensure parameters like `${GDPR}` and `${GDPR_CONSENT_755}` are preserved without unwanted HTML character encoding entity corruption (e.g. not `%7BGDPR%7D` unless required by the delivery engine).
- [ ] **Flush Alignment:** Ensure any "Advertise Here" placeholder text is removed so the banner top edge aligns with adjacent editorial content.
- [ ] **Mobile Responsiveness:** Image includes `width="300"`, `max-width: 300px`, `height: auto`, and responsive class `third-img-last`.
- [ ] **Invisible Impression Tag:** The 1x1 pixel has `border="0" height="1" width="1"` and is placed outside visual layout tables to avoid unexpected whitespace in Outlook or Apple Mail.
