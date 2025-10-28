import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import "./index.css";
import { useEffect } from "react";
import { ExpandMore } from "@mui/icons-material";

const Help = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Box component={"section"}>
      <WallpaperRepresentative titleHeader="Trợ giúp" />

      <Container maxWidth="xl">
        <Box>
          <Typography variant="h4" fontWeight={"bold"} my={6}>
            Câu hỏi thường gặp ?
          </Typography>

          <Box>
            <Accordion sx={{ my: 4 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="refund-policy"
                id="refund-policy"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  Chính sách hoàn trả của bạn là gì?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: "#666", fontSize: "1.2rem" }}>
                Nếu bạn không hài lòng với giao dịch mua hàng của mình, chúng
                tôi chấp nhận trả lại trong vòng 30 ngày kể từ ngày giao hàng.
                Để bắt đầu trả lại, vui lòng gửi email chúng tôi tại
                cskh@fashionstore.site.name.vn với số đơn đặt hàng của bạn và
                giải thích ngắn gọn lý do tại sao bạn trả lại hàng.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ my: 4 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="order-tracking"
                id="order-tracking"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  Làm cách nào để theo dõi đơn hàng của tôi?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: "#666", fontSize: "1.2rem" }}>
                Bạn có thể theo dõi đơn hàng của mình bằng cách nhấp vào liên
                kết theo dõi trong email xác nhận vận chuyển hoặc bằng cách đăng
                nhập vào tài khoản của bạn trên trang web của chúng tôi và xem
                chi tiết đơn hàng.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ my: 4 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="cancel-order"
                id="cancel-order"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  Tôi có thể thay đổi hoặc hủy đơn hàng của mình không?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: "#666", fontSize: "1.2rem" }}>
                Thật không may, một khi đơn hàng đã được đặt, chúng tôi không
                thể thực hiện thay đổi hoặc hủy bỏ. Nếu bạn không còn muốn các
                mục bạn đã đặt hàng, bạn có thể trả lại hàng để được hoàn tiền
                trong vòng 30 ngày của việc giao hàng.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ my: 4 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="product-delivery"
                id="product-delivery"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  Bạn có cung cấp vận chuyển quốc tế?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: "#666", fontSize: "1.2rem" }}>
                Hiện tại, chúng tôi chỉ cung cấp dịch vụ vận chuyển trong phạm
                vi Việt Nam.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ my: 4 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="payment"
                id="payment"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  Những phương thức thanh toán nào bạn chấp nhận?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ color: "#666", fontSize: "1.2rem" }}>
                Chúng tôi chỉ chấp nhận phương thức thanh toán VNPAY và tiền
                mặt.
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Help;
