export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const DATES: any = [];

for (let index = 0; index < 10; index++) {
  //let index = 0
  DATES.push(
    new Date(
      new Date().getTime() + index * 24 * 60 * 60 * 1000
    ).toLocaleDateString()
  );
}
