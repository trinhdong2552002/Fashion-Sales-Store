import { useSnackbar } from "@/components/Snackbar";
import { useHideAddressMutation } from "@/services/api/address";
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Fragment, useState } from "react";

export const ChildModalHideAddress = ({ addressId, refetchGetAllAddress }) => {
  const [openModalHideAddress, setOpenModalHideAddress] = useState(false);

  const [hideAddress] = useHideAddressMutation();

  const { showSnackbar } = useSnackbar();

  const handleOpenModalHideAddress = (e) => {
    // Need to stop propagation to prevent parent modal from closing
    e.stopPropagation();
    setOpenModalHideAddress(true);
  };

  const handleCloseModalDeleteAddress = (e) => {
    e.stopPropagation();
    setOpenModalHideAddress(false);
  };

  const handleHideAddress = async () => {
    try {
      await hideAddress({ id: addressId }).unwrap();
      setOpenModalHideAddress(false);
      refetchGetAllAddress();
      showSnackbar("Xoá địa chỉ thành công!", "success");
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
        return;
      }
    }
  };

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={2}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenModalHideAddress}
        >
          Xoá
        </Button>
      </Box>

      {/* Nested modal confirm to delete address */}
      <Dialog
        open={openModalHideAddress}
        onClose={handleCloseModalDeleteAddress}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",

              md: "1.2rem",
            },
          }}
        >
          Xác nhận xoá địa chỉ ?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseModalDeleteAddress}
            sx={{
              fontSize: {
                xs: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleHideAddress(addressId)}
            sx={{
              fontSize: {
                xs: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
