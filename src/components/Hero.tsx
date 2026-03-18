import styles from './Hero.module.scss';
import { motion } from 'framer-motion';
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from '../animations';

export default function Hero() {
  return (
    <motion.section
      className={styles.hero}
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <motion.div
        className={styles.imageCol}
        variants={fadeIn}
      >
        <motion.img
          className={styles.photo}
          src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'
          alt='Ritratto artista'
          variants={fadeIn}
        />
        <div className={styles.photoOverlay} />
      </motion.div>

      <motion.div
        className={styles.contentCol}
        variants={staggerContainer}
      >
        <motion.div
          className={styles.logo}
          variants={fadeUp}
        >
          <span className={styles.logoName}>PEROÒ</span>
          <span className={styles.logoRole}>ARTIST</span>
        </motion.div>

        <motion.span
          className={styles.eyebrow}
          variants={fadeUp}
        >
          Il nome, l’identità, l’arte
        </motion.span>
        <motion.h1
          className={styles.title}
          variants={fadeUp}
        >
          Il gesto diventa
          <br />
          <em>voce</em> tra
          <br />
          inconscio e realtà
        </motion.h1>
        <motion.p
          className={styles.body}
          variants={fadeUp}
        >
          In Peroò convivono due anime: il figurativo che osserva il mondo
          sociale e l’astratto che racconta il sentire interiore. La tela
          diventa uno spazio di trasformazione, memoria e presenza.
        </motion.p>
        <motion.a
          className={styles.cta}
          href='#dove-trovarmi'
          variants={fadeUp}
        >
          Scopri le opere
        </motion.a>

        <motion.div
          className={styles.socials}
          variants={fadeUp}
        >
          <a
            href='https://www.instagram.com/_perooartist_/'
            target='_blank'
            rel='noreferrer'
          >
            Instagram
          </a>
          <a
            href='https://www.tiktok.com'
            target='_blank'
            rel='noreferrer'
          >
            TikTok
          </a>
          <a href='mailto:chiara.peroo@gmail.com'>Email</a>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scroll}
        variants={fadeIn}
      >
        Scroll
      </motion.div>
    </motion.section>
  );
}
