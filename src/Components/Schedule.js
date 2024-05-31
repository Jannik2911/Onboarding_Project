import * as React from "react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Container } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CustomizedTimeline from "./TimelineComponent";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Schedule = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout headerText={"Ablaufplan"}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Masonry columns={4} spacing={2}>
            {heights.map((height, index) => (
              <Item key={index} sx={{ height }} onClick={handleClick}>
                {index + 1}
              </Item>
            ))}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <CustomizedTimeline />
              </Box>
            </Modal>
          </Masonry>
        </Box>
      </Container>
    </Layout>
  );
};

export default Schedule;
