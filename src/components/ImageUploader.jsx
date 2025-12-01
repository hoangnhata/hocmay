import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  alpha,
  Tabs,
  Tab,
  Fab,
} from "@mui/material";
import {
  CloudUpload,
  Image as ImageIcon,
  Close,
  CameraAlt,
  Camera,
  Refresh,
} from "@mui/icons-material";

function ImageUploader({ onImageUpload, disabled }) {
  const [tabValue, setTabValue] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [stream, setStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Auto upload when file is selected
  useEffect(() => {
    if (selectedFile && tabValue === 0) {
      // Small delay to show preview first
      const timer = setTimeout(() => {
        onImageUpload(selectedFile);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedFile, tabValue, onImageUpload]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      startCamera();
    } else {
      stopCamera();
    }
    // Clear preview when switching tabs
    setPreview(null);
    setSelectedFile(null);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
          // Auto upload after capture
          setTimeout(() => {
            onImageUpload(file);
          }, 300);
        }
      }, "image/jpeg", 0.95);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh hợp lệ!");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (tabValue === 1) {
      startCamera();
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Tải ảnh lên để nhận diện
      </Typography>

      {/* Tabs */}
      <Paper
        elevation={2}
        sx={{
          mb: 2,
          borderRadius: 2,
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
          }}
        >
          <Tab icon={<CloudUpload />} label="Chọn ảnh" iconPosition="start" />
          <Tab icon={<CameraAlt />} label="Chụp ảnh" iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Panel 0: File Upload */}
      {tabValue === 0 && (
        <>
          {!preview ? (
            <Paper
              ref={dropZoneRef}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClick}
              sx={{
                border: `3px dashed ${dragActive ? "primary.main" : "grey.300"}`,
                borderRadius: 4,
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: dragActive
                  ? alpha("#6366f1", 0.1)
                  : "transparent",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: dragActive
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: alpha("#6366f1", 0.1),
                  transform: "scale(1.02)",
                },
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: "none" }}
                disabled={disabled}
              />
              <CloudUpload
                sx={{
                  fontSize: 80,
                  color: "primary.main",
                  mb: 2,
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                  },
                }}
              />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Kéo thả ảnh vào đây hoặc click để chọn
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Hỗ trợ: JPG, PNG, GIF, WEBP
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<ImageIcon />}
                disabled={disabled}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5 0%, #db2777 100%)",
                  },
                }}
              >
                Chọn ảnh từ máy tính
              </Button>
            </Paper>
          ) : (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Paper
                elevation={4}
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  mb: 2,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleRemove}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Paper>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleRemove}
                  startIcon={<Close />}
                  disabled={disabled}
                >
                  Xóa ảnh
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClick}
                  disabled={disabled}
                >
                  Chọn ảnh khác
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}

      {/* Tab Panel 1: Camera */}
      {tabValue === 1 && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {!preview ? (
            <Paper
              elevation={4}
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
              }}
            >
              {isCameraActive ? (
                <>
                  <Box
                    component="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Fab
                    color="primary"
                    sx={{
                      position: "absolute",
                      bottom: 24,
                      background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4f46e5 0%, #db2777 100%)",
                      },
                    }}
                    onClick={capturePhoto}
                    disabled={disabled}
                  >
                    <Camera sx={{ fontSize: 32 }} />
                  </Fab>
                </>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <CameraAlt
                    sx={{
                      fontSize: 80,
                      color: "primary.main",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Camera đang được khởi động...
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={startCamera}
                    sx={{
                      mt: 2,
                      background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4f46e5 0%, #db2777 100%)",
                      },
                    }}
                  >
                    Bật camera
                  </Button>
                </Box>
              )}
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </Paper>
          ) : (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Paper
                elevation={4}
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  mb: 2,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleRemove}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Paper>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleRemove}
                  startIcon={<Close />}
                  disabled={disabled}
                >
                  Chụp lại
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ImageUploader;
