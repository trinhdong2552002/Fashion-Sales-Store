import { Grid, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ProductItems from "./shared/product-item";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  console.log("selectedCategory", selectedCategory);
  const categoryId = searchParams.get("categoryId") || null;
  console.log("categoryId", categoryId);
  const searchQuery = searchParams.get("search") || "";

  return (
    <Box>
      <Grid container spacing={{ xl: 2, lg: 2 }}>
        <Grid size={12}>
          <ProductItems
            selectedCategory={selectedCategory}
            categoryId={categoryId}
            searchQuery={searchQuery}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;
