import styles from "./Table.module.css";

function TableHeader() {
  return (
    <thead className={styles.table__header}>
      <tr className={styles.table__row}>
        <th className={styles.table__checkbox}></th>
        <th className={styles.table__odd1}>1</th>
        <th className={styles.table__oddx}>x</th>
        <th className={styles.table__odd2}>2</th>
        {/* <th className="table__oddo">o2.5</th> */}
        {/* <th className="table__oddu">u2.5</th> */}
        <th className={styles.table__home}>Home</th>
        <th className={styles.table__xg1}>xG 1</th>
        <th className={styles.table__score}>Score</th>
        <th className={styles.table__xg2}>xG 2</th>
        <th className={styles.table__away}>Away</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
