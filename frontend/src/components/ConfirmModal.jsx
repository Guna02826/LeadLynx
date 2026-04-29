import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", type = "danger" }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
          
          <div className={styles.content}>
            <div className={`${styles.iconWrapper} ${styles[type]}`}>
              <AlertCircle size={32} />
            </div>
            
            <div className={styles.text}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.message}>{message}</p>
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button 
              className={`${styles.confirmBtn} ${styles[type + "Btn"]}`} 
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
