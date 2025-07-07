// pages/ChangePassword/index.jsx
import { Container, Grid, Stack } from "@mui/material";

import AccountSideBar from "@/components/AccountSideBar";
import ChangePasswordInform from "./shared/ChangePasswordInform";

const ChangePassword = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Stack sx={{ m: "80px 0" }}>
          <Grid container>
            <Grid size={{ xl: 3, lg: 3 }}>
              <AccountSideBar />
            </Grid>

            <Grid size={{ xl: 9, lg: 9 }}>
              <h1
                style={{
                  fontWeight: "500",
                  width: "100%",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                ĐỔI MẬT KHẨU
              </h1>

              <Stack alignItems={"center"}>
                <ChangePasswordInform />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </section>
  );
};

export default ChangePassword;
