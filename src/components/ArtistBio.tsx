import styles from './ArtistBio.module.scss';
import BorderGlow from './bits/BorderGlow';
export default function ArtistBio() {
  return (
    <section
      id='bio'
      className={styles.section}
    >
      <div>
        <span className={styles.label}>L’inconscio sulla tela</span>
        <h2 className={styles.heading}>CHIARA</h2>
        <p className={styles.subtitle}>Artista del flusso</p>
        <p className={styles.body}>
          Chiara, pittrice autodidatta nata nel 1995, vive l’arte come un
          processo immediato e attraversato da impulsi emotivi. Nel suo
          linguaggio visivo, introspezione e memoria personale si fondono in
          immagini che dialogano con chi osserva.
        </p>
      </div>

      <div className={styles.collage}>
        <figure className={styles.collageLarge}>
          <BorderGlow
            edgeSensitivity={30}
            glowColor='40 80 80'
            backgroundColor='#060010'
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <img
              src='https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=1000&q=80'
              alt='Dettaglio pittura astratta'
            />
          </BorderGlow>
        </figure>
        <figure className={styles.collageSmall}>
          <img
            src='https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=600&q=80'
            alt='Texture colore'
          />
        </figure>
        <figure className={styles.collageSmall}>
          <img
            src='https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
            alt='Pennellate su tela'
          />
        </figure>
      </div>
    </section>
  );
}
