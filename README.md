# Infinity Tech - AI Solutions Landing Page

Nowoczesny landing page dla firmy Infinity Tech, specjalizującej się w dostarczaniu rozwiązań AI dla małych, średnich i dużych przedsiębiorstw.

## Technologie

- **Next.js 14** - Framework React
- **TypeScript** - Bezpieczeństwo typów
- **Tailwind CSS** - Stylizacja
- **GSAP** - Animacje
- **ReactBits** - Komponenty animowane

## Struktura Projektu

```
infinity-landing/
├── src/
│   ├── app/
│   │   ├── globals.css      # Style globalne
│   │   ├── layout.tsx      # Layout aplikacji
│   │   └── page.tsx        # Główna strona
│   ├── components/
│   │   └── react-bits/     # Biblioteka komponentów
│   │       ├── TextAnimations/
│   │       │   ├── SplitText.tsx
│   │       │   ├── TextType.tsx
│   │       │   ├── ShinyText.tsx
│   │       │   └── ScatterWords.tsx
│   │       ├── Backgrounds/
│   │       │   ├── Beams.tsx
│   │       │   ├── Aurora.tsx
│   │       │   ├── Particles.tsx
│   │       │   ├── AnimatedGradient.tsx
│   │       │   └── Dither.tsx
│   │       ├── Cards/
│   │       │   ├── SpotlightCard.tsx
│   │       │   ├── TiltedCard.tsx
│   │       │   ├── ProfileCard.tsx
│   │       │   └── GlowBorder.tsx
│   │       └── UI/
│   │           ├── Ripple.tsx
│   │           ├── MagneticButton.tsx
│   │           ├── Marquee.tsx
│   │           ├── Accordion.tsx
│   │           └── AnimatedCounter.tsx
│   └── lib/
│       └── utils.ts         # Funkcje pomocnicze
├── public/
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## Komponenty

### Text Animations
- **SplitText** - Animacja tekstu znak po znaku
- **TextType** - Efekt maszyny do pisania
- **ShinyText** - Błyszczący gradientowy tekst
- **ScatterWords** - Rozproszone słowa przy pojawianiu

### Backgrounds
- **Beams** - Świetlne promienie w tle
- **Aurora** - Efekt zorzy polarnej
- **Particles** - Cząsteczki z połączeniami
- **AnimatedGradient** - Animowany gradient
- **Dither** - Efekt szumu

### Cards
- **SpotlightCard** - Karta z efektem reflektora
- **TiltedCard** - Karta 3D z efektem tilt
- **ProfileCard** - Karta członka zespołu ze zdjęciem
- **GlowBorder** - Świecąca ramka przy hover

### UI Components
- **Ripple** - Efekt ripple na przyciskach
- **MagneticButton** - Przycisk z efektem magnetycznym
- **Marquee** - Przesuwające się elementy
- **Accordion** - FAQ z animacją
- **AnimatedCounter** - Animowany licznik

## Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/twoj-username/infinity-landing.git
cd infinity-landing

# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny
npm run build
```

## Uruchomienie

```bash
npm run dev
```

Strona będzie dostępna pod adresem: http://localhost:3000

## Sekcje Strony

1. **Hero** - Nagłówek z Beams i Particles
2. **Statystyki** - Animowane liczniki
3. **Dlaczego My** - Karty z Spotlight
4. **Zespół** - ProfileCards ze zdjęciami
5. **Usługi** - TiltedCards z cenami
6. **Partnerzy** - Marquee z technologiami
7. **Technologia** - Aurora + Particles
8. **FAQ** - Accordion
9. **Kontakt** - Formularz
10. **CTA** - Wezwanie do działania
11. **Footer** - Rozbudowany z social media

## Zdjęcia

Zdjęcia pochodzą z Pexels (darmowe do użytku komercyjnego):
- https://www.pexels.com/

## Technologie AI

Strona promuje rozwiązania oparte na:
- OpenCLAW - Framework agentów AI
- ChatGPT, Claude, Gemini - Modele językowe

## Autorzy

- **Jan Kowalski** - CEO & Founder
- **Anna Nowak** - CTO
- **Piotr Wiśniewski** - AI Engineer
- **Maria Lewandowska** - Business Development

## Licencja

MIT License

## Kontakt

- Email: contact@infinityteam.io
- Website: https://infinitytech.io
