import styles from './ArtistBio.module.scss';
import { motion } from 'framer-motion';
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from '../animations';
export default function ArtistBio() {
  return (
    <motion.section
      id='bio'
      className={styles.section}
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <motion.div variants={staggerContainer}>
        <motion.span
          className={styles.label}
          variants={fadeUp}
        >
          L’inconscio sulla tela
        </motion.span>
        <motion.h2
          className={styles.heading}
          variants={fadeUp}
        >
          CHIARA
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          variants={fadeUp}
        >
          Artista del flusso
        </motion.p>
        <motion.p
          className={styles.body}
          variants={fadeUp}
        >
          Chiara, pittrice autodidatta nata nel 1998, vive l'arte come un
          processo meditativo e introspettivo. Le sue opere, che spaziano
          dall'astratto al figurativo, nascono da un impulso inconscio che viene
          "decodificato" solo a lavoro terminato. Al centro della sua ricerca ci
          sono l'evoluzione umana e il legame tra mondo interiore e società,
          trasformando emozioni e ricordi personali in un linguaggio universale.
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.collage}
        variants={fadeIn}
      >
        <motion.figure
          className={styles.collageLarge}
          variants={fadeUp}
        >
          <motion.img
            src='https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=1000&q=80'
            alt='Dettaglio pittura astratta'
            variants={fadeIn}
          />
        </motion.figure>

        <motion.figure
          className={styles.collageSmall}
          variants={fadeUp}
        >
          <motion.img
            src='https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=600&q=80'
            alt='Texture colore'
            variants={fadeIn}
          />
        </motion.figure>
        <motion.figure
          className={styles.collageSmall}
          variants={fadeUp}
        >
          <motion.img
            src='https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
            alt='Pennellate su tela'
            variants={fadeIn}
          />
        </motion.figure>
      </motion.div>
    </motion.section>
  );
}
