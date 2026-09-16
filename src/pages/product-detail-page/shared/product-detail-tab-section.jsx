import CustomTabs from "@/components/tabs";
import { useGetProductReviewByIdQuery } from "@/services/api/product";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Rating,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

const ProductDetailTabAction = ({ productId, dataProductById }) => {
  const [tabValue, setTabValue] = useState(0);
  const [visibleSize, setVisibleSize] = useState(5);

  const {
    data: dataReviews,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useGetProductReviewByIdQuery(
    { productId: productId, page: 0, size: visibleSize },
    { skip: tabValue !== 1 },
  );

  const reviewsList = dataReviews?.result?.items || [];
  const hasMoreReviews = dataReviews?.result?.totalElements > visibleSize;

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleLoadMore = () => {
    setVisibleSize((prev) => prev + 5);
  };

  return (
    <Box>
      <CustomTabs
        onChange={handleTabChange}
        tabs={[
          {
            label: "Mô tả sản phẩm",
            content: (
              <Box sx={{ px: 2, pb: 4 }}>
                {dataProductById?.result?.description ? (
                  <Typography
                    component={"div"}
                    variant="body1"
                    gutterBottom
                    sx={{
                      mb: 1,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: dataProductById?.result?.description,
                    }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    Chưa có mô tả cho sản phẩm này.
                  </Typography>
                )}
              </Box>
            ),
          },
          {
            label: `Đánh giá (${dataReviews?.result?.totalItems || 0})`,
            content: (
              <Box sx={{ px: 2, pb: 4 }}>
                {/* Average Rating Block */}
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={4}
                  flexWrap="wrap"
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      bgcolor: "#f9f9f9",
                      p: 3,
                      borderRadius: 2,
                      minWidth: 150,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {dataProductById?.result?.averageRating?.toFixed(1) ||
                        "0.0"}
                    </Typography>
                    <Rating
                      value={dataProductById?.result?.averageRating || 0}
                      precision={0.1}
                      readOnly
                      size="medium"
                      sx={{ mt: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {dataProductById?.result?.totalReviews || 0} đánh giá
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Reviews List */}
                {isLoadingReviews && visibleSize === 5 ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress size={30} />
                  </Box>
                ) : isErrorReviews ? (
                  <Typography color="error">
                    Không thể tải đánh giá sản phẩm.
                  </Typography>
                ) : !reviewsList || reviewsList.length === 0 ? (
                  <Typography
                    variant="body1"
                    color="#666"
                    align="center"
                    sx={{ py: 4 }}
                  >
                    Chưa có đánh giá nào cho sản phẩm này.
                  </Typography>
                ) : (
                  <Box>
                    <Stack spacing={3}>
                      {reviewsList.map((review) => (
                        <Box
                          key={review.id}
                          sx={{
                            pb: 3,
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            mb={1}
                          >
                            <Avatar
                              src={review.userAvatarUrl}
                              alt={review.userName}
                            >
                              {review.userName?.charAt(0)?.toUpperCase() || "U"}
                            </Avatar>
                            <Box>
                              <Typography variant="body1" fontWeight="bold">
                                {review.userName || "Người dùng"}
                              </Typography>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1.5}
                                mt={0.5}
                              >
                                <Rating
                                  value={review.rating}
                                  readOnly
                                  size="small"
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {dayjs(review.createdAt).format("DD/MM/YYYY")}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              mt: 1,
                              color: "#333",
                              pl: 7,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {review.comment}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>

                    {/* Load More Button */}
                    {hasMoreReviews && (
                      <Box display="flex" justifyContent="center" mt={4}>
                        <Button
                          variant="outlined"
                          onClick={handleLoadMore}
                          disabled={isLoadingReviews}
                          sx={{
                            borderColor: "black",
                            color: "black",
                            px: 4,
                            py: 1,
                            "&:hover": {
                              borderColor: "black",
                              bgcolor: "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                        >
                          {isLoadingReviews
                            ? "Đang tải..."
                            : "Xem thêm đánh giá"}
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
};

export default ProductDetailTabAction;
