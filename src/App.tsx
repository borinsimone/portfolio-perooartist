import { useEffect, useRef, useState, type FormEvent } from 'react';
import Hero from './components/Hero';
import ArtistBio from './components/ArtistBio';
import SmokeyCursor from './components/lightswind/smokey-cursor';
import emailjs from '@emailjs/browser';
import './App.scss';
import BorderGlow from './components/bits/BorderGlow';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from './animations';
import sentireImg from './assets/sentire.jpeg';
import etereImg from './assets/etere-paint.jpeg';
import confidenceImg from './assets/confidence.jpeg';
import powerBullImg from './assets/power-bull.jpeg';
import soulCallingImg from './assets/soul-calling.jpeg';
import mostrareImg from './assets/mostrare.jpeg';
import percorsoImg from './assets/percorso.jpeg';
import spritoImg from './assets/spirito-libero.jpeg';
import commissioniImg from './assets/commissioni.jpeg';
import pesceImg from './assets/pesce.jpeg';
const chapterOne = [
  {
    title: 'SENTIRE',
    size: 'Dimensioni 50 x 70',
    medium: 'Tecnica mista su tela',
    year: 'Anno 2025',
    image: sentireImg,
  },
  {
    title: 'ETERE',
    size: 'Dimensioni 40 x 50',
    medium: 'Acrilico e texture materiche',
    year: 'Anno 2026',
    image: etereImg,
  },
  {
    title: 'MOSTRARE',
    size: 'Dimensioni 40 x 40',
    medium: 'Tecnica mista su tavola',
    year: 'Anno 2025',
    image: mostrareImg,
  },
];

const chapterTwo = [
  {
    title: 'CONFIDENCE',
    size: 'Dimensioni 58 x 77,5',
    medium: 'Acrilico e linee su tela',
    year: 'Anno 2025',
    image: confidenceImg,
  },
  {
    title: 'POWER BULL',
    size: 'Dimensioni 50 x 50',
    medium: 'Acrilico figurativo su tela',
    year: 'Anno 2025',
    image: powerBullImg,
  },
  {
    title: 'SOUL’S CALLING',
    size: 'Dimensioni 40 x 50',
    medium: 'Bianco e nero con dettagli oro',
    year: 'Anno 2026',
    image: soulCallingImg,
  },
];

