import { useState, type FormEvent } from 'react';
import Hero from './components/Hero';
import ArtistBio from './components/ArtistBio';
import SmokeyCursor from './components/lightswind/smokey-cursor';
import emailjs from '@emailjs/browser';

import './App.scss';
import BorderGlow from './components/bits/BorderGlow';
import { motion } from 'framer-motion';
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from './animations';
const chapterOne = [
  {
    title: 'SENTIRE',
    size: 'Dimensioni 30 x 25',
    medium: 'Tecnica mista su tela',
    year: 'Anno 2025',
    image:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'ETERE',
    size: 'Dimensioni 40 x 30',
    medium: 'Acrilico e texture materiche',
    year: 'Anno 2026',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'MOSTRARE',
    size: 'Dimensioni 40 x 40',
    medium: 'Tecnica mista su tavola',
    year: 'Anno 2025',
    image:
      'https://images.unsplash.com/photo-1579965342575-16428a7c8881?auto=format&fit=crop&w=900&q=80',
  },
];

const chapterTwo = [
  {
    title: 'CONFIDENCE',
    size: 'Dimensioni 56 x 72',
    medium: 'Acrilico e linee su tela',
    year: 'Anno 2025',
    image:
      'https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'POWER BULL',
    size: 'Dimensioni 45 x 50',
    medium: 'Acrilico figurativo su tela',
    year: 'Anno 2025',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'SOUL’S CALLING',
    size: 'Dimensioni 45 x 60',
    medium: 'Bianco e nero con dettagli oro',
    year: 'Anno 2026',
    image:
      'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=900&q=80',
  },
];

function WorkGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: typeof chapterOne;
}) {
  return (
    <motion.section
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
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
          >
            <BorderGlow
              borderRadius={0}
              backgroundColor='#000000'
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
            </BorderGlow>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default function App() {
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error');
      setSubmitMessage(
        'Configurazione EmailJS mancante. Aggiungi le variabili VITE_EMAILJS_* nel file .env.',
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

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
          from_name: name,
          email,
          reply_to: email,
          subject,
          message,
        },
        { publicKey },
      );

      setSubmitStatus('success');
      setSubmitMessage('Messaggio inviato con successo. Ti risponderò presto.');
      form.reset();
    } catch {
      setSubmitStatus('error');
      setSubmitMessage(
        'Invio non riuscito. Riprova tra qualche minuto oppure scrivimi via email diretta.',
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
                2025 · Visioni Urbane, Firenze
              </motion.li>
              <motion.li variants={fadeUp}>
                2026 · Mostra collettiva “Lampi”, La Spezia
              </motion.li>
              <motion.li variants={fadeUp}>
                2026 · Catalogo ON ART Gallery
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.section>

        <WorkGrid
          title='CAPITOLO I'
          subtitle='L’opera astratta è introspezione pura'
          items={chapterOne}
        />

        <WorkGrid
          title='CAPITOLO II'
          subtitle='Riflessi collettivi: figure, uomo e sociale'
          items={chapterTwo}
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
          <motion.img
            src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80'
            alt='Opera astratta rosso e verde'
            variants={fadeIn}
          />
        </motion.section>

        <motion.section
          className='chapter3'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={viewportOnce}
        >
          <motion.img
            src='https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80'
            alt='Scultura e bottiglie artistiche'
            variants={fadeIn}
          />
          <motion.div variants={staggerContainer}>
            <motion.span
              className='label'
              variants={fadeUp}
            >
              Capitolo III
            </motion.span>
            <motion.h3 variants={fadeUp}>Spiriti liberi</motion.h3>
            <motion.p variants={fadeUp}>
              Ironia e recupero del sociale: il ready-made incontra
              l’immaginario urbano in oggetti che raccontano identità, limiti e
              possibilità.
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
              src='https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80'
              alt='Dettaglio opera astratta per commissioni'
              variants={fadeIn}
            />
            <motion.img
              className='commissioni__badgeImage'
              src='https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=600&q=80'
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
                href='https://www.tiktok.com'
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
    </>
  );
}
