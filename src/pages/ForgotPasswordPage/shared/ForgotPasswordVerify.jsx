import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useForgotPasswordVerifyMutation } from "@/services/api/auth";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useSnackbar } from "@/components/Snackbar";

const ForgotPasswordVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

  const [forgotPasswordVerify, { isLoading }] =
    useForgotPasswordVerifyMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const handleForgotPasswordVerify = async (data) => {
    try {
      const response = await forgotPasswordVerify({
        email: email,
        verificationCode: data?.otp,
      }).unwrap();
      console.log("responseData", response);
      const token = response?.result?.forgotPasswordToken;
      localStorage.setItem("forgotPasswordToken", token);

      if (response) {
        showSnackbar("Xác thực OTP thành công!", "success");
        setTimeout(() => {
          navigate("/forgot-password/reset-password", {
            state: { email, forgotPasswordToken: token },
          });
        }, 1000);
      }
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
        return;
      }
    }
  };

  const email = location.state?.email || "Không có email";
  console.log("Email received in VerifyAccount:", email);

  return (
    <Box
      component={"main"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box display={"flex"} alignItems={"center"} minHeight="100vh">
        <Box
          borderRadius={2}
          sx={{
            backgroundColor: "white",
            boxShadow: 1,
            px: {
              md: 12,
              lg: 12,
              xl: 12,
              sm: 2,
              xs: 2,
            },
            py: {
              md: 8,
              lg: 8,
              xl: 8,
              sm: 6,
              xs: 6,
            },
            mx: {
              sm: 2,
              xs: 2,
            },
          }}
        >
          <Typography
            fontWeight={"bold"}
            sx={{
              fontSize: {
                md: "1.6rem",
                lg: "1.6rem",
                xl: "1.6rem",
                sm: "1.4rem",
                xs: "1.4rem",
              },
              textAlign: "center",
            }}
          >
            Xác thực tài khoản
          </Typography>

          <form onSubmit={handleSubmit(handleForgotPasswordVerify)}>
            <Typography
              my={4}
              sx={{
                textAlign: "center",
                fontSize: {
                  md: "1.1rem",
                  lg: "1.1rem",
                  xl: "1.1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
              }}
            >
              Vui lòng nhập OTP chúng tôi đã gửi đến email của bạn.
            </Typography>

            <Typography
              my={4}
              sx={{
                fontSize: {
                  md: "1.1rem",
                  lg: "1.1rem",
                  xl: "1.1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
                fontWeight: "bold",
              }}
            >
              {email}
            </Typography>

            <Controller
              name="otp"
              control={control}
              rules={{ validate: (value) => value.length === 6 }}
              render={({ field, fieldState }) => (
                <Box my={4}>
                  <MuiOtpInput
                    value={field.value}
                    onChange={field.onChange}
                    sx={{
                      ".MuiInputBase-input": {
                        px: 0,
                      },
                      ".MuiOtpInput-TextField": {
                        maxWidth: {
                          md: 60,
                          lg: 60,
                          xl: 60,
                        },
                      },
                    }}
                    {...field}
                    length={6}
                  />
                  {fieldState.invalid ? (
                    <FormHelperText sx={{ mt: 1 }} error>
                      OTP không hợp lệ
                    </FormHelperText>
                  ) : null}
                </Box>
              )}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ fontSize: "1.2rem" }}
            >
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={34} color="inherit" sx={{ mr: 1 }} />
                </Box>
              ) : (
                "Xác nhận"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordVerify;
