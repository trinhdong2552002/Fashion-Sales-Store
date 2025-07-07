import { Container, Grid, Stack } from "@mui/material";

import ProfileInform from "./shared/ProfileInform";

import AccountSideBar from "@/components/AccountSideBar";

const Profile = () => {
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
                HỒ SƠ CÁ NHÂN
              </h1>

              <Stack alignItems={"center"}>
                <ProfileInform />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </section>
  );
};

export default Profile;
