import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogData } from "@/mocks/blog";

const Blog = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box component={"section"}>
      <WallpaperRepresentative titleHeader="Bài viết" />

      <Container maxWidth="lg">
        {blogData?.slice(0, 1).map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            state={{ blog }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Grid container spacing={6} my={10}>
              <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      objectFit: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  height={"100%"}
                >
                  <Typography
                    mb={4}
                    variant="h4"
                    fontWeight={"bold"}
                    fontSize={{
                      xl: "1.6rem",
                      lg: "1.6rem",
                      md: "1.4rem",
                      sm: "1.2rem",
                      xs: "1.2rem",
                    }}
                  >
                    {blog.title.slice(0, 100)}...
                  </Typography>

                  <Typography
                    variant="body1"
                    mb={4}
                    fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
                    color="#666"
                  >
                    {blog.body.slice(0, 200)}...
                  </Typography>

                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <Avatar
                      src={blog?.author?.avatar}
                      alt="Avatar"
                      sx={{ width: 100, height: 100 }}
                    />

                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      justifyContent={"flex-start"}
                      ml={2}
                    >
                      <Typography
                        component={"p"}
                        color="black"
                        fontSize="1.1rem"
                        fontWeight="600"
                      >
                        {blog?.author?.name}
                      </Typography>

                      <Typography
                        component={"p"}
                        color="#666"
                        fontSize="1.1rem"
                      >
                        {blog?.createdAt}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Link>
        ))}

        <Grid container direction={"row"} spacing={3}>
          {blogData?.slice(1, 10).map((blog) => (
            <Grid key={blog.id} size={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 12 }}>
              <Link
                to={`/blog/${blog.id}`}
                state={{ blog }}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 6,
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      fontSize={{
                        xl: "1.2rem",
                        lg: "1.2rem",
                        md: "1.2rem",
                        sm: "1.1rem",
                        xs: "1.1rem",
                      }}
                      fontWeight={"bold"}
                      mb={2}
                    >
                      {blog.title.slice(0, 60)}...
                    </Typography>
                    <Typography
                      component="p"
                      mb={2}
                      fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
                      color="#666"
                    >
                      {blog.body.slice(0, 100)}...
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      mt={2}
                    >
                      <Avatar
                        src={blog?.author?.avatar}
                        alt="Avatar"
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box ml={2}>
                        <Typography
                          component="p"
                          color="black"
                          fontSize="1rem"
                          fontWeight="600"
                        >
                          {blog?.author?.name}
                        </Typography>
                        <Typography
                          component="p"
                          color="#666"
                          fontSize="0.9rem"
                        >
                          {blog?.createdAt}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
