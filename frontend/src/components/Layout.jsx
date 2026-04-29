import React from 'react';
import { motion } from 'framer-motion';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={styles.main}
    >
      <div className={styles.container}>
        {children}
      </div>
    </motion.main>
  );
};

export default Layout;
