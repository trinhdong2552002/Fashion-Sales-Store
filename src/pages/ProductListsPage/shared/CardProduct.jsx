import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ product }) => {
  const navigate = useNavigate();

  const mainImage =
    product.images && product.images.length > 0
      ? [...product.images].sort((a, b) => a.id - b.id)[0]
      : null;

  return (
    <Card
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
          transition: "all 0.3s ease",
        },
      }}
      onClick={() => navigate(`/product-details/${product.id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={mainImage ? mainImage.imageUrl : ""}
          alt={product.name}
          width={"100%"}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
            height: {
              xs: 200,
              sm: 250,
              md: 300,
              lg: 300,
              xl: 300,
            },
          }}
        />
        <CardContent>
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{
              textAlign: "center",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              minHeight: "3rem",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            mt={1}
            fontWeight={"bold"}
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.2rem",
              },
            }}
          >
            {product.price?.toLocaleString("vi-VN")}đ
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
