# Site Analysis: overreacted.io

## Executive Summary

This report is based on 55 normalized record(s) across 10/10 collected layer(s). 7 layer(s) contain warning or error signals. 6 high/medium risk item(s) should be reviewed first.

Evidence: [E001] [E004] [E006] [E009] [E026] [E027] [M001] [M002] [M003]

Boundaries: Technical evidence alone does not prove business model or ownership.

## Public Information Architecture

Public content surface map: Collected 8 bounded public content surface(s): overreacted — A blog by Dan Abramov; A Lean Syntax Primer — overreacted; A Social Filesystem — overreacted; Beyond Booleans — overreacted; Functional HTML — overreacted.

Browser runtime loaded the page without common access barrier signals.

Public content detail map: Collected 12 bounded public content detail page(s): Goodbye, Clean Code — overreacted; I&#x27;m Doing a Little Consulting — overreacted; 404: NOT_FOUND; JSX Over The Wire — overreacted; Open Social — overreacted.

Public content surface table:
| Type | Host | Path | Status | Title |
| --- | --- | --- | --- | --- |
| technical_documentation | overreacted.io | / | 200 | overreacted — A blog by Dan Abramov |

Public detail page table:
| Kind | Host | Path | Status | Title |
| --- | --- | --- | --- | --- |
| documentation | overreacted.io | /goodbye-clean-code/ | 200 | Goodbye, Clean Code — overreacted |

Evidence: [E012] [E014] [E015] [E017] [E033] [E010] [E020] [M001] [M002] [M003] [M004]

Boundaries: Single URL and bounded runtime evidence may miss authenticated routes and deep crawl paths.

## Technology Stack

Found 1 deterministic frontend technology candidate(s).

Bounded public metadata check: Observed public CMS/forum metadata signal(s) on 14 bounded check(s).

Extracted 7 scripts, 3 stylesheets, and 1 images from static HTML.

Public app marker table:
| Host | Marker | Category | Confidence |
| --- | --- | --- | --- |
| api.overreacted.io | api | api | low |
| blog.overreacted.io | blog | blog | low |
| community.overreacted.io | community | community | low |
| docs.overreacted.io | docs | docs | low |
| status.overreacted.io | status | status | low |
| api.overreacted.io | api | api | low |

Public app header metadata table:
| Host | Kind | Status | Observed signals |
| --- | --- | --- | --- |
| blog.overreacted.io | cors | 404 | vercel_header_observed |
| blog.overreacted.io | cookie | 404 | vercel_header_observed |
| blog.overreacted.io | cms_metadata | 404 | vercel_header_observed |
| api.overreacted.io | cors | 404 | vercel_header_observed |
| api.overreacted.io | cookie | 404 | vercel_header_observed |

Evidence: [E012] [E013] [E023] [E024] [E035] [E036] [E037] [M001] [M002] [M003]

Boundaries: Static and heuristic technology evidence is candidate evidence unless directly corroborated.

## Deployment and Network Surface

HTTPS is reachable, but HSTS was not found on the probed response.

Performance score 72; 2 metric(s) are poor.

CDN header signal(s) found: cloudflare.

CDN header signal(s) found: cloudflare, proxy_or_cdn.

Cache/header evidence table:
| Source | Signal | Observed value | Boundary |
| --- | --- | --- | --- |
| main response cache policy | cache-control | public, max-age=0, must-revalidate | Header/cache signals do not prove origin topology |
| main response cache policy | cf-cache-status | DYNAMIC | Header/cache signals do not prove origin topology |
| main response headers | server | cloudflare | Header/cache signals do not prove origin topology |
| runtime asset cache policy | runtime_asset_cache_known_count | 17 | Header/cache signals do not prove origin topology |
| runtime asset cache policy | runtime_asset_cache_unknown_count | 0 | Header/cache signals do not prove origin topology |
| runtime asset cache policy | runtime_asset_cache_long_lived_count | 15 | Header/cache signals do not prove origin topology |
| runtime asset cache policy | runtime_asset_cache_unversioned_long_lived_count | 7 | Header/cache signals do not prove origin topology |

Evidence: [E004] [E007] [E026] [E001] [E002] [E005] [E008]

Boundaries: Do not claim full origin topology or CDN coverage from headers alone.

## Request and Rendering Chain

Browser runtime loaded the page and captured rendered-page evidence.

Evidence: [E011] [E019] [E020] [E021] [E032] [E010] [M001] [M002] [M003] [M004]

Boundaries: Worker fetch and one browser run do not represent every user route or session state.

## Subdomains and Attack Surface

Collected 2 bounded HTTP(S) service fingerprint hint(s) from 1 host(s).

Checked 6 bounded public host candidate(s); observed role hint(s): root, api, blog, community, docs, status.

Public host table:
| Host | Role | Status | Observed hint |
| --- | --- | --- | --- |
| overreacted.io | root | 200 | root host HTTP 200 |
| api.overreacted.io | api | 404 | api host HTTP 404 |
| blog.overreacted.io | blog | 404 | blog host HTTP 404 |
| community.overreacted.io | community | 404 | community host HTTP 404 |
| docs.overreacted.io | docs | 404 | docs host HTTP 404 |
| status.overreacted.io | status | 404 | status host HTTP 404 |

