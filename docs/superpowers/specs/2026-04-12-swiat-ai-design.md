# Świat AI — Design Spec

**Data:** 2026-04-12
**Status:** Zatwierdzony
**Zastępuje:** Blog (docs/superpowers/specs/2026-04-09-blog-design.md)

---

## Cel

Zamiana sekcji "Blog" na automatyczną stronę newsów AI pod nazwą **"Świat AI"** (`/swiat-ai`). Newsy pobierane automatycznie z 4 darmowych API, streszczane po polsku przez OpenAI. Zero pracy redakcyjnej — strona żyje sama.

Usuwamy całą integrację z Notion (artykuły od zespołu, CMS). Nikt nie ma czasu pisać — automatyczny feed jest jedyną warstwą treści.

---

## Architektura

### Źródła danych

Pipeline newsów (istniejący `src/lib/newsCache.ts`) bez zmian:
- **HackerNews** — `hacker-news.firebaseio.com/v0`, filtr AI w tytule, limit 10
- **Dev.to** — `dev.to/api/articles`, tag `ai`, limit 8
- **The Guardian** — `content.guardianapis.com/search`, query "artificial intelligence", limit 8 (wymaga `GUARDIAN_API_KEY`)
- **Arxiv** — `export.arxiv.org/api/query`, kategoria `cs.AI`, limit 5

### Cache i koszty

- In-memory cache z TTL 2h (`Map`)
- Batch summarization przez GPT-4o-mini (model z `OPENAI_API_KEY`)
- Koszt: ~$0.001-0.002 per batch × max 12 odświeżeń/dzień = **~$0.60/miesiąc**
- Fallback: jeśli OpenAI padnie, wyświetlamy oryginalny tytuł (angielski) zamiast błędu

### API Endpoint

`GET /api/news` — istniejący, bez zmian. Zwraca `NewsItem[]` z cache.

---

## Routing i nawigacja

| Element | Zmiana |
|---|---|
| URL strony | `/swiat-ai` (nowy) |
| Menu główne | "Świat AI" zamiast "Blog" → link `/swiat-ai` |
| Footer główny | "Świat AI" zamiast "Blog" |
| Stary `/blog` | Usunięty kompletnie (strona nie była zaindeksowana) |

---

## Layout strony (desktop)

Od góry do dołu:

### 1. Nawigacja
- Taka sama jak strona główna: ciemna (`#0B0F2E`/90 + backdrop-blur), logo Infinity Tech, przycisk "Powrót"

### 2. Tło 3D
- Animowane tło generowane przez AIDesigner
- Inny motyw niż strona główna, pasujący do tematu AI/newsów
- Warstwa pod całą stroną (header, hero, grid)

### 3. Hero sekcja
- Layout: tekst (lewa strona, ~60%) + visual placeholder (prawa, ~40%)
- Zawartość: badge LIVE + badge źródła, tytuł newsa, streszczenie PL, data, "Czytaj oryginał →"
- **Auto-rotacja:** co ~8 sekund hero przełącza się na inny losowy news z ostatnich 24h
- Wskaźnik rotacji: kropki na dole (aktywna = podświetlona)
- Domyślnie: najnowszy news ze wszystkich źródeł

### 4. Pasek wyszukiwania + filtry źródeł
- Lewa strona: input search ("Szukaj newsów...") — filtruje po tytule i streszczeniu
- Prawa strona: przyciski filtrów: Wszystkie | HackerNews | Dev.to | Guardian | Arxiv
- Aktywny filtr: podświetlony (`#2E4AAD`), reszta: ciemne z borderem
- Separator: border-top + border-bottom (`#1A2461`)

### 5. Sekcja główna (grid + sidebar)
- **Grid newsów (3/4 szerokości):**
  - Nagłówek: "Wszystkie newsy (N)" z ikoną tagu
  - Grid: **3 kolumny × 4 rzędy = 12 kart** na start
  - Karta newsa: badge źródła (kolor), tytuł, streszczenie PL, data, link external ↗
  - Hover: podświetlenie bordera (`#4F6AE8`), podświetlenie tła
  - **Przycisk "Pokaż więcej newsów ↓"** — klik rozwija resztę newsów (animacja fade-in)

