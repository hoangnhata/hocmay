import React, { useState, useEffect } from "react";
import { Box, Chip, Typography, CircularProgress } from "@mui/material";
import { CheckCircle, Error as ErrorIcon } from "@mui/icons-material";
import axios from "axios";

function HealthCheck() {
  const [status, setStatus] = useState({
    loading: true,
    healthy: false,
    data: null,
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get("/api/health");
        setStatus({
          loading: false,
          healthy:
            response.data.status === "healthy" && response.data.model_loaded,
          data: response.data,
        });
      } catch (error) {
        setStatus({
          loading: false,
          healthy: false,
          data: null,
        });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (status.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 2,
        }}
      >
        <CircularProgress size={16} />
        <Typography variant="body2" color="text.secondary">
          Đang kiểm tra kết nối...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      <Chip
        icon={status.healthy ? <CheckCircle /> : <ErrorIcon />}
        label={status.healthy ? "API Sẵn sàng" : "API Không khả dụng"}
        color={status.healthy ? "success" : "error"}
        variant="outlined"
        sx={{ fontWeight: 600 }}
      />
      {status.data && (
        <>
          <Chip
            label={`${status.data.classes_count} lớp`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label={`Device: ${status.data.device.toUpperCase()}`}
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </>
      )}
    </Box>
  );
}

export default HealthCheck;