Evidence: [E033] [E034] [E035] [M011] [M012] [M013] [M014]

Boundaries: This is not a port scan, brute-force enumeration, vulnerability scan, or authenticated inventory.

## Organization and Operations Signals

Public product/business detail: Collected public product/business detail snippets from 12 bounded page(s): documentation / the-next-morning / technical_documentation / Goodbye, Clean Code — overreacted; article / im-doing-a-little-consulting / legal / I&#x27;m Doing a Little Consulting — overreacted; article / blog / technical_documentation / 404: NOT_FOUND; article / jsx-over-the-wire / news / JSX Over The Wire — overreacted; product / open-social-september-26-2025-the-protocol-is-the- / product / Open Social — overreacted. Evidence pages: product/product Open Social — overreacted (/open-s... RDAP / WHOIS-lite registration evidence was not available from the provider.

Public business/product content: Collected public business/product text snippets from 8 bounded page(s): homepage / technical_documentation / overreacted — A blog by Dan Abramov; a-lean-syntax-primer / unknown / A Lean Syntax Primer — overreacted; a-social-filesystem / technical_documentation / A Social Filesystem — overreacted; beyond-booleans / unknown / Beyond Booleans — overreacted; functional-html / support / Functional HTML — overreacted.

Collected Wayback historical archive evidence.

Public business page table:
| Kind | Hint | Path | Title | Workflow terms |
| --- | --- | --- | --- | --- |
| product | product | /open-social/ | Open Social — overreacted | |
| product | product | /what-are-the-react-team-principles/ | What Are the React Team Principles? — overreacted | |
| product | product | /before-you-memo/ | Before You memo() — overreacted | |
| article | legal | /im-doing-a-little-consulting/ | I&#x27;m Doing a Little Consulting — overreacted | |
| business_overview | business_overview | /hire-me-in-japan/ | Hire Me in Japan — overreacted | |
| article | news | /jsx-over-the-wire/ | JSX Over The Wire — overreacted | |

Evidence: [E042] [E039] [E040] [E041] [E043] [E018] [E028] [M001] [M002] [M003] [M004]

Boundaries: Registration, historical, and public-surface operation evidence do not prove current operator, legal ownership, authenticated billing, or internal settlement behavior.

## Security Posture

Bounded public cookie check:

No Set-Cookie header was observed on bounded public checks. Cookie evidence is limited to the bounded public checks.

Missing security headers: content-security-policy, strict-transport-security, x-frame-options, permissions-policy. Header evidence includes CSP/HSTS absence and frame/content-type/referrer controls.

Security control table:
| Control | Observed state |
| --- | --- |
| Missing headers | Missing security headers: content-security-policy, strict-transport-security, x-frame-options, permissions-policy |

CORS risk signal table:
| Host | Method | Path | Status | Signals | Boundary |
| --- | --- | --- | --- | --- | --- |
| overreacted.io | GET | / | 200 | allow-origin _ | Risk signal; not confirmed exploitability |
| overreacted.io | GET | / | 200 | allow-origin _ | Risk signal; not confirmed exploitability |
| api.overreacted.io | GET | / | 404 | vercel header observed | Risk signal; not confirmed exploitability |

Cookie observation table:
| Host | Method | Path/Cookie | Status | Attributes | Boundary |
| --- | --- | --- | --- | --- | --- |
| overreacted.io | GET | / | 200 | allow_origin=\* | Public cookie metadata; not authenticated behavior |
| api.overreacted.io | GET | / | 404 | vercel_id=sfo1::2q9xw-1779766843336-4538ccc4ff92 | Public cookie metadata; not authenticated behavior |
| blog.overreacted.io | GET | / | 404 | vercel_id=sfo1::h78dp-1779766843318-c1b2bd17027f | Public cookie metadata; not authenticated behavior |

Evidence: [E046] [E050] [E044] [E045] [E047] [E048] [M030] [M031] [M032] [M033]

Boundaries: Report missing controls as risk signals, not confirmed exploitability without authorized testing.

## Missing Data and Next Steps

Gap groups: add_provider: 17 (business_model_validation_beyond_public_text; complete_docs_or_blog_corpus; deep_crawl_content; +14 more) | requires_permission: 11 (authenticated_content; credentialed_authenticated_behavior; l7_permissioned_authenticated_surface_check; +8 more) | manual_review: 1 (related_domain_confirmation) | requires_user_input: 3 (login_rate_limit_validation; login_rate_limit_validation; login_rate_limit_validation) | out_of_scope: 1 (icp)

Missing data: authenticated_content (requires_permission).

Missing data: business_model_validation_beyond_public_text (add_provider).

Missing data: complete_docs_or_blog_corpus (add_provider).

Missing data: deep_crawl_content (add_provider).

Missing data: form_submission_results (add_provider).

Missing data: unlinked_public_pages (add_provider).

Evidence: [M001] [M002] [M003] [M004] [M005] [M006] [M007] [M008] [M009] [M010]

Boundaries: Do not present missing data as collected evidence.
