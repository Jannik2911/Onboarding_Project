import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

const Message = ({ message }) => {
  const [showTimestamp, setShowTimestamp] = useState(false);

  const handleMouseEnter = () => {
    setShowTimestamp(true);
  };

  const handleMouseLeave = () => {
    setShowTimestamp(false);
  };

  const formattedTimestamp = new Date(message.timestamp).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        sx={{
          p: 1,
          maxWidth: "70%",
          borderRadius: 16,
          boxShadow: 1,
          backgroundColor: message.sender === "user" ? "#CCCCCC" : "#FFFFFF",
          position: "relative",
          transition: "left 0.3s ease",
          left: showTimestamp ? "-30px" : "0", // Verringern des Abstands von der linken Seite
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
          {message.text}
        </Typography>
        {showTimestamp && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "50%",
              right: "-40px",
              transform: "translateY(-50%)",
            }}
          >
            {formattedTimestamp}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Message;
