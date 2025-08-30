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
import { Link } from "react-router-dom";

const mockData = {
  code: 200,
  message: "Fetch all blog",
  result: {
    page: 1,
    size: 10,
    totalPages: 1,
    totalItems: 1,
    items: [
      {
        id: 1,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/about-us/our-mission.jpg",
        author: {
          id: 1,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 2,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 2,
          name: "Michael Williams",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 3,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 3,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 4,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 4,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 5,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 5,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 6,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 6,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 7,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 7,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 8,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 8,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 9,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 9,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
      {
        id: 10,
        title:
          "The Future of Al-Powered Comment Moderation: Enhancing Online Safety and Engagement",
        body: "Explore how Al technology is revolutionizing comment moderation, making onine communities sater and more engaging. this post delves. into the latest advancements in Al, showcasing how tools like Commenter.ai are .....",
        image: "/src/assets/images/banner/banner-1.jpg",
        author: {
          id: 10,
          name: "John Doe",
          avatar:
            "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/66.jpg",
        },
        createdAt: "2025-08-30",
      },
    ],
  },
};

console.log;

const Blog = () => {
  return (
    <Box component={"section"}>
      <WallpaperRepresentative titleHeader="Blog" />

      <Container maxWidth="lg">
        <Link style={{ textDecoration: "none" }}>
          <Grid container spacing={6} my={10}>
            <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              {mockData?.result?.items.slice(0, 1).map((blog) => (
                <Box
                  key={blog.id}
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
                      height: "100%",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Grid>

            <Grid size={{ xl: 8, lg: 8, md: 8, sm: 12, xs: 12 }}>
              {mockData?.result?.items.slice(0, 1).map((blog) => (
                <Box
                  key={blog.id}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  height={"100%"}
                >
                  <Typography
                    color="info"
                    mb={4}
                    fontWeight={600}
                    fontSize={"1.8rem"}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    component={"p"}
                    mb={4}
                    sx={{
                      color: "#666",
                      fontSize: "1.1rem",
                    }}
                  >
                    {blog.body}
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
              ))}
            </Grid>
          </Grid>
        </Link>

        <Grid
          container
          direction={"row"}
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {mockData?.result?.items.slice(1, 10).map((blog) => (
            <Grid key={blog.id} size={{ xl: 4, lg: 4, md: 6, sm: 6, xs: 12 }}>
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
                  style={{ width: "100%" }}
                />
                <CardContent>
                  <Typography color="info" variant="h6" fontWeight={600} mb={2}>
                    {blog.title}
                  </Typography>
                  <Typography
                    component="p"
                    mb={2}
                    sx={{
                      color: "#666",
                      fontSize: "1rem",
                    }}
                  >
                    {blog.body.slice(0, 114)}
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
                      <Typography component="p" color="#666" fontSize="0.9rem">
                        {blog?.createdAt}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
