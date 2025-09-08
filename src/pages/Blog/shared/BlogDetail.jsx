import { Avatar, Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import outfit_1 from "@/assets/images/blogs/outfit-1.jpg";
import outfit_2 from "@/assets/images/blogs/outfit-2.jpg";
import outfit_3 from "@/assets/images/blogs/outfit-3.jpg";
import outfit_4 from "@/assets/images/blogs/outfit-4.jpg";
import outfit_5 from "@/assets/images/blogs/outfit-5.jpg";
import outfit_6 from "@/assets/images/blogs/outfit-6.jpg";
import outfit_7 from "@/assets/images/blogs/outfit-7.jpg";

const BlogDetail = () => {
  const location = useLocation();

  const blog = location.state?.blog;

  return (
    <Box component={"section"}>
      <Container maxWidth="lg">
        <Box my={6}>
          {/* Blog Image */}
          <Box mb={4} display="flex" justifyContent="center">
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "400px",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </Box>

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

          <Typography
            variant="h4"
            component="h1"
            fontWeight={"bold"}
            mb={3}
            textAlign="center"
          >
            {blog.title}
          </Typography>

          <Typography my={4} component="p" color="#666" fontSize="1.2rem">
            Các chuyên gia thời trang nói rằng có vẻ đẹp nằm ở sự đơn giản. Và
            họ đã đúng.
          </Typography>

          <Typography my={4} component="p" color="#666" fontSize="1.2rem">
            Bí mật để các quý ông luôn luôn trông tuyệt vời là giữ cho trang
            phục đơn giản. Mặc trang phục được tạo ra với những điều cơ bản hàng
            ngày. Chẳng hạn như áo phông nam cổ tròn trắng, màu đen hoặc áo jean
            xanh, quần jean nam, quần kaki…vv
          </Typography>

          <Typography my={4} component="p" color="#666" fontSize="1.2rem">
            Fashion Store giúp bạn cách xây dựng tủ quần áo thời gian với những
            điều cơ bản để kết phù hợp với nhau trong hướng dẫn tủ quần áo của
            shop.
          </Typography>

          <Typography my={4} component="p" color="#666" fontSize="1.2rem">
            Để bạn có thể tạo ra các ý tưởng trang phục tuyệt vời với những điều
            cần thiết đơn giản hàng ngày, Nam Fashion đã khảo sát 7 mẫu quần áo
            nam cho các chàng từ tài khoản Instagram của bloger thời trang. Điều
            tuyệt vời về các trang phục này là bạn sẽ luôn luôn trông bảnh bao,
            phong cách cho dù các vấn đề hình thể hay làn da của bạn.
          </Typography>

          <Typography my={4} component="p" color="#666" fontSize="1.2rem">
            Sẵn sàng để xem thời trang nam phong cách đường phố hàng ngày? Cuộn
            xuống dưới đây để kiểm tra 7 trang phục hàng ngày luôn làm bạn bảnh
            bao.
          </Typography>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              1. Áo sơ mi trắng ngắn tay kết hợp với quần kaki đen và đôi giày
              trắng
            </Typography>

            <img
              src={outfit_1}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              2. Áo thun trắng có họa tiết đơn giản nổi bật với quần kaki nam
              đen ống côn
            </Typography>

            <img
              src={outfit_2}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              3. Áo thun trắng trơn với quần đen
            </Typography>

            <img
              src={outfit_3}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              4. Áo phông đen nam – quần kaki đen
            </Typography>

            <img
              src={outfit_4}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              5. Áo phông sẫm màu với quần jean mài màu xanh
            </Typography>

            <img
              src={outfit_5}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              6. Áo phông màu với quần kaki đen
            </Typography>

            <img
              src={outfit_6}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>

          <Box>
            <Typography my={4} variant="h5" fontWeight={"bold"}>
              7. Áo sơ mi nam màu nhạt và quần kaki/ jean sẫm màu
            </Typography>

            <img
              src={outfit_7}
              alt="outfit-1"
              style={{ display: "block", margin: "auto" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetail;
