# Domains & Mini-Sites — Help

Mini-sites are secondary hostnames (for example ihr.com) that share this portal database but show their own branding, menus, analytics, and SEO. Stories assigned to a mini-site are exclusive to that host (404 on the primary portal). Unmapped content and most admin/login paths redirect to the primary portal host. Digital product checkout can stay on the mini-site via `/domain/checkout/index`.

## Connect the domain (DNS)
How to make this domain work with the portal
This app matches the browser Host header to the Domain host (and aliases) saved below. DNS and TLS must send that hostname to the same servers that serve the primary portal.

1. Save this form with Status = Active and a Primary menu selected.
2. At your DNS provider (GoDaddy, Cloudflare, Route 53, etc.), point the mini-site hostname at the same infrastructure as the primary portal.
3. Ask ops / hosting to add the hostname (and www if used) to the TLS certificate or load balancer so HTTPS works.
4. Wait for DNS to propagate (often minutes; sometimes up to 24–48 hours), then open `https://your-domain/` in a browser.

Primary portal host (target): `www.mypeople001.com`
Mini-site traffic must resolve to the same application stack as this host. Do not register the primary host itself as a mini-site.

## Checklist after DNS
- `https://your-domain` loads this portal (not a parking page or wrong site).
- Browser address bar shows your mini-site host (not only the primary host).
- Certificate warning is gone (hostname covered by TLS).
- This domain row is Active; Primary menu content appears on the mini-site.
- Local / staging without DNS: use `?mock_host=your.domain` (development only).

## Digital product checkout (on mini-site)
For digital products (no shipping), buyers can pay with a credit card on the mini-site host via Stripe — without leaving for HR.com. Guest checkout needs first name, last name, and email only (plus card). Sign in / Create account is optional and returns the user to the same checkout page.

### How to add a checkout link in a story
1. In Story Manager, open the story and edit the Long description (HTML).
2. Insert a normal link to the mini-site checkout URL, replacing the product id:
   `/en?t=/domain/checkout/index&productID=12345`

Example HTML: `<a href="/en?t=/domain/checkout/index&productID=12345">Buy now</a>` — use a real PRODUCTID from Merchant → Products (active digital product).
**Local testing**: append `&mock_host=your.domain`

Payment uses the same Stripe member keys as HR.com checkout.
Full cart / classic `/merchant` checkout paths still redirect to the primary host.

### Login, register, and classic checkout (primary handoff)
Full portal Login & Register (`/my/*`) and classic Buy / cart `/merchant` links still go to the primary portal host (absolute URLs) with UTM parameters. Opening those apps directly on the mini-site host redirects to primary — except mini-site Sign in / Join and `/domain/checkout/index`.

### Local testing
In development only, append `?mock_host=your.domain` (for example `?mock_host=ihr.com`) to simulate the secondary Host without editing the OS hosts file. After that, the mock host is remembered for the session so pretty URLs keep mini-site chrome; clear with `?mock_host=0`. Production always uses the real Host header.
