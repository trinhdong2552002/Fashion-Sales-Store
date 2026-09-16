import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

const CustomTabs = ({ tabs, defaultTab, onChange }) => {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            my: 4,
            "& .MuiTab-root": { color: "black", fontSize: "1.1rem" },
            "& .Mui-selected": { color: "black", fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: "black" },
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
        {tabs.map((tab, index) => (
          <Box key={index} hidden={value !== index}>
            {value === index && tab.content}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default CustomTabs;
