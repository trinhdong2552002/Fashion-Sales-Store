import { Container, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import WallpaperRepresentative from "@/components/wallpaper-representative";

const MyOrder = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <WallpaperRepresentative titleHeader="Đơn hàng của tôi" />

      <Container maxWidth="lg">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
          variant="fullWidth"
          sx={{
            m: 4,
            color: "white",
            "& .MuiTab-root": { color: "var(--text-color)" },
            // "& .Mui-selected": { color: "black" },
            "& .MuiTabs-indicator": { backgroundColor: "black" },
          }}
        >
          <Tab value="one" label="Chờ thanh toán" />
          <Tab value="two" label="Đã thanh toán" />
          <Tab value="three" label="Đã huỷ" />
        </Tabs>
      </Container>
    </Fragment>
  );
};

export default MyOrder;
