import Hero from './components/Hero';
import ArtistBio from './components/ArtistBio';
import MouseTrail from './components/MouseTrail';
import './App.scss';

const chapterOne = [
  {
    title: 'OS-CURE',
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
    title: 'VIA VIVACE',
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
      'https://images.unsplash.com/photo-1577083552431-6e5fd75cb3c8?auto=format&fit=crop&w=900&q=80',
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
    <section className='chapter'>
      <div className='chapter__head'>
        <span>{title}</span>
        <h3>{subtitle}</h3>
      </div>
      <div className='works-grid'>
        {items.map((item) => (
          <article
            key={item.title}
            className='work-card'
          >
            <img
              src={item.image}
              alt={item.title}
            />
            <h4>{item.title}</h4>
            <p>{item.size}</p>
            <p>{item.medium}</p>
            <p>{item.year}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <MouseTrail />
      <Hero />
      <ArtistBio />

      <section className='research'>
        <div className='research__left'>
          <span className='label'>Genesi creativa e collaborazioni</span>
          <h2>Ricerca e sviluppo</h2>
          <p>
            Percorsi autodidatti, materiali misti e indagine emozionale
            costruiscono una poetica personale in continua evoluzione.
          </p>
        </div>
        <div className='research__right'>
          <h2>Esposizioni e pubblicazioni</h2>
          <ul>
            <li>2025 · Visioni Urbane, Firenze</li>
            <li>2026 · Mostra collettiva “Lampi”, La Spezia</li>
            <li>2026 · Catalogo ON ART Gallery</li>
          </ul>
        </div>
      </section>

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

      <section className='manifesto'>
        <p>
          Il mio percorso continua ogni giorno nel dialogo tra il colore e
          l’inconscio, dove la tecnica si evolve in pari passo con la
          consapevolezza interiore.
        </p>
        <img
          src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80'
          alt='Opera astratta rosso e verde'
        />
      </section>

      <section className='chapter3'>
        <img
          src='https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80'
          alt='Scultura e bottiglie artistiche'
        />
        <div>
          <span className='label'>Capitolo III</span>
          <h3>Spiriti liberi</h3>
          <p>
            Ironia e recupero del sociale: il ready-made incontra l’immaginario
            urbano in oggetti che raccontano identità, limiti e possibilità.
          </p>
        </div>
      </section>

      <section className='commissioni'>
        <img
          src='https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80'
          alt='Dettaglio commissione'
        />
        <div>
          <h3>Commissioni e tempistiche</h3>
          <p>
            Progetti personalizzati in base alla complessità dell’opera.
            Contattami per una proposta dedicata.
          </p>
        </div>
      </section>

      <footer
        id='dove-trovarmi'
        className='contact'
      >
        <h2>Dove trovarmi</h2>
        <ul>
          <li>
            <span>Instagram</span>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
            >
              @perooartist
            </a>
          </li>
          <li>
            <span>TikTok</span>
            <a
              href='https://www.tiktok.com'
              target='_blank'
              rel='noreferrer'
            >
              @peroò_artist
            </a>
          </li>
          <li>
            <span>Email</span>
            <a href='mailto:chiara.peroo@gmail.com'>chiara.peroo@gmail.com</a>
          </li>
        </ul>
      </footer>
    </>
  );
}
