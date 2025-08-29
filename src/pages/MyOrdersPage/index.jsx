import { Container, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";

const MyOrders = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default MyOrders;
