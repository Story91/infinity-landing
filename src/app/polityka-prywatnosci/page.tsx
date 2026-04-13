import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Infinity Tech',
  description: 'Polityka prywatności serwisu Infinity Tech — informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Polityka Prywatności</h1>
        <p className="text-[#7B9BDB] mb-12">Ostatnia aktualizacja: 13 kwietnia 2026 r.</p>

        <article className="space-y-12 text-white/85 leading-relaxed text-[15px] md:text-base">

          {/* 1 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">1. Administrator danych osobowych</h2>
            <p className="mb-4">
              Administratorem Twoich danych osobowych jest <strong className="text-white">Infinity Tech</strong> z siedzibą
              w Zamościu, woj. lubelskie, Polska (dalej: &bdquo;Administrator&rdquo;, &bdquo;my&rdquo;, &bdquo;nas&rdquo;).
            </p>
            <div className="bg-white/5 rounded-xl p-5 mb-4 border border-white/10 text-sm space-y-1">
              <p>Adres siedziby: Zamość, woj. lubelskie, Polska <span className="text-[#7B9BDB]">[dokładny adres do uzupełnienia]</span></p>
              <p>NIP: <span className="text-[#7B9BDB]">[do uzupełnienia]</span></p>
              <p>REGON: <span className="text-[#7B9BDB]">[do uzupełnienia]</span></p>
              <p>E-mail: <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a></p>
            </div>
            <p>
              W sprawach dotyczących ochrony danych osobowych możesz kontaktować się z nami
              pisząc na adres e-mail wskazany powyżej. Administrator nie wyznaczył Inspektora Ochrony
              Danych (IOD), ponieważ przetwarzanie danych nie wymaga tego zgodnie z art. 37 RODO.
              Wszelkie zapytania dotyczące danych osobowych realizujemy bezpośrednio.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">2. Jakie dane zbieramy i w jakim celu</h2>
            <p className="mb-6">
              Zbieramy wyłącznie dane, które sam nam przekazujesz za pośrednictwem formularzy lub narzędzi
              dostępnych w Serwisie. Nie gromadzimy danych w sposób automatyczny poza standardowymi
              informacjami technicznymi (logi serwera). Poniżej opisujemy każdy przypadek szczegółowo.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">2.1. Formularz kontaktowy</h3>
            <p className="mb-2">
              Gdy wysyłasz formularz kontaktowy, przekazujesz nam swoje imię, adres e-mail,
              numer telefonu (opcjonalnie) oraz treść wiadomości. Wykorzystujemy te dane wyłącznie
              w celu odpowiedzi na Twoje zapytanie i ewentualnego podjęcia współpracy.
            </p>
            <p className="mb-6">
              Podanie imienia, adresu e-mail i treści wiadomości jest niezbędne do obsługi zapytania —
              bez tych danych nie będziemy w stanie się z Tobą skontaktować. Podanie numeru telefonu
              jest dobrowolne i służy wyłącznie ułatwieniu kontaktu.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">2.2. Newsletter i lista oczekujących</h3>
            <p className="mb-6">
              Zapisując się do newslettera lub na listę oczekujących (np. powiadomienie o premierze
              aplikacji desktopowej), podajesz swój adres e-mail. Wykorzystujemy go wyłącznie w celu
              wysyłania Ci informacji o nowościach, usługach i produktach Infinity Tech. Podanie
              adresu e-mail jest dobrowolne, lecz niezbędne do realizacji usługi newslettera.
              Możesz zrezygnować z subskrypcji w każdej chwili, kontaktując się z nami na adres{' '}
              <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a>.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">2.3. Chat AI (Asystent)</h3>
            <p className="mb-2">
              Nasz Serwis udostępnia chatbota opartego na sztucznej inteligencji. Treści, które wpisujesz
              w oknie czatu, są przesyłane do zewnętrznego dostawcy AI (OpenAI) w celu wygenerowania
              odpowiedzi. Wiadomości z czatu nie są zapisywane na naszych serwerach — istnieją wyłącznie
              w pamięci Twojej przeglądarki na czas trwania sesji.
            </p>
            <p className="mb-6">
              Korzystanie z chatbota jest całkowicie dobrowolne. Zalecamy, aby nie podawać w czacie
              danych osobowych, poufnych ani wrażliwych.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">2.4. Dane techniczne (logi serwera)</h3>
            <p>
              Serwer, na którym działa Serwis, automatycznie rejestruje standardowe informacje
              techniczne, takie jak adres IP, typ przeglądarki, system operacyjny oraz data
              i godzina odwiedzin. Dane te są wykorzystywane wyłącznie w celach technicznych
              (zapewnienie bezpieczeństwa i prawidłowego działania Serwisu) i nie są łączone
              z danymi osobowymi.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">3. Podstawy prawne przetwarzania</h2>
            <p className="mb-6">
              Przetwarzamy Twoje dane osobowe na podstawie przepisów Rozporządzenia Parlamentu Europejskiego
              i Rady (UE) 2016/679 (RODO). Poniższa tabela przedstawia cele przetwarzania i odpowiadające
              im podstawy prawne.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left p-3 border-b border-white/10 text-white font-semibold">Cel przetwarzania</th>
                    <th className="text-left p-3 border-b border-white/10 text-white font-semibold">Podstawa prawna</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3">Odpowiedź na zapytanie z formularza kontaktowego</td>
                    <td className="p-3">Art. 6 ust. 1 lit. b RODO (podjęcie działań przed zawarciem umowy) lub lit. f (prawnie uzasadniony interes — obsługa zapytań)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Wysyłka newslettera i powiadomień o produktach</td>
                    <td className="p-3">Art. 6 ust. 1 lit. a RODO (Twoja zgoda)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Obsługa czatu AI (generowanie odpowiedzi)</td>
                    <td className="p-3">Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — obsługa klienta)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Zapewnienie bezpieczeństwa i prawidłowego działania Serwisu (logi)</td>
                    <td className="p-3">Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes — bezpieczeństwo)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">4. Odbiorcy danych</h2>
            <p className="mb-6">
              Twoje dane osobowe mogą być udostępniane podmiotom trzecim wyłącznie w zakresie niezbędnym
              do realizacji celów opisanych w niniejszej Polityce. Poniżej wskazujemy podmioty, którym
              powierzamy przetwarzanie danych.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">Resend, Inc. (usługa e-mail)</h3>
            <p className="mb-6">
              Dane z formularza kontaktowego (imię, e-mail, telefon, treść wiadomości) oraz adres
              e-mail z newslettera są przekazywane do Resend w celu doręczenia wiadomości e-mail.
              Resend przetwarza dane na podstawie umowy powierzenia przetwarzania danych i standardowych
              klauzul umownych (SCC). Siedziba: Stany Zjednoczone.{' '}
              <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">Polityka prywatności Resend</a>.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">OpenAI, LLC (sztuczna inteligencja)</h3>
            <p className="mb-6">
              Treść wiadomości z chatbota jest przesyłana do API OpenAI w celu wygenerowania odpowiedzi.
              Dane przesyłane przez API nie są wykorzystywane przez OpenAI do trenowania modeli
              sztucznej inteligencji. Siedziba: Stany Zjednoczone.{' '}
              <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">Polityka prywatności OpenAI</a>.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">Google LLC (mapy)</h3>
            <p className="mb-6">
              Serwis korzysta z osadzenia Google Maps w sekcji kontaktowej. Google może
              rejestrować dane techniczne (adres IP, informacje o przeglądarce) oraz zapisywać
              pliki cookies w ramach działania tej usługi. Czcionki używane w Serwisie są
              hostowane lokalnie i nie wymagają połączenia z serwerami Google.
              Siedziba: Stany Zjednoczone.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">Polityka prywatności Google</a>.
            </p>

            <h3 className="text-white text-lg font-semibold mb-3">Vercel, Inc. (hosting)</h3>
            <p>
              Serwis jest hostowany na platformie Vercel. W ramach świadczenia usługi hostingowej
              Vercel może przetwarzać dane techniczne, takie jak adres IP, informacje o przeglądarce
              oraz logi dostępu. Siedziba: Stany Zjednoczone.{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">Polityka prywatności Vercel</a>.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">5. Transfer danych poza Europejski Obszar Gospodarczy</h2>
            <p>
              W związku z korzystaniem z usług podmiotów mających siedzibę w Stanach Zjednoczonych
              (Resend, OpenAI, Google, Vercel), Twoje dane mogą być przekazywane poza Europejski Obszar
              Gospodarczy. Każdy transfer odbywa się na podstawie odpowiednich zabezpieczeń prawnych:
              standardowych klauzul umownych (SCC) zatwierdzonych przez Komisję Europejską zgodnie
              z art. 46 ust. 2 RODO lub decyzji Komisji Europejskiej stwierdzającej odpowiedni
              stopień ochrony (EU-US Data Privacy Framework), jeśli dany podmiot jest objęty
              takim programem.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">6. Okres przechowywania danych</h2>
            <p className="mb-4">
              Przechowujemy Twoje dane osobowe wyłącznie przez czas niezbędny do realizacji celów,
              dla których zostały zebrane.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left p-3 border-b border-white/10 text-white font-semibold">Rodzaj danych</th>
                    <th className="text-left p-3 border-b border-white/10 text-white font-semibold">Okres przechowywania</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3">Formularz kontaktowy</td>
                    <td className="p-3">Do 2 lat od ostatniego kontaktu, chyba że dalsze przechowywanie jest wymagane prawem</td>
                  </tr>
                  <tr>
                    <td className="p-3">Newsletter / lista oczekujących</td>
                    <td className="p-3">Do momentu cofnięcia zgody (wypisania się)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Chat AI</td>
                    <td className="p-3">Brak przechowywania — dane istnieją wyłącznie w trakcie sesji przeglądarki</td>
                  </tr>
                  <tr>
                    <td className="p-3">Logi serwera</td>
                    <td className="p-3">Do 30 dni</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">7. Pliki cookies i technologie śledzenia</h2>
            <p className="mb-4">
              Nasz Serwis <strong className="text-white">nie stosuje własnych plików cookies</strong> ani
              narzędzi analitycznych (takich jak Google Analytics, Hotjar czy inne). Nie używamy pikseli
              śledzących, localStorage ani sessionStorage do celów profilowania lub śledzenia
              zachowań użytkowników.
            </p>
            <p>
              Usługa Google Maps osadzona w Serwisie może ustawiać własne pliki cookies.
              Szczegółowe informacje znajdziesz w polityce prywatności Google, wskazanej
              w sekcji 4.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">8. Sztuczna inteligencja i przetwarzanie danych</h2>
            <p className="mb-4">
              Infinity Tech jest firmą oferującą rozwiązania oparte na sztucznej inteligencji. Pragniemy
              jasno poinformować, w jaki sposób AI jest wykorzystywana w kontekście Twoich danych.
            </p>
            <p className="mb-4">
              <strong className="text-white">Chat AI w Serwisie</strong> jest narzędziem generującym
              odpowiedzi na podstawie modelu językowego (GPT-4o-mini, dostarczanego przez OpenAI).
              Wiadomości wpisywane w oknie czatu są przesyłane do API OpenAI wyłącznie w celu
              wygenerowania odpowiedzi. Zgodnie z warunkami korzystania z API OpenAI, dane przesyłane
              przez interfejs API nie są wykorzystywane do trenowania ani ulepszania modeli OpenAI.
            </p>
            <p className="mb-4">
              <strong className="text-white">Infinity Tech nie wykorzystuje Twoich danych osobowych
              do trenowania modeli AI.</strong> Dane z formularzy kontaktowych, newslettera i czatu
              nie są używane w celach uczenia maszynowego, profilowania ani tworzenia zautomatyzowanych
              profili użytkowników.
            </p>
            <p>
              Serwis korzysta również z AI do tłumaczenia i podsumowywania artykułów informacyjnych
              w sekcji &bdquo;Świat AI&rdquo;. Proces ten dotyczy wyłącznie treści publicznych
              artykułów i nie obejmuje żadnych danych użytkowników.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">9. Profilowanie i zautomatyzowane podejmowanie decyzji</h2>
            <p>
              Nie stosujemy profilowania ani zautomatyzowanego podejmowania decyzji w rozumieniu
              art. 22 RODO. Żadne decyzje dotyczące Twojej osoby nie są podejmowane w sposób
              wyłącznie zautomatyzowany, który wywoływałby wobec Ciebie skutki prawne lub
              w podobny sposób istotnie na Ciebie wpływał.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">10. Twoje prawa</h2>
            <p className="mb-6">
              Na podstawie RODO przysługuje Ci szereg praw dotyczących Twoich danych osobowych.
              Możesz z nich skorzystać w dowolnym momencie, kontaktując się z nami na adres{' '}
              <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a>.
              Odpowiemy na Twoje żądanie bez zbędnej zwłoki, nie później niż w terminie miesiąca.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo dostępu (art. 15 RODO)</p>
                <p className="text-sm">Masz prawo uzyskać potwierdzenie, czy przetwarzamy Twoje dane osobowe, oraz uzyskać dostęp do tych danych i informacji o sposobie ich przetwarzania.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo do sprostowania (art. 16 RODO)</p>
                <p className="text-sm">Masz prawo żądać niezwłocznego sprostowania nieprawidłowych danych osobowych lub uzupełnienia danych niekompletnych.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo do usunięcia (art. 17 RODO)</p>
                <p className="text-sm">Masz prawo żądać usunięcia swoich danych osobowych, gdy nie istnieje podstawa prawna do ich dalszego przetwarzania (tzw. &bdquo;prawo do bycia zapomnianym&rdquo;).</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo do ograniczenia przetwarzania (art. 18 RODO)</p>
                <p className="text-sm">Masz prawo żądać ograniczenia przetwarzania danych w określonych przypadkach, np. gdy kwestionujesz prawidłowość danych.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo do przenoszenia danych (art. 20 RODO)</p>
                <p className="text-sm">Masz prawo otrzymać swoje dane osobowe w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego oraz przesłać je innemu administratorowi.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo do sprzeciwu (art. 21 RODO)</p>
                <p className="text-sm">Masz prawo w dowolnym momencie wnieść sprzeciw wobec przetwarzania danych opartego na prawnie uzasadnionym interesie Administratora (art. 6 ust. 1 lit. f).</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">Prawo do cofnięcia zgody (art. 7 ust. 3 RODO)</p>
                <p className="text-sm">Jeśli przetwarzanie odbywa się na podstawie zgody, możesz ją cofnąć w każdym momencie. Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.</p>
              </div>
            </div>

            <div className="mt-6 bg-[#1A2461]/30 rounded-xl p-5 border border-[#2E4AAD]/30">
              <p className="text-white font-semibold mb-2">Prawo do wniesienia skargi</p>
              <p className="text-sm">
                Jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO,
                masz prawo wniesienia skargi do organu nadzorczego — <strong className="text-white">Prezesa
                Urzędu Ochrony Danych Osobowych</strong> (ul. Stawki 2, 00-193 Warszawa,{' '}
                <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-[#7B9BDB] underline hover:text-white">uodo.gov.pl</a>).
              </p>
            </div>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">11. Bezpieczeństwo danych</h2>
            <p>
              Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych
              osobowych przed nieuprawnionym dostępem, utratą, zniszczeniem lub ujawnieniem.
              Komunikacja z Serwisem jest szyfrowana protokołem SSL/TLS. Dane z formularzy
              nie są przechowywane w bazie danych Serwisu — są przetwarzane wyłącznie w celu
              wysłania wiadomości e-mail. Wiadomości z chatbota nie są zapisywane na naszym serwerze.
              Dostęp do systemów wewnętrznych jest ograniczony do upoważnionych członków zespołu.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">12. Dane dzieci</h2>
            <p>
              Serwis nie jest kierowany do osób poniżej 16. roku życia. Nie zbieramy świadomie
              danych osobowych od dzieci. Jeśli jesteś rodzicem lub opiekunem prawnym i uważasz,
              że Twoje dziecko przekazało nam swoje dane osobowe, skontaktuj się z nami na
              adres <a href="mailto:contact@infinityteam.io" className="text-[#7B9BDB] underline hover:text-white">contact@infinityteam.io</a>,
              a niezwłocznie podejmiemy kroki w celu ich usunięcia.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">13. Zmiany polityki prywatności</h2>
            <p>
              Zastrzegamy sobie prawo do aktualizacji niniejszej Polityki Prywatności w przypadku
              zmian w przepisach prawa, wprowadzenia nowych usług lub zmiany sposobu przetwarzania
              danych. O istotnych zmianach poinformujemy poprzez zamieszczenie zaktualizowanej wersji
              na tej stronie wraz z nową datą aktualizacji. Zalecamy regularne zapoznawanie się
              z treścią Polityki Prywatności.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">14. Kontakt</h2>
            <p className="mb-4">
              Jeśli masz pytania dotyczące niniejszej Polityki Prywatności, sposobu przetwarzania
              Twoich danych osobowych lub chcesz skorzystać z przysługujących Ci praw, skontaktuj
              się z nami:
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
