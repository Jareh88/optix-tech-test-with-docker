import { Button, Typography } from "@mui/material";

export const ErrorFallback = ({ errorMessage }: { errorMessage: string }) => (
  <div>
    <Typography variant="body1" color="error">
      Error fetching data: {errorMessage}
    </Typography>
    <Button variant="contained" onClick={() => window.location.reload()}>
      Refresh page
    </Button>
  </div>
);
