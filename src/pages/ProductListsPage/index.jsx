import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useListCategoriesForUserQuery } from "@/services/api/categories";
import { slugify } from "@/utils/slugify";
import ProductItems from "./shared/ProductItems";

const ProductLists = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState("");

  const selectedCategory = searchParams.get("category") || "";

  const {
    data: dataCategories,
    isLoading,
    refetch: refetchCategory,
  } = useListCategoriesForUserQuery({
    pageNo: 1,
    pageSize: 10,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetchCategory();
  }, [refetchCategory]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  return (
    <Box component={"section"}>
      <Box m={2}>
        {isLoading ? (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" height={180} />
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={{ xl: 2, lg: 2 }}>
              <Grid
                size={{ xl: 2, lg: 2, md: 2 }}
                sx={{
                  display: {
                    xl: "block",
                    lg: "block",
                    md: "none",
                    xs: "none",
                    sm: "none",
                  },
                  maxHeight: 500,
                  border: "1px solid #ddd",
                  width: "100%",
                  p: {
                    xl: 4,
                    lg: 3,
                  },
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xl: "1.8rem",
                      lg: "1.4rem",
                    },
                  }}
                  width={"100%"}
                  fontWeight={"bold"}
                >
                  Danh mục
                </Typography>
                {dataCategories.map((category, id) => {
                  const categorySlug = slugify(category.name);
                  return (
                    <Box sx={{ mt: "38px" }} key={id}>
                      <Link
                        to={`/all-products?category=${categorySlug}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight:
                            selectedCategory === categorySlug
                              ? "bold"
                              : "normal",
                        }}
                      >
                        {category.name}
                      </Link>
                    </Box>
                  );
                })}
              </Grid>

              <Grid size={{ xl: 10, lg: 10, md: 12, xs: 12, sm: 12 }}>
                <ProductItems
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductLists;
