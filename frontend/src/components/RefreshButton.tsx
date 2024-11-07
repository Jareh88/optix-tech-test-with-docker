import { Button } from "@mui/material";

interface RefreshButtonProps {
  buttonText: string;
  resetSelection: () => void;
  resetSorting: () => void;
  isLoading: boolean;
  refetchMovies: () => Promise<void>;
  refetchMovieCompanies: () => Promise<void>;
}

export const RefreshButton = ({
  buttonText,
  resetSelection,
  resetSorting,
  isLoading,
  refetchMovies,
  refetchMovieCompanies,
}: RefreshButtonProps) => {
  return (
    <Button
      onClick={() => {
        resetSelection();
        resetSorting();
        void refetchMovieCompanies(); // void operator due to using safe promise, error handled internally in useFetch Data / fetchData
        void refetchMovies();
      }}
      variant="contained"
      disabled={isLoading}
    >
      {buttonText}
    </Button>
  );
};
