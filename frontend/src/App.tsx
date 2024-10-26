import React, { useState } from "react";

// Sorry I haven't used this, just used MUI fade as familiar
// import { easeIn, easeOut } from "polished";

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
import { handleApiError } from "./helpers/errors";

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

type APIData = Data[] | MovieCompanyData[] | null;

export type SelectedRow = string | null;

export type Order = "asc" | "desc";

export const optixApiGet = async <T extends APIData>(
  url: string,
  cb: React.Dispatch<React.SetStateAction<T>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: T = await response.json();
    cb(data);
  } catch (error) {
    handleApiError(error);
  } finally {
    setIsLoading(false);
  }
};

export interface SelectedRowData {
  id: string | null;
  title: string;
}

export const initialSelectedRowState = { id: null, title: "No Movie Selected" };

export const initialOrder = "asc";
export const initialOrderByState = "title";

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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { order, setOrder, orderBy, setOrderBy, handleSort, resetSorting } =
    useSorting();

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    setSuccessMessage("");
    handleRowSelection(rows, id);
  };
  console.log("Hello!");
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

        {/* There was some issue with a 500 error on some page refreshes I couldn't get to the bottom of...
      Something to do with express on localhost perhaps? Too many requests at once? */}
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
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </Container>
    </MainThemeProvider>
  );
};
