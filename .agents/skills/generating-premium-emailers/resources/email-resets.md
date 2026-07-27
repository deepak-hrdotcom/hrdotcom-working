# Email CSS Resets

Standard reset to prevent unexpected rendering in Gmail, Outlook, and Apple Mail.

```css
html, body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background-color: #F4F5F7;
    -webkit-font-smoothing: antialiased;
}

* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

table, td {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
    border-spacing: 0 !important;
    border-collapse: collapse !important;
}

img {
    -ms-interpolation-mode: bicubic;
    border: 0;
    height: auto;
    line-height: 100%;
    outline: none;
    text-decoration: none;
}

a {
    text-decoration: none;
    color: inherit;
}

/* Outlook specific fixes */
.ExternalClass { width: 100%; }
.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
```
