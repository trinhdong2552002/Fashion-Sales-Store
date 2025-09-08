import { Grid, Typography } from "@mui/material";

import AccountSideBar from "@/components/AccountSideBar";
import ChangePasswordInform from "./shared/ChangePasswordInform";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const { id } = useParams();

  return (
    <section>
      <Grid container p={10} spacing={6}>
        <Grid size={{ xl: 3, lg: 3 }}>
          <AccountSideBar id={id} />
        </Grid>

        <Grid size={{ xl: 9, lg: 9 }}>
          <Typography variant="h4" fontWeight={"bold"} mb={2}>
            Đổi mật khẩu
          </Typography>
          <ChangePasswordInform />
        </Grid>
      </Grid>
    </section>
  );
};

export default ChangePassword;
