import { MatchHistoryType } from "@/types";

export const calculateMatchesAverages = (
  matches: MatchHistoryType[],
  category: string | null
) => {
  const selected = matches.filter(
    (match: MatchHistoryType) => match.ch === true
  );

  let firstSumValue = 0;
  let secondSumValue = 0;
  let selectedNotNullLength = 0;

  for (const match of selected) {
    let values = category
      ? match.stats[category as keyof typeof match.stats]
      : [];

    if (values) {
      firstSumValue += parseFloat(values[0] as string);
      secondSumValue += parseFloat(values[1] as string);
      selectedNotNullLength++;
    }
  }

  const firstAvg =
    selected && selectedNotNullLength && selected.length
      ? firstSumValue / selectedNotNullLength
      : 0;

  const secondAvg =
    selected && selectedNotNullLength && selected.length
      ? secondSumValue / selectedNotNullLength
      : 0;

  return { firstAvg, secondAvg };
};
