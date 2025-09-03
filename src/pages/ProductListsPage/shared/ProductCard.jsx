import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" >
            {product.title}
          </Typography>
          <Typography gutterBottom variant="body2" >
            Rating: {product.rating}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textDecoration: "line-through",
                fontSize: "1rem",
              }}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                fontSize: "1.2rem",
                marginLeft: "10px",
              }}
            >
              ${product.price}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
