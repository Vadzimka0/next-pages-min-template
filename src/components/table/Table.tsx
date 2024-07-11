import { Checkbox } from "@mantine/core";
import TableHeader from "./TableHeader";
import styles from "./Table.module.css";

export function Table({ matches, onChangeCheckbox }: any) {
  const selected = matches && matches.filter((match: any) => match.ch === true);

  let sumXgHome = 0;
  let sumXgAway = 0;
  let sumScoreHome = 0;
  let sumScoreAway = 0;
  if (selected) {
    for (const item of selected) {
      if (item.stats.xg) {
        sumXgHome += item.stats.xg[0];
        sumXgAway += item.stats.xg[1];
      }
      sumScoreHome += item.score[0];
      sumScoreAway += item.score[1];
    }
  }
  const avgXg1 = selected && selected.length ? sumXgHome / selected.length : 0;
  const avgXg2 = selected && selected.length ? sumXgAway / selected.length : 0;
  const subtractionHome = sumXgHome - sumScoreHome;
  const subtractionAway = sumXgAway - sumScoreAway;

  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody>
        {matches ? (
          matches.map((match: any, index: number) => (
            <tr className={styles.table__row} key={index}>
              <td className={styles.table__checkbox}>
                <Checkbox
                  // disabled={!match[`${source}`]}
                  checked={match.ch}
                  size="xs"
                  onChange={(e) => onChangeCheckbox(e, index)}
                />
              </td>
              <td className={styles.table__odd1}>
                {match.odds["final"]["1x2"][0].toFixed(2)}
              </td>
              <td className={styles.table__oddx}>
                {match.odds["final"]["1x2"][1].toFixed(2)}
              </td>
              <td className={styles.table__odd2}>
                {match.odds["final"]["1x2"][2].toFixed(2)}
              </td>
              {/* <td className="table__oddo">
                {match.odds["final"]["ou25"][0].toFixed(2)}
              </td>
              <td className="table__oddu">
                {match.odds["final"]["ou25"][1].toFixed(2)}
              </td> */}
              <td className={styles.table__home}>{match.home}</td>
              <td className={styles.table__xg1}>
                {/* {match[`${source}`] ? match[`${source}`][0].toFixed(2) : "-"} */}
                <span>{match.stats.xg ? match.stats.xg[0] : "-"}</span>
              </td>
              <td className={styles.table__score}>
                <span className={styles.table__score_cell}>
                  <span>{match.score[0]}</span>
                  <span className={styles.table__score_divider}>-</span>
                  <span>{match.score[1]}</span>
                </span>
              </td>
              <td className={styles.table__xg2}>
                {/* {match[`${source}`] ? match[`${source}`][1].toFixed(2) : "-"} */}
                <span>{match.stats.xg ? match.stats.xg[1] : "-"}</span>
              </td>
              <td className={styles.table__away}>{match.away}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>...no matches in database</td>
          </tr>
        )}
      </tbody>
      <tfoot className={styles.table__footer}>
        <tr className={styles.table__row}>
          <td className={styles.table__checkbox}></td>
          <td className={styles.table__odd1}></td>
          <td className={styles.table__oddx}></td>
          <td className={styles.table__odd2}></td>
          {/* <td className="table__oddo"></td> */}
          {/* <td className="table__oddu"></td> */}
          <td className={`${styles.table__home} ${styles.table__average}`}>
            Avg.
          </td>
          <td className={styles.table__xg1}>{avgXg1.toFixed(2)}</td>
          <td className={styles.table__score}>
            <span className={styles.table__score_cell_avg}>
              <span className={subtractionHome > 0 ? styles.red : styles.green}>
                {subtractionHome > 0 && "+"}
                {subtractionHome.toFixed(2)}
              </span>
              <span className={subtractionAway > 0 ? styles.red : styles.green}>
                {subtractionAway > 0 && "+"}
                {subtractionAway.toFixed(2)}
              </span>
            </span>
          </td>
          <td className={styles.table__xg2}>{avgXg2.toFixed(2)}</td>
          <td className={`${styles.table__away} ${styles.table__average}`}></td>
        </tr>
      </tfoot>
    </table>
  );
}
