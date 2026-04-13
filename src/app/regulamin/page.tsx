import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

export const metadata: Metadata = {
  title: 'Regulamin | Infinity Tech',
  description: 'Regulamin korzystania z serwisu Infinity Tech — warunki świadczenia usług drogą elektroniczną.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2E] text-white relative">
      <div className="fixed inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[4, 5, 3]}
          lineDistance={[4, 5, 6]}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          parallaxStrength={0.15}
          animationSpeed={0.8}
          linesGradient={['#1A2461', '#2E4AAD', '#4F6AE8', '#7B9BDB', '#2E4AAD']}
          mixBlendMode="screen"
        />
      </div>

      <nav className="sticky top-0 z-50 bg-[#0B0F2E]/80 backdrop-blur-md border-b border-[#1A2461]/30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image src="/logo.png" alt="Infinity Tech" width={32} height={32} className="object-contain brightness-0 invert md:w-[42px] md:h-[42px]" />
            <span className="text-lg md:text-2xl font-bold text-white">INFINITY TECH</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[#7B9BDB] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Powrót</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Regulamin</h1>
        <p className="text-[#7B9BDB] mb-12">Ostatnia aktualizacja: 13 kwietnia 2026 r.</p>

        <article className="space-y-12 text-white/85 leading-relaxed text-[15px] md:text-base">

          {/* 1 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">1. Postanowienia ogólne</h2>
            <p className="mb-4">
              Niniejszy Regulamin określa zasady i warunki korzystania z serwisu internetowego
              dostępnego pod adresem{' '}
              <a href="https://infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">infinityteam.io</a>{' '}
              (dalej: &bdquo;Serwis&rdquo;). Regulamin stanowi regulamin świadczenia usług drogą
              elektroniczną w rozumieniu art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu
              usług drogą elektroniczną (Dz.U. 2002 nr 144, poz. 1204 ze zm.).
            </p>
            <div className="bg-white/5 rounded-xl p-5 mb-4 border border-white/10 text-sm space-y-1">
              <p className="text-white font-semibold mb-2">Usługodawca:</p>
              <p>Infinity Tech</p>
              <p>Zamość, woj. lubelskie, Polska <span className="text-[#7B9BDB]">[dokładny adres do uzupełnienia]</span></p>
              <p>NIP: <span className="text-[#7B9BDB]">[do uzupełnienia]</span></p>
              <p>REGON: <span className="text-[#7B9BDB]">[do uzupełnienia]</span></p>
              <p>E-mail: <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a></p>
            </div>
            <p>
              Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu. Jeśli nie zgadzasz się
              z jego postanowieniami, prosimy o zaprzestanie korzystania z Serwisu.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">2. Definicje</h2>
            <div className="space-y-3">
              <p><strong className="text-white">Usługodawca</strong> — Infinity Tech, podmiot prowadzący Serwis, którego dane wskazano w pkt 1.</p>
              <p><strong className="text-white">Użytkownik</strong> — każda osoba fizyczna, osoba prawna lub jednostka organizacyjna korzystająca z Serwisu.</p>
              <p><strong className="text-white">Serwis</strong> — strona internetowa dostępna pod adresem infinityteam.io wraz ze wszystkimi podstronami i funkcjonalnościami.</p>
              <p><strong className="text-white">Usługi</strong> — usługi świadczone drogą elektroniczną przez Usługodawcę za pośrednictwem Serwisu, opisane w pkt 3.</p>
              <p><strong className="text-white">Chat AI</strong> — asystent oparty na sztucznej inteligencji, dostępny w oknie czatu w Serwisie, generujący odpowiedzi przy użyciu modeli językowych.</p>
              <p><strong className="text-white">RODO</strong> — Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych.</p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">3. Rodzaje i zakres usług</h2>
            <p className="mb-4">
              Za pośrednictwem Serwisu Usługodawca świadczy nieodpłatnie następujące usługi drogą elektroniczną:
            </p>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Treści informacyjne</p>
                <p className="text-sm">Prezentacja informacji o usługach Infinity Tech, aktualności ze świata sztucznej inteligencji (sekcja &bdquo;Świat AI&rdquo;), interaktywny kalkulator ROI oraz materiały edukacyjne.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Formularz kontaktowy</p>
                <p className="text-sm">Umożliwienie Użytkownikowi przesłania zapytania do zespołu Infinity Tech w celu uzyskania informacji o usługach lub podjęcia współpracy.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Newsletter i lista oczekujących</p>
                <p className="text-sm">Wysyłanie informacji o nowościach, produktach i usługach Infinity Tech na wskazany przez Użytkownika adres e-mail.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Chat AI (Asystent)</p>
                <p className="text-sm">Udzielanie automatycznych odpowiedzi na pytania Użytkownika dotyczące usług Infinity Tech, z wykorzystaniem modelu sztucznej inteligencji.</p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">4. Warunki techniczne</h2>
            <p className="mb-4">
              Do prawidłowego korzystania z Serwisu niezbędne jest spełnienie następujących
              wymagań technicznych:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>urządzenie z dostępem do sieci Internet (komputer, tablet, smartfon);</li>
              <li>aktualna wersja przeglądarki internetowej (Chrome, Firefox, Safari, Edge) z włączoną obsługą JavaScript;</li>
              <li>aktywne połączenie internetowe.</li>
            </ul>
            <p className="mt-4">
              Korzystanie z Serwisu jest bezpłatne i nie wymaga rejestracji ani zakładania konta.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">5. Zawarcie i rozwiązanie umowy o świadczenie usług</h2>
            <p className="mb-4">
              Umowa o świadczenie usług drogą elektroniczną zostaje zawarta z chwilą wejścia
              Użytkownika na stronę Serwisu (w przypadku usług informacyjnych) lub z chwilą
              wysłania formularza bądź zapisania się do newslettera (w przypadku pozostałych usług).
            </p>
            <p className="mb-4">
              Umowa zostaje rozwiązana z chwilą opuszczenia Serwisu przez Użytkownika (w przypadku
              usług informacyjnych) lub z chwilą zrealizowania usługi (np. wysłanie odpowiedzi
              na formularz kontaktowy). W przypadku newslettera umowa trwa do momentu rezygnacji
              z subskrypcji.
            </p>
            <p>
              Użytkownik może w każdej chwili zrezygnować z korzystania z usług Serwisu bez
              podawania przyczyn, zamykając stronę internetową lub kontaktując się z Usługodawcą
              w celu wypisania się z newslettera.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">6. Prawa i obowiązki Użytkownika</h2>
            <p className="mb-4">
              Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z jego przeznaczeniem,
              obowiązującym prawem polskim i europejskim oraz postanowieniami niniejszego Regulaminu.
            </p>
            <p className="mb-4">
              W szczególności Użytkownik zobowiązany jest do niedostarczania treści o charakterze
              bezprawnym, w tym treści naruszających dobra osobiste osób trzecich, treści
              nawołujących do nienawiści, dyskryminacji lub przemocy, treści pornograficznych,
              oraz treści naruszających prawa autorskie lub inne prawa własności intelektualnej.
            </p>
            <p>
              Użytkownik nie może podejmować działań mających na celu zakłócenie prawidłowego
              funkcjonowania Serwisu, w tym prób nieautoryzowanego dostępu do systemów
              informatycznych Usługodawcy, przeprowadzania ataków typu DDoS, injectowania
              złośliwego kodu ani automatycznego pobierania treści Serwisu (scraping)
              w celach komercyjnych.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">7. Formularz kontaktowy</h2>
            <p className="mb-4">
              Użytkownik może przesłać zapytanie poprzez formularz kontaktowy, podając swoje imię,
              adres e-mail, numer telefonu (opcjonalnie) oraz treść wiadomości. Wysłanie formularza
              oznacza zapoznanie się z niniejszym Regulaminem oraz{' '}
              <Link href="/polityka-prywatnosci" className="text-[#7B9BDB] underline hover:text-white">Polityką Prywatności</Link>.
            </p>
            <p className="mb-4">
              Usługodawca dołoży starań, aby odpowiedzieć na zapytanie w ciągu 3 dni roboczych
              od jego otrzymania. Dane z formularza są przetwarzane wyłącznie w celu obsługi
              zapytania i nie są zapisywane w bazie danych Serwisu.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">8. Newsletter i lista oczekujących</h2>
            <p className="mb-4">
              Zapisanie się do newslettera lub na listę oczekujących wymaga podania adresu e-mail
              i jest całkowicie dobrowolne. Zapisanie się oznacza wyrażenie zgody na otrzymywanie
              informacji handlowych drogą elektroniczną w rozumieniu art. 10 ustawy z dnia
              18 lipca 2002 r. o świadczeniu usług drogą elektroniczną oraz art. 172 ustawy
              z dnia 16 lipca 2004 r. — Prawo telekomunikacyjne.
            </p>
            <p>
              Użytkownik może w każdej chwili cofnąć zgodę i zrezygnować z subskrypcji,
              kontaktując się pod adresem{' '}
              <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a>.
              Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego
              przed jej cofnięciem.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">9. Chat AI (Asystent) — informacja o sztucznej inteligencji</h2>
            <div className="bg-[#1A2461]/30 rounded-xl p-5 mb-6 border border-[#2E4AAD]/30">
              <p className="text-white font-semibold mb-2">Informacja wymagana przez Rozporządzenie UE w sprawie sztucznej inteligencji (AI Act), art. 50</p>
              <p className="text-sm">
                Chat AI dostępny w Serwisie jest systemem sztucznej inteligencji. Rozmawiając z chatbotem,
                Użytkownik wchodzi w interakcję z programem komputerowym opartym na modelu
                językowym (LLM), a nie z człowiekiem.
              </p>
            </div>
            <p className="mb-4">
              Chat AI wykorzystuje model GPT-4o-mini dostarczany przez OpenAI, LLC. Odpowiedzi
              są generowane automatycznie na podstawie modelu językowego, który przewiduje
              prawdopodobne kontynuacje tekstu. Oznacza to, że odpowiedzi mogą zawierać
              nieścisłości, niepełne informacje lub błędy faktyczne.
            </p>
            <p className="mb-4">
              <strong className="text-white">Odpowiedzi generowane przez Chat AI mają wyłącznie
              charakter informacyjny i nie stanowią porady prawnej, finansowej, technicznej ani
              żadnej innej profesjonalnej porady.</strong> Użytkownik nie powinien podejmować
              istotnych decyzji biznesowych wyłącznie na podstawie odpowiedzi uzyskanych od chatbota.
            </p>
            <p className="mb-4">
              Wiadomości wpisywane w oknie czatu są przesyłane do API OpenAI wyłącznie w celu
              wygenerowania odpowiedzi. Nie są przechowywane na serwerach Usługodawcy. Użytkownik
              nie powinien podawać w czacie danych osobowych, poufnych ani wrażliwych.
            </p>
            <p>
              Usługodawca nie ponosi odpowiedzialności za treść odpowiedzi generowanych przez
              sztuczną inteligencję, w tym za ewentualne straty lub szkody wynikające z polegania
              na tych odpowiedziach.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">10. Własność intelektualna</h2>
            <p className="mb-4">
              Wszelkie treści zamieszczone w Serwisie — w tym teksty, grafiki, logotypy, zdjęcia,
              układ strony, elementy interaktywne i kod źródłowy — stanowią własność Usługodawcy
              lub podmiotów, z którymi Usługodawca zawarł stosowne umowy licencyjne, i są
              chronione przepisami ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach
              pokrewnych oraz innymi przepisami prawa własności intelektualnej.
            </p>
            <p>
              Korzystanie z treści Serwisu wykraczające poza użytek osobisty wymaga uprzedniej
              pisemnej zgody Usługodawcy. Nazwa &bdquo;Infinity Tech&rdquo;, logo oraz inne
              oznaczenia używane w Serwisie stanowią znaki towarowe Usługodawcy.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">11. Odpowiedzialność Usługodawcy</h2>
            <p className="mb-4">
              Usługodawca dokłada wszelkich starań, aby Serwis działał prawidłowo, nieprzerwanie
              i bezpiecznie. Ze względu na charakter świadczenia usług drogą elektroniczną
              Usługodawca nie gwarantuje jednak nieprzerwanej dostępności Serwisu.
            </p>
            <p className="mb-4">Usługodawca nie ponosi odpowiedzialności za:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>czasową niedostępność Serwisu wynikającą z przyczyn technicznych, takich jak konserwacja, aktualizacje lub awarie;</li>
              <li>treści generowane przez Chat AI (sztuczną inteligencję) — w szczególności za ewentualne nieścisłości, błędy faktyczne lub niekompletność odpowiedzi;</li>
              <li>szkody wynikające z korzystania z Serwisu niezgodnie z Regulaminem lub obowiązującym prawem;</li>
              <li>działania osób trzecich, w tym dostawców usług zewnętrznych;</li>
              <li>przerwy w działaniu Serwisu spowodowane siłą wyższą.</li>
            </ul>
            <p>
              Informacje prezentowane w Serwisie — w tym szacunki z kalkulatora ROI, dane
              statystyczne, opisy usług i przykładowe wyniki — mają charakter poglądowy
              i informacyjny. Nie stanowią oferty w rozumieniu art. 66 Kodeksu cywilnego
              ani przyrzeczenia określonych rezultatów.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">12. Ochrona danych osobowych</h2>
            <p>
              Zasady przetwarzania danych osobowych Użytkowników opisane są szczegółowo
              w{' '}<Link href="/polityka-prywatnosci" className="text-[#7B9BDB] underline hover:text-white">Polityce Prywatności</Link>,
              stanowiącej integralną część niniejszego Regulaminu. Korzystając z Serwisu,
              Użytkownik potwierdza zapoznanie się z Polityką Prywatności.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">13. Reklamacje</h2>
            <p className="mb-4">
              Reklamacje dotyczące funkcjonowania Serwisu lub świadczonych usług można zgłaszać
              na adres e-mail:{' '}
              <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a>.
            </p>
            <p className="mb-4">
              Reklamacja powinna zawierać opis problemu, okoliczności jego wystąpienia
              oraz dane kontaktowe umożliwiające udzielenie odpowiedzi (imię oraz adres e-mail).
            </p>
            <p>
              Usługodawca rozpatrzy reklamację w terminie 14 dni od jej otrzymania i poinformuje
              Użytkownika o wyniku drogą elektroniczną na wskazany adres e-mail. W szczególnie
              złożonych przypadkach termin może zostać wydłużony do 30 dni, o czym Użytkownik
              zostanie poinformowany.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">14. Prawo odstąpienia od umowy</h2>
            <p className="mb-4">
              Użytkownikowi będącemu konsumentem w rozumieniu art. 22<sup>1</sup> Kodeksu cywilnego
              przysługuje prawo odstąpienia od umowy zawartej na odległość w terminie 14 dni
              od dnia zawarcia umowy, bez podawania przyczyny i bez ponoszenia kosztów.
            </p>
            <p className="mb-4">
              Ze względu na charakter usług świadczonych w Serwisie (usługi bezpłatne, realizowane
              natychmiastowo), prawo odstąpienia nie przysługuje w odniesieniu do usług w pełni
              wykonanych przed upływem terminu odstąpienia (np. odpowiedź na formularz kontaktowy,
              wygenerowanie odpowiedzi przez Chat AI), na co Użytkownik wyraża zgodę, korzystając
              z tych usług.
            </p>
            <p>
              W przypadku newslettera Użytkownik może zrezygnować z subskrypcji w dowolnym
              momencie, co jest równoważne z odstąpieniem od umowy o świadczenie tej usługi.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">15. Pozasądowe rozwiązywanie sporów</h2>
            <p className="mb-4">
              Użytkownik będący konsumentem ma możliwość skorzystania z pozasądowych sposobów
              rozpatrywania reklamacji i dochodzenia roszczeń. W szczególności Użytkownik może
              zwrócić się o mediację do właściwego wojewódzkiego inspektoratu Inspekcji Handlowej
              lub skorzystać z pomocy powiatowego (miejskiego) rzecznika konsumentów.
            </p>
            <p>
              Szczegółowe informacje o pozasądowych sposobach rozwiązywania sporów dostępne są
              na stronie Urzędu Ochrony Konkurencji i Konsumentów:{' '}
              <a href="https://www.uokik.gov.pl" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">uokik.gov.pl</a>.
              Użytkownik może również skorzystać z platformy ODR (Online Dispute Resolution)
              Komisji Europejskiej dostępnej pod adresem:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">ec.europa.eu/consumers/odr</a>.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">16. Zmiany Regulaminu</h2>
            <p className="mb-4">
              Usługodawca zastrzega sobie prawo do zmiany niniejszego Regulaminu w przypadku
              zmian w przepisach prawa, wprowadzenia nowych usług lub zmiany warunków technicznych
              świadczenia usług.
            </p>
            <p>
              O istotnych zmianach Usługodawca poinformuje poprzez zamieszczenie zaktualizowanej
              wersji Regulaminu w Serwisie wraz z nową datą aktualizacji. Kontynuowanie korzystania
              z Serwisu po wejściu w życie zmian oznacza akceptację nowego brzmienia Regulaminu.
              Zmiany Regulaminu nie naruszają praw nabytych przez Użytkowników przed datą ich
              wejścia w życie.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">17. Postanowienia końcowe</h2>
            <p className="mb-4">
              Regulamin wchodzi w życie z dniem opublikowania w Serwisie. W sprawach
              nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego,
              w szczególności Kodeksu cywilnego, ustawy z dnia 18 lipca 2002 r. o świadczeniu
              usług drogą elektroniczną, ustawy z dnia 30 maja 2014 r. o prawach konsumenta,
              Rozporządzenia RODO oraz Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2024/1689
              w sprawie sztucznej inteligencji (AI Act).
            </p>
            <p className="mb-4">
              Jeżeli jakiekolwiek postanowienie niniejszego Regulaminu okaże się nieważne
              lub nieskuteczne, nie wpływa to na ważność i skuteczność pozostałych postanowień.
            </p>
            <p>
              Prawem właściwym dla rozstrzygania sporów wynikających z niniejszego Regulaminu
              jest prawo polskie. Sądem właściwym jest sąd powszechny właściwy dla siedziby
              Usługodawcy, z zastrzeżeniem bezwzględnie obowiązujących przepisów dotyczących
              właściwości sądu dla konsumentów.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">18. Kontakt</h2>
            <p className="mb-4">
              W razie pytań dotyczących niniejszego Regulaminu lub świadczonych usług prosimy
              o kontakt:
            </p>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-sm space-y-1">
              <p>E-mail: <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a></p>
              <p>Adres: Zamość, woj. lubelskie, Polska</p>
            </div>
          </section>

        </article>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
