import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  Paper,
  Fade,
  CircularProgress,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import { LocalHospital, Science } from "@mui/icons-material";
import ImageUploader from "./components/ImageUploader";
import ResultDisplay from "./components/ResultDisplay";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          padding: "10px 24px",
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/classify-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      setSnackbar({
        open: true,
        message: "Nhận diện thành công!",
        severity: "success",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Có lỗi xảy ra khi xử lý ảnh";
      setError(errorMessage);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 15s ease infinite",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          "@keyframes gradientShift": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },
        }}
      >
        {/* Header */}
          <Fade in timeout={800}>
            <Paper
              elevation={8}
              sx={{
                p: 2,
                mx: 2,
                mt: 2,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <LocalHospital
                  sx={{
                    fontSize: 36,
                    color: "primary.main",
                    animation: "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.1)" },
                    },
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                  }}
                >
                  Nhận Diện Vật Tư Y Tế
                </Typography>
                <Science
                  sx={{
                    fontSize: 36,
                    color: "secondary.main",
                    animation: "pulse 2s ease-in-out infinite",
                    animationDelay: "0.5s",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.1)" },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Fade>

          {/* Main Content - 2 Columns */}
        <Container maxWidth="xl" sx={{ flex: 1, py: 2, overflow: "hidden" }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            {/* Left Column - Image Upload */}
            <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex" }}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  width: "100%",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(99, 102, 241, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <CircularProgress size={60} thickness={4} />
                    <Typography
                      variant="h6"
                      sx={{ mt: 2, color: "text.secondary" }}
                    >
                      Đang xử lý ảnh...
                    </Typography>
                  </Box>
                ) : error ? (
                  <Alert severity="error" sx={{ borderRadius: 3 }}>
                    <Typography variant="body1" fontWeight={600}>
                      {error}
                    </Typography>
                  </Alert>
                ) : (
                  <ImageUploader
                    onImageUpload={handleImageUpload}
                    disabled={loading}
                  />
                )}
              </Paper>
            </Grid>

            {/* Right Column - Results */}
            <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex" }}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  width: "100%",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(236, 72, 153, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                {result && !loading ? (
                  <ResultDisplay
                    result={result}
                    onSelectHistory={(item) => {
                      setResult(item);
                      setSnackbar({
                        open: true,
                        message: "Đã tải lại kết quả từ lịch sử",
                        severity: "info",
                      });
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      flex: 1,
                      overflow: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                        flex: 1,
                      }}
                    >
                      <Typography variant="h6" align="center">
                        Kết quả nhận diện sẽ hiển thị ở đây
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
