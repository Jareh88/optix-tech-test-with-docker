import { Box, Typography } from "@mui/material";
import { SubmitReviewForm } from "./SubmitReviewForm";
import { SelectedRowData } from "../App";

interface ReviewContentProps {
  selectedRow: SelectedRowData;
}

export const ReviewContent = ({ selectedRow }: ReviewContentProps) => {
  return (
    <Box>
      <Typography variant="h4" component="h3">
        {selectedRow.title}
      </Typography>
      <Typography variant="h6" component="h4" mb="1rem">
        Please leave a review below
      </Typography>
      <SubmitReviewForm selectedRow={selectedRow.id} />
    </Box>
  );
};
