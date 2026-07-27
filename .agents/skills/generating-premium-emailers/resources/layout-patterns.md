# Email Layout Patterns

### 2-Column Responsive Layout

This pattern uses `inline-block` for mobile stacking and MSO conditionals for Outlook desktop.

```html
<div style="font-size: 0; text-align: center;">
    <!--[if mso]>
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="600">
    <tr>
    <td width="300" valign="top">
    <![endif]-->
    <div style="display: inline-block; width: 100%; max-width: 300px; vertical-align: top; font-size: 16px;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
                <td style="padding: 10px;">
                    <!-- Column 1 Content -->
                </td>
            </tr>
        </table>
    </div>
    <!--[if mso]>
    </td><td width="300" valign="top">
    <![endif]-->
    <div style="display: inline-block; width: 100%; max-width: 300px; vertical-align: top; font-size: 16px;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
                <td style="padding: 10px;">
                    <!-- Column 2 Content -->
                </td>
            </tr>
        </table>
    </div>
    <!--[if mso]>
    </td></tr></table>
    <![endif]-->
</div>
```

### Fluid Button Pattern

```html
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
    <tr>
        <td align="center" style="border-radius: 999px; background: linear-gradient(90deg, #E51069 0%, #EF4A3D 100%);">
            <a href="#" target="_blank" style="display: inline-block; padding: 15px 35px; font-family: 'Manrope', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 999px;">
                REGISTER NOW
            </a>
        </td>
    </tr>
</table>
```
