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

const mockData = [
  {
    id: 1,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 2,
      name: "Grant Beatty",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/4.jpg",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 3,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 3,
      name: "Lyle Barrows-Marquardt",
      avatar: "https://avatars.githubusercontent.com/u/51900306",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 4,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 4,
      name: "Phyllis Hand",
      avatar: "https://avatars.githubusercontent.com/u/93006255",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 5,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 5,
      name: "Angie Mayert I",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/10.jpg",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 6,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 6,
      name: "Henrietta Ratke",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/8.jpg",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 7,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 7,
      name: "Lee Armstrong Sr.",
      avatar: "https://avatars.githubusercontent.com/u/69014144",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 8,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 8,
      name: "Kate Kub",
      avatar: "https://avatars.githubusercontent.com/u/96683538",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 9,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 9,
      name: "Johanna Hilll",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/11.jpg",
    },
    createdAt: "2025-08-30",
  },
  {
    id: 10,
    title: "7 trang phục hàng ngày luôn làm bạn bảnh bao",
    body: "Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean xanh, quần jean nam, quần kaki…vv",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: {
      id: 10,
      name: "Wayne Schinner",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/51.jpg",
    },
    createdAt: "2025-08-30",
  },
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // For smooth scrolling, use 'auto' for instant jump
    });
  }, []);

  return (
    <Box component={"section"}>
      <WallpaperRepresentative titleHeader="Blog" />

      <Container maxWidth="lg">
        {mockData?.slice(0, 1).map((blog) => (
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
                  <Typography mb={4} fontWeight={"bold"} fontSize={"1.8rem"}>
                    {blog.title}
                  </Typography>

                  <Typography
                    component={"p"}
                    mb={4}
                    sx={{
                      color: "#666",
                      fontSize: "1.2rem",
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
              </Grid>
            </Grid>
          </Link>
        ))}

        <Grid
          container
          direction={"row"}
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {mockData?.slice(1, 10).map((blog) => (
            <Grid key={blog.id} size={{ xl: 4, lg: 4, md: 6, sm: 6, xs: 12 }}>
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
                    style={{ width: "100%" }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={"bold"} mb={2}>
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
