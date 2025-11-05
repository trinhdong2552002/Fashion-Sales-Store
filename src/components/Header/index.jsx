import { useTheme, useMediaQuery } from "@mui/material";

import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useEffect } from "react";
import { useListCategoriesForUserQuery } from "@/services/api/categories";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: dataCategories, refetch: refetchCategories } =
    useListCategoriesForUserQuery({
      page: 0,
      size: 10,
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    refetchCategories();
  }, [refetchCategories]);

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
