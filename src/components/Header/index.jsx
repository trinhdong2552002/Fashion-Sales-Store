import { useTheme, useMediaQuery } from "@mui/material";

import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useEffect } from "react";
import { useGetAllCategoriesByUserQuery } from "@/services/api/category";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: dataCategories, refetch: refetchCategories } =
    useGetAllCategoriesByUserQuery({
      page: 1,
      size: 10,
    });

  useEffect(() => {
    refetchCategories();
  }, []);

  const activeCategories = Array.isArray(dataCategories)
    ? dataCategories.filter((item) => item.status === "ACTIVE")
    : [];

  return isMobile ? (
    <MobileHeader activeCategories={activeCategories} />
  ) : (
    <DesktopHeader activeCategories={activeCategories} />
  );
};

export default Header;
