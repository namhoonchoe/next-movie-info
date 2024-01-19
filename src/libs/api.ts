import axios, { AxiosInstance } from "axios";

const accessToken = process.env.NEXT_PUBLIC_MOVIE_ACCESS_TOKEN as string;

export const movieApi: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "ko-KR",
  },
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export async function tmdbFetcher(url:string) {
  const {
    data: { results },
  } = await movieApi.get(url);
  return results;
}
