import { Grid, Typography } from "@mui/material";
import AccountSideBar from "@/components/AccountSideBar";
import { useParams } from "react-router-dom";
import AddressList from "./shared/AddressList";

const Address = () => {
  const { id } = useParams();

  return (
    <section>
      <Grid container p={10} spacing={6}>
        <Grid size={{ xl: 3, lg: 3 }}>
          <AccountSideBar id={id} />
        </Grid>

        <Grid size={{ xl: 9, lg: 9 }}>
          <AddressList id={id} />
        </Grid>
      </Grid>
    </section>
  );
};

export default Address;
