// Would normally split these out to their own files.
import { useState, useEffect, useCallback } from "react";
import { Data, MovieCompanyData, Order, SelectedRowData } from "../App";
import { UseFormSetError } from "react-hook-form";
import { useBoolean } from "react-use";
import { apiUrl, initialOrder, initialOrderByState } from "../helpers/consts";
import { handleApiError } from "../helpers/errors";

export const useFetchData = <T,>(
  url: string,
  initialData: T,
  disableFetchOnMount = false // Added option to not call hook on mount if wanting to add further use cases
) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, toggleIsLoading] = useBoolean(false); // Can't believe I've never seen useBoolean before.
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    toggleIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const jsonData: T = (await response.json()) as T;
      setData(jsonData);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message}`);
      }
    } finally {
      toggleIsLoading(false);
    }
  }, [toggleIsLoading, url]);

  // Fetching data once when the hook is used
  // useEffect makes sense here, with the dependencies too. Reasoning: -
  // 1) Side Effects & Lifecycle: Data fetching is a side effect that’s dependent on the lifecycle of the component (it should occur once, after the component mounts).
  // 2) Control of Dependencies: The useEffect hook allows you to control the dependencies—in this case, fetching data only once on mount is critical.
  // 3) Separation of Concerns: useEffect makes it clear that fetching data is a separate concern that should only happen at a specific point in the lifecycle, i.e., when the component is rendered for the first time.
  // see: https://react.dev/learn/you-might-not-need-an-effect
  // Initially had a parameter here to add dependencies to the useFetchData hook for flexibility, based on preferences of whatever team. But happy to remove it.
  useEffect(() => {
    if (!disableFetchOnMount) {
      void fetchData(); // void operator due to using safe promise, error handled internally above in fetchData
    }
  }, [disableFetchOnMount, fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

export const useMovies = () => {
  return useFetchData<Data[]>(`${apiUrl}/movies`, []);
};

export const useMovieCompanies = () => {
  return useFetchData<MovieCompanyData[]>(`${apiUrl}/movieCompanies`, []);
};

export const useSelectedRow = (initialState: SelectedRowData) => {
  const [selectedRowData, setSelectedRowData] =
    useState<SelectedRowData>(initialState);

  const handleRowSelection = (rows: Data[], id: string) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRowData.id === id) {
      setSelectedRowData(initialState);
    } else {
      setSelectedRowData(
        selectedRow ? { id, title: selectedRow.title } : initialState
      );
    }
  };

  return { selectedRowData, setSelectedRowData, handleRowSelection };
};

export const useSorting = () => {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [orderBy, setOrderBy] = useState<keyof Data>(initialOrderByState);

  const handleSort = (property: keyof Data) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  const resetSorting = () => {
    setOrder(initialOrder);
    setOrderBy(initialOrderByState);
  };

  return { order, setOrder, orderBy, setOrderBy, handleSort, resetSorting };
};

interface FormData {
  review: string;
}

interface SubmitResponse {
  message: string;
}

export const useHandleSubmit = (
  setSuccessMessage: (message: string) => void,
  setError: UseFormSetError<FormData>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { review: string }) => {
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/submitReview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const jsonData = (await response.json()) as SubmitResponse;
      setSuccessMessage(jsonData.message);
    } catch (error) {
      handleApiError(error);
      setError("root.serverError", {
        type: "manual",
        message: "Submission Error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};
