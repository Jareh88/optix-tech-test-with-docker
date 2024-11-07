// Noticed inclusion of redux but haven't used it in this instance.
// If you'd like me show usage of it please let me know.
// import { createReducer } from "@reduxjs/toolkit";

import { SortableTable } from "./components/SortableTable";
import { ReviewSection } from "./components/ReviewSection";
import { RefreshButton } from "./components/RefreshButton";
import {
  useMovieCompanies,
  useMovies,
  useSelectedRow,
  useSorting,
} from "./hooks/customHooks";
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { ErrorFallback } from "./components/ErrorFallback";
import { MainThemeProvider } from "./providers/ThemeProvider";
import { Header } from "./components/Header";
import { initialSelectedRowState } from "./helpers/consts";

export interface Data {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

export interface MovieCompanyData {
  id: string;
  name: string;
}

export type SelectedRow = string | null;

export type Order = "asc" | "desc";

export interface SelectedRowData {
  id: string | null;
  title: string;
}

export const App = () => {
  const {
    data: rows,
    isLoading: isLoadingMovies,
    refetch: refetchMovies,
    error: moviesFetchError,
  } = useMovies();

  const {
    data: movieCompanies,
    isLoading: isLoadingCompanies,
    refetch: refetchMovieCompanies,
  } = useMovieCompanies();

  const { selectedRowData, setSelectedRowData, handleRowSelection } =
    useSelectedRow(initialSelectedRowState);

  const { order, orderBy, handleSort, resetSorting } = useSorting();

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    handleRowSelection(rows, id);
  };

  return (
    <MainThemeProvider>
      <CssBaseline />
      <Header />
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to Movie database!
        </Typography>
        <Box>
          {/* (Big fan of v2 grid in MUI v6) */}
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Typography variant="h4" component="h3" mb="1rem">
                Total movies displayed: {moviesFetchError ? "N/A" : rows.length}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" justifyContent="flex-end">
                <RefreshButton
                  buttonText={"Refresh"}
                  resetSelection={() =>
                    setSelectedRowData({ id: null, title: "No Movie Selected" })
                  }
                  resetSorting={resetSorting}
                  isLoading={isLoadingMovies || isLoadingCompanies}
                  refetchMovies={refetchMovies}
                  refetchMovieCompanies={refetchMovieCompanies}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {moviesFetchError ? (
          <ErrorFallback errorMessage={moviesFetchError} />
        ) : isLoadingMovies || isLoadingCompanies ? (
          <>
            <CircularProgress />
            <Typography variant="body1">Fetching table...</Typography>
          </>
        ) : (
          <SortableTable
            rows={rows}
            categories={movieCompanies}
            selected={selectedRowData.id}
            handleClick={handleClick}
            order={order}
            orderBy={orderBy}
            handleSort={handleSort}
          />
        )}

        <ReviewSection
          selectedRowData={selectedRowData}
          setSelectedRowData={setSelectedRowData}
        />
      </Container>
    </MainThemeProvider>
  );
};
