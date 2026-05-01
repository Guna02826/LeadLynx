import { Edit2, Trash2 } from "lucide-react";
import Badge from "./common/Badge";
import styles from "./LeadCard.module.css";

const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.leadDetails}>
        <div className={styles.leadHeader}>
          <h3>{lead.name}</h3>
          <Badge status={lead.status}>
            {lead.status}
          </Badge>
        </div>
        <p className={styles.meta}>
          <span>{lead.email}</span>
          <span className={styles.dot}>•</span>
          <span>{lead.company}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.source}>Source: {lead.source}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.iconBtn} ${styles.editBtn}`}
          onClick={() => onEdit(lead)}
          title="Edit Lead"
        >
          <Edit2 size={16} />
        </button>
        <button
          className={`${styles.iconBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(lead._id)}
          title="Delete Lead"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default LeadCard;
