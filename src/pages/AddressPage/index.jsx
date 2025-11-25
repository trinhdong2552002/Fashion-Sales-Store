import { Container, Grid } from "@mui/material";
import AccountSideBar from "@/components/AccountSideBar";
import { useParams } from "react-router-dom";
import AddressList from "./shared/AddressList";

const Address = () => {
  const { id } = useParams();

  return (
    <Container
      maxWidth="xl"
      sx={{
        my: {
          xs: 4,
          sm: 4,
          md: 8,
          lg: 8,
          xl: 8,
        },
      }}
    >
      <Grid container spacing={6}>
        <Grid
          size={{ xl: 3, lg: 3, md: 4 }}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            },
          }}
        >
          <AccountSideBar id={id} />
        </Grid>

        <Grid size={{ xl: 9, lg: 9, md: 8, sm: 12, xs: 12 }}>
          <AddressList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Address;
