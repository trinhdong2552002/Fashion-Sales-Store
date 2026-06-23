import { Avatar, Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { blogDetailData } from "@/mocks/blog-detail";

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state?.blog;

  // Find the matching blog detail data based on blogDetailId
  const detailData = blogDetailData.find(
    (detail) => detail.id === blog?.blogDetailId,
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box my={6}>
          {/* Blog Image */}
          <Box mb={4} display="flex" justifyContent="center">
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
            />
          </Box>

          {/* Author Info */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            <Avatar
              src={blog?.author?.avatar}
              alt={blog?.author?.name}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Box>
              <Typography
                component="p"
                color="black"
                fontSize="1.1rem"
                fontWeight="600"
              >
                {blog?.author?.name}
              </Typography>
              <Typography component="p" color="#666" fontSize="1rem">
                Ngày đăng {blog?.createdAt}
              </Typography>
            </Box>
          </Box>

          {/* Blog Title */}
          <Typography
            variant="h4"
            fontWeight={"bold"}
            fontSize={{
              xl: "1.8rem",
              lg: "1.8rem",
              md: "1.8rem",
              sm: "1.2rem",
              xs: "1.2rem",
            }}
            mb={3}
            textAlign="center"
          >
            {blog.title}
          </Typography>

          {/* Blog Body */}
          <Typography
            variant="body1"
            my={4}
            color="#666"
            fontSize={{ xs: "1rem", sm: "1rem", md: "1.2rem" }}
            lineHeight={1.8}
          >
            {blog.body}
          </Typography>

          {/* Dynamic Content Sections */}
          {detailData?.contents?.map((content) => (
            <Box key={content.id}>
              {content.title?.map((titleItem, index) => (
                <Box key={titleItem.id} mb={4}>
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    mb={3}
                    fontSize={{
                      xl: "1.5rem",
                      lg: "1.5rem",
                      md: "1.3rem",
                      sm: "1.2rem",
                      xs: "1.1rem",
                    }}
                  >
                    {titleItem.text}
                  </Typography>

                  {/* Corresponding Body Text */}
                  {content.body?.[index] && (
                    <Typography
                      variant="body1"
                      color="#666"
                      fontSize={{ xs: "1rem", sm: "1rem", md: "1.2rem" }}
                      lineHeight={1.8}
                      mb={3}
                    >
                      {content.body[index].text}
                    </Typography>
                  )}

                  {/* Corresponding Image */}
                  {content.images?.[index] && (
                    <Box display="flex" justifyContent="center" mb={4}>
                      <img
                        src={content.images[index].imageUrl}
                        alt={titleItem.text}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Fragment>
  );
};

export default BlogDetail;
