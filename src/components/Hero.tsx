import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageCol}>
        <img
          className={styles.photo}
          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'
          alt='Ritratto artista'
        />
        <div className={styles.photoOverlay} />
      </div>

      <div className={styles.contentCol}>
        <div className={styles.logo}>
          <span className={styles.logoName}>PEROÒ</span>
          <span className={styles.logoRole}>ARTIST</span>
        </div>

        <span className={styles.eyebrow}>Il nome, l’identità, l’arte</span>
        <h1 className={styles.title}>
          Il gesto diventa
          <br />
          <em>voce</em> tra
          <br />
          inconscio e realtà
        </h1>
        <p className={styles.body}>
          In Peroò convivono due anime: il figurativo che osserva il mondo
          sociale e l’astratto che racconta il sentire interiore. La tela
          diventa uno spazio di trasformazione, memoria e presenza.
        </p>
        <a
          className={styles.cta}
          href='#dove-trovarmi'
        >
          Scopri le opere
        </a>
      </div>

      <div className={styles.scroll}>Scroll</div>
    </section>
  );
}