- **Sidebar (1/4 szerokości):**
  - **Popularne** — top 3 najczęściej... (sortowane po pozycji w źródle — HN topstories mają naturalny ranking)
  - **Newsletter** — email input + "Zapisz się" (podłączony do istniejącego waitlist API)
  - **Obserwuj nas** — LinkedIn, X/Twitter, YouTube (ikony w ciemnych kółkach)

### 6. Footer
- Taki sam jak strona główna, z linkiem "Świat AI" zamiast "Blog"

---

## Responsywność (mobile)

- Hero: stack pionowy (tekst nad visualem)
- Filtry: scrollowalny horizontal
- Grid: 1 kolumna
- Sidebar: pod gridem (pełna szerokość)
- "Pokaż więcej": pełna szerokość

---

## Kolorystyka

Identyczna paleta jak strona główna:
- Tło: `#0B0F2E`
- Karty: `#1A2461` / `#1A246180`
- Akcenty: `#2E4AAD`, `#4F6AE8`, `#7B9BDB`
- Tekst: `white`, `#D6E4FF`, `#B8C9E8`
- Tekst drugorzędny: `#7B9BDB`
- Border: `#2E4AAD` / `#2E4AAD40`

Kolory źródeł:
- HackerNews: `#FF6600`
- Dev.to: `#7B9BDB`
- Guardian: `#4F6AE8`
- Arxiv: `#059669`

---

## Pliki — zmiany

### Nowe pliki
| Plik | Opis |
|---|---|
| `src/app/swiat-ai/page.tsx` | Server component, ISR, metadata SEO |
| `src/components/AiNewsPage.tsx` | Client component: hero z rotacją, search, filtry, grid, sidebar, "pokaż więcej" |

### Bez zmian
| Plik | Opis |
|---|---|
| `src/lib/newsCache.ts` | Pipeline newsów — działa, nie ruszamy |
| `src/app/api/news/route.ts` | GET endpoint — działa, nie ruszamy |

### Do edycji
| Plik | Zmiana |
|---|---|
| `src/app/page.tsx` | menuItems: "Blog" → "Świat AI", link → `/swiat-ai`. Footer: tak samo |

### Do usunięcia
| Plik | Powód |
|---|---|
| `src/app/blog/page.tsx` | Zastąpiony przez `/swiat-ai` |
| `src/app/blog/[slug]/page.tsx` | Nie ma artykułów, nie potrzebny |
| `src/components/blog/BlogContent.tsx` | Zastąpiony przez `AiNewsPage.tsx` |
| `src/components/NewsSection.tsx` | Wchłonięty do `AiNewsPage.tsx` |
| `src/lib/notion.ts` | Brak integracji Notion |

### Do rozważenia usunięcia
| Plik | Uwaga |
|---|---|
| `@notionhq/client` w package.json | Nie używany po usunięciu notion.ts |
| `notion-to-md` w package.json | Nie używany |
| `@tailwindcss/typography` | Nie używany (brak renderowania markdown) |
| `react-markdown` | Nie używany |

---

## Tło 3D (AIDesigner)

- Generowane osobno przez AIDesigner na etapie implementacji
- Wymagania: animowane, ciemne, motyw AI/tech/kosmiczny, inne niż na stronie głównej
- Warstwa pod całą treścią strony
- Nie może przytłaczać contentu — subtelne, w tle

---

## Co NIE jest w scope

- Artykuły od zespołu / Notion CMS
- System komentarzy
- Paginacja server-side
- RSS feed
- Wielojęzyczność
- Panel admina

---

## Kryteria sukcesu

- [ ] Strona `/swiat-ai` renderuje newsy z co najmniej 2 źródeł
- [ ] Polskie streszczenie widoczne dla każdego newsa
- [ ] Auto-rotacja hero działa (zmiana co ~8s)
- [ ] Filtry źródeł działają (klik → filtrowanie grida)
- [ ] Wyszukiwarka filtruje po tytule/streszczeniu
- [ ] "Pokaż więcej" rozwija resztę newsów
- [ ] Link "Świat AI" widoczny w nawigacji głównej
- [ ] Sidebar: Popularne, Newsletter, Obserwuj nas obecne
- [ ] Stare pliki `/blog` usunięte
- [ ] Tło 3D wygenerowane przez AIDesigner
- [ ] Mobile responsive
