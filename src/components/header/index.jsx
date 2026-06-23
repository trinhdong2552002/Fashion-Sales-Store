import { useTheme, useMediaQuery } from "@mui/material";

import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import { useGetAllCategoriesByUserQuery } from "@/services/api/category";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: dataCategories } = useGetAllCategoriesByUserQuery(
    {
      page: 0,
      size: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const activeCategories =
    dataCategories?.result?.items.filter((item) => item.status === "ACTIVE") ||
    [];

  return isMobile ? (
    <MobileHeader activeCategories={activeCategories} />
  ) : (
    <DesktopHeader activeCategories={activeCategories} />
  );
};

export default Header;
