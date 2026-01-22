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

const mapAccordions = [
  {
    id: 1,
    question: "Chính sách hoàn trả của bạn là gì?",
    answer:
      "Nếu bạn không hài lòng với giao dịch mua hàng của mình, chúng tôi chấp nhận trả lại trong vòng 30 ngày kể từ ngày giao hàng. Để bắt đầu trả lại, vui lòng gửi email chúng tôi tại cskh@fashionstore.site.name.vn với số đơn đặt hàng của bạn và giải thích ngắn gọn lý do tại sao bạn trả lại hàng.",
  },
  {
    id: 2,
    question: "Làm cách nào để theo dõi đơn hàng của tôi?",
    answer:
      "Bạn có thể theo dõi đơn hàng của mình bằng cách nhấp vào liên kết theo dõi trong email xác nhận vận chuyển hoặc bằng cách đăng nhập vào tài khoản của bạn trên trang web của chúng tôi và xem chi tiết đơn hàng.",
  },
  {
    id: 3,
    question: "Tôi có thể thay đổi hoặc hủy đơn hàng của mình không?",
    answer:
      "Thật không may, một khi đơn hàng đã được đặt, chúng tôi không thể thực hiện thay đổi hoặc hủy bỏ. Nếu bạn không còn muốn các mục bạn đã đặt hàng, bạn có thể trả lại hàng để được hoàn tiền trong vòng 30 ngày của việc giao hàng.",
  },
  {
    id: 4,
    question: "Bạn có cung cấp vận chuyển quốc tế?",
    answer:
      "Hiện tại, chúng tôi chỉ cung cấp dịch vụ vận chuyển trong phạm vi Việt Nam.",
  },
  {
    id: 5,
    question: "Những phương thức thanh toán nào bạn chấp nhận?",
    answer: "Chúng tôi chỉ chấp nhận phương thức thanh toán VNPAY và tiền mặt.",
  },
];

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
          <Typography
            variant="h4"
            fontWeight={"bold"}
            fontSize={{
              xl: "1.6rem",
              lg: "1.6rem",
              md: "1.4rem",
              sm: "1.2rem",
              xs: "1.2rem",
            }}
            my={6}
          >
            Câu hỏi thường gặp ?
          </Typography>

          <Box>
            {mapAccordions.map((accordion) => (
              <Accordion sx={{ my: 4 }} key={accordion.id}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel-${accordion.id}-content`}
                  id={`panel-${accordion.id}-header`}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontSize={{
                      xl: "1.4rem",
                      lg: "1.4rem",
                      md: "1.4rem",
                      sm: "1.2rem",
                      xs: "1rem",
                    }}
                  >
                    {accordion.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    color="#666"
                    fontSize={{ xs: "1rem", sm: "1rem", md: "1.2rem" }}
                  >
                    {accordion.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Help;
