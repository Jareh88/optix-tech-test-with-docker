import { MovieCompanyData } from "../App";

type categories = MovieCompanyData[] | null;

export const findCompanyName = (
  categories: categories,
  filmCompanyId: string
) => {
  return categories?.find((f: MovieCompanyData) => f.id === filmCompanyId)
    ?.name;
};