function WorkGrid({
  id,
  title,
  subtitle,
  items,
  startIndex,
  onOpen,
}: {
  id?: string;
  title: string;
  subtitle: string;
  items: typeof chapterOne;
  startIndex: number;
  onOpen: (index: number) => void;
}) {
  return (
    <motion.section
      id={id}
      className='chapter'
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <motion.div
        className='chapter__head'
        variants={staggerContainer}
      >
        <motion.span variants={fadeUp}>{title}</motion.span>
        <motion.h3 variants={fadeUp}>{subtitle}</motion.h3>
      </motion.div>
      <motion.div
        className='works-grid'
        variants={staggerContainer}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
          >
            <BorderGlow
              borderRadius={0}
              backgroundColor='#000000'
            >
              <button
                className='work-card__trigger'
                type='button'
                onClick={() => onOpen(startIndex + index)}
                aria-label={`Apri ${item.title} a schermo intero`}
              >
                <article className='work-card'>
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                  <h4>{item.title}</h4>
                  <p>{item.size}</p>
                  <p>{item.medium}</p>
                  <p>{item.year}</p>
                </article>
              </button>
            </BorderGlow>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default function App() {
  const allWorks = [...chapterOne, ...chapterTwo];
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const formStartedAtRef = useRef(Date.now());
  const privacyPolicyUrl = `${import.meta.env.BASE_URL}privacy-policy.html`;

  const activeWork =
    activeWorkIndex !== null ? allWorks[activeWorkIndex] : null;

  const manifestoImageVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7 },
    },
  };

  const closeOverlay = () => setActiveWorkIndex(null);

  const showPreviousWork = () => {
    setActiveWorkIndex((prev) => {
      if (prev === null) {
        return prev;
      }

      return (prev - 1 + allWorks.length) % allWorks.length;
    });
  };

  const showNextWork = () => {
    setActiveWorkIndex((prev) => {
      if (prev === null) {
        return prev;
      }

      return (prev + 1) % allWorks.length;
    });
  };

  useEffect(() => {
    if (activeWorkIndex === null) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }

      if (event.key === 'ArrowLeft') {
        showPreviousWork();
      }

      if (event.key === 'ArrowRight') {
        showNextWork();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [activeWorkIndex, allWorks.length]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const normalizeEnvValue = (value: string | undefined) =>
      value?.trim().replace(/^['\"]|['\"]$/g, '');

    const serviceId = normalizeEnvValue(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
    );
    const templateId = normalizeEnvValue(
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    );
    const publicKey = normalizeEnvValue(
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error');
      setSubmitMessage(
        'Configurazione EmailJS mancante. Aggiungi le variabili VITE_EMAILJS_* nel file .env.',
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = formData.get('website')?.toString().trim() ?? '';
    const isPrivacyAccepted = formData.get('privacyAccepted') === 'on';
    const filledTooFast = Date.now() - formStartedAtRef.current < 3000;

    if (honeypot) {
      setSubmitStatus('success');
      setSubmitMessage('Messaggio inviato con successo. Ti risponderò presto.');
      return;
    }

    if (filledTooFast) {
      setSubmitStatus('error');
      setSubmitMessage(
        'Invio bloccato per protezione antispam. Attendi qualche secondo e riprova.',
      );
      return;
    }

    if (!isPrivacyAccepted) {
      setSubmitStatus('error');
      setSubmitMessage('Per continuare devi accettare la Privacy Policy.');
      return;
    }

    const name = formData.get('name')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const subject = formData.get('subject')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';

    setIsSending(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          Nome: name,
          from_name: name,
          email,
          Email: email,
          reply_to: email,
          subject,
          Oggetto: subject,
          message,
          Messaggio: message,
          privacy_accepted: 'true',
        },
        { publicKey },
      );

      setSubmitStatus('success');
      setSubmitMessage('Messaggio inviato con successo. Ti risponderò presto.');
      form.reset();
      formStartedAtRef.current = Date.now();
    } catch (error) {
      const details =
        error && typeof error === 'object'
          ? [
              'status' in error && error.status
                ? String(error.status)
                : undefined,
              'text' in error && error.text ? String(error.text) : undefined,
            ]
              .filter(Boolean)
              .join(' · ')
          : '';

      console.error('EmailJS send failed', {
        error,
        serviceId,
        templateId,
      });

      setSubmitStatus('error');
      setSubmitMessage(
        details
          ? `Invio non riuscito (${details}). Verifica template, service e domini autorizzati su EmailJS.`
          : 'Invio non riuscito. Riprova tra qualche minuto oppure scrivimi via email diretta.',
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* <MouseTrail /> */}
      <SmokeyCursor
        simulationResolution={96}
        dyeResolution={720}
        densityDissipation={4.2}
        velocityDissipation={3.1}
        splatRadius={0.08}
        splatForce={2800}
        colorUpdateSpeed={3.2}
        intensity={6}
        autoColors={false}
        backgroundColor={{ r: 0, g: 0, b: 0 }}
        className='smokey-overlay'
      />
      <div className='app-content'>
        <Hero />
        <ArtistBio />

        <motion.section
          className='research'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
        >
          <motion.div
            className='research__left'
            variants={staggerContainer}
          >
            <motion.span
              className='label'
              variants={fadeUp}
            >
              Genesi creativa e collaborazioni
            </motion.span>
            <motion.h2 variants={fadeUp}>Ricerca e sviluppo</motion.h2>
            <motion.p variants={fadeUp}>
              Percorsi autodidatti, materiali misti e indagine emozionale
              costruiscono una poetica personale in continua evoluzione.
            </motion.p>
          </motion.div>
          <motion.div
            className='research__right'
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp}>Esposizioni e pubblicazioni</motion.h2>
            <motion.ul variants={staggerContainer}>
              <motion.li variants={fadeUp}>
                2025 - Mostra collettiva "Freedom Art", ML Show Lab, Roma
              </motion.li>
              <motion.li variants={fadeUp}>
                2026 - Catalogo d'arte "Espressioni d'arte Tomo II" edizioni "La
                valle del tempo" con testo critico di Elisabetta La Rosa
              </motion.li>
              <motion.li variants={fadeUp}>
                2026 - Mostra collettiva catalogata "VisionArte", ONART Gallery,
                Firenze
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.section>

        <WorkGrid
          id='capitolo-1'
          title='CAPITOLO I'
          subtitle='L’opera astratta è introspezione pura'
          items={chapterOne}
          startIndex={0}
          onOpen={setActiveWorkIndex}
        />

        <WorkGrid
          title='CAPITOLO II'
          subtitle='Riflessi collettivi: figure, uomo e sociale'
          items={chapterTwo}
          startIndex={chapterOne.length}
          onOpen={setActiveWorkIndex}
        />

        <motion.section
          className='manifesto'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
        >
          <motion.p variants={fadeUp}>
            Il mio percorso continua ogni giorno nel dialogo tra il colore e
            l’inconscio, dove la tecnica si evolve in pari passo con la
            consapevolezza interiore.
          </motion.p>
          <motion.div variants={manifestoImageVariants}>
            <BorderGlow
              borderRadius={0}
              backgroundColor='#000'
            >
              <img
                src={percorsoImg}
                alt='Opera astratta rosso e verde'
              />
            </BorderGlow>
          </motion.div>
        </motion.section>

        <motion.section
          className='chapter3'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
        >
          <BorderGlow
            borderRadius={0}
            backgroundColor='#000000'
          >
            <motion.img
              src={spritoImg}
              alt='Scultura e bottiglie artistiche'
              variants={fadeIn}
            />
          </BorderGlow>
          <motion.div variants={staggerContainer}>
            <motion.span
              className='label'
              variants={fadeUp}
            >
              Capitolo III
            </motion.span>
            <motion.h3 variants={fadeUp}>Spiriti liberi</motion.h3>
            <motion.span
              className='label'
              variants={fadeUp}
            >
              L'ironia e il recupero del sociale
            </motion.span>
            <motion.p variants={fadeUp}>
              In questa serie, la mia ricerca esce dai confini della tela per
              abbracciare la tridimensionalità del vetro di recupero. La
              bottiglia vuota diventa il simbolo di una società che consuma, ma
              che io scelgo di 'riempire' nuovamente attraverso l'introspezione.
              Mentre la grafica astratta rappresenta la libertà e l'etereo, le
              frasi ironiche diventano il ponte con il sociale: un modo per
              sorridere delle tappe e dei paradossi che ci accomunano tutti.
            </motion.p>
          </motion.div>
        </motion.section>

        <motion.section
          className='commissioni'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
        >
          <motion.div
            className='commissioni__visual'
            variants={fadeIn}
          >
            <motion.img
              className='commissioni__mainImage'
              src={commissioniImg}
              alt='Dettaglio opera astratta per commissioni'
              variants={fadeIn}
            />
            <motion.img
              className='commissioni__badgeImage'
              src={pesceImg}
              alt='Dettaglio opera in sovrapposizione'
              variants={fadeUp}
            />
          </motion.div>
          <motion.div
            className='commissioni__content'
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp}>Commissioni e tempistiche</motion.h3>
            <motion.p variants={fadeUp}>
              Prezzi e tempistiche variano in funzione della complessità
              dell’opera commissionata. Non esitare a contattarmi per qualsiasi
              informazione.
            </motion.p>
          </motion.div>
        </motion.section>

        <motion.footer
          id='dove-trovarmi'
          className='contact'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
        >
          <motion.div
            className='contact__intro'
            variants={staggerContainer}
          >
            <motion.span
              className='label'
              variants={fadeUp}
            >
              Contatti
            </motion.span>
            <motion.h2 variants={fadeUp}>Parliamo del tuo progetto</motion.h2>
            <motion.p variants={fadeUp}>
              Raccontami idea, formato e tempistiche: preparo una proposta
              personalizzata e rispondo in breve tempo.
            </motion.p>

            <motion.div
              className='contact__links'
              variants={staggerContainer}
            >
              <a href='mailto:chiara.peroo@gmail.com'>chiara.peroo@gmail.com</a>
              <a
                href='https://www.instagram.com/_perooartist_/'
                target='_blank'
                rel='noreferrer'
              >
                Instagram ↗
              </a>
              <a
                href='https://www.tiktok.com/@chiaraperoo?lang=en'
                target='_blank'
                rel='noreferrer'
              >
                TikTok ↗
              </a>
            </motion.div>
          </motion.div>
          <BorderGlow borderRadius={0}>
            <motion.form
              className='contact__form'
              onSubmit={handleContactSubmit}
              variants={fadeUp}
            >
              <label>
                Nome
                <input
                  type='text'
                  name='name'
                  placeholder='Il tuo nome'
                  required
                />
              </label>

              <label>
                Email
                <input
                  type='email'
                  name='email'
                  placeholder='tuamail@esempio.com'
                  required
                />
              </label>

              <label>
                Oggetto
                <input
                  type='text'
                  name='subject'
                  placeholder='Richiesta commissione'
                  required
                />
              </label>

              <label>
                Messaggio
                <textarea
                  name='message'
                  rows={5}
                  placeholder='Descrivi brevemente il progetto...'
                  required
                />
              </label>

              <div
                className='contact__hp'
                aria-hidden='true'
              >
                <label htmlFor='website'>Lascia vuoto questo campo</label>
                <input
                  id='website'
                  type='text'
                  name='website'
                  tabIndex={-1}
                  autoComplete='off'
                />
              </div>

              <label className='contact__consent'>
                <input
                  type='checkbox'
                  name='privacyAccepted'
                  required
                />
                <span>
                  Ho letto e accetto la{' '}
                  <a
                    href={privacyPolicyUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button
                type='submit'
                disabled={isSending}
              >
                {isSending ? 'Invio in corso...' : 'Invia email'}
              </button>

              {submitStatus !== 'idle' && (
                <p
                  className={`contact__status contact__status--${submitStatus}`}
                >
                  {submitMessage}
                </p>
              )}
            </motion.form>
          </BorderGlow>
        </motion.footer>
      </div>

      {activeWork && (
        <div
          className='gallery-overlay'
          role='dialog'
          aria-modal='true'
          aria-label={`Opera ${activeWork.title}`}
          onClick={closeOverlay}
        >
          <div
            className='gallery-overlay__panel'
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className='gallery-overlay__close'
              type='button'
              onClick={closeOverlay}
              aria-label='Chiudi anteprima'
            >
              ✕
            </button>

            <img
              className='gallery-overlay__image'
              src={activeWork.image}
              alt={activeWork.title}
            />

            <div className='gallery-overlay__meta'>
              <h3>{activeWork.title}</h3>
              <p>{activeWork.size}</p>
              <p>{activeWork.medium}</p>
              <p>{activeWork.year}</p>
            </div>

            <div className='gallery-overlay__controls'>
              <button
                type='button'
                onClick={showPreviousWork}
              >
                ← Precedente
              </button>
              <span>
                {(activeWorkIndex ?? 0) + 1} / {allWorks.length}
              </span>
              <button
                type='button'
                onClick={showNextWork}
              >
                Successiva →
              </button>
            </div>

            <div className='gallery-overlay__actions'>
              <button
                type='button'
                className='gallery-overlay__visit'
                aria-label='Pulsante demo visita la galleria'
              >
                Visita la galleria
              </button>
              <p>Comandi: Esc chiude · ←/→ naviga</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
