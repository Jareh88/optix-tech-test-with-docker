import { Box, Fade, Modal, useMediaQuery, useTheme } from "@mui/material";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { SelectedRowData } from "../App";
import { ReviewContent } from "./ReviewContent";
import { initialSelectedRowState } from "../helpers/consts";

interface ReviewSectionProps {
  selectedRowData: SelectedRowData;
  setSelectedRowData: React.Dispatch<React.SetStateAction<SelectedRowData>>;
}

export const ReviewSection = ({
  selectedRowData,
  setSelectedRowData,
}: ReviewSectionProps) => {
  const theme = useTheme();
  const isSmallWindow = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box py={2}>
      <ConditionalWrapper
        condition={isSmallWindow}
        wrapper={(children) => (
          <Modal
            open={!!selectedRowData.id}
            onClose={() => setSelectedRowData(initialSelectedRowState)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              {children}
            </Box>
          </Modal>
        )}
        fallbackWrapper={(children) => (
          <Fade in={!!selectedRowData.id}>
            <Box>{children}</Box>
          </Fade>
        )}
      >
        <ReviewContent selectedRow={selectedRowData} />
      </ConditionalWrapper>
    </Box>
  );
};
