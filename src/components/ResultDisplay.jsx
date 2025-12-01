import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  CheckCircle,
  LocalHospital,
  Info,
  Storage,
  CalendarToday,
  Warning,
  HowToReg,
  Download,
  Print,
  Share,
  Description,
  Assessment,
  History,
} from "@mui/icons-material";
import { medicalEquipmentInfo } from "../data/medicalEquipmentInfo";
import StatisticsPanel from "./StatisticsPanel";
import HistoryPanel from "./HistoryPanel";

function ResultDisplay({ result, onSelectHistory }) {
  const [openStats, setOpenStats] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  // Normalize the prediction name to match the key in medicalEquipmentInfo
  const normalizeName = (name) => {
    return name.toLowerCase().trim();
  };

  const equipmentInfo =
    medicalEquipmentInfo[normalizeName(result.prediction_en)] || null;

  const handleDownloadHTML = () => {
    // Create complete HTML document with inline CSS
    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thông tin vật tư y tế - ${result.prediction_vi}</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Roboto', 'Arial', sans-serif;
      padding: 40px;
      color: #1a1a1a;
      line-height: 1.6;
      background: #f5f7fa;
      max-width: 900px;
      margin: 0 auto;
    }
    .container {
      background: #ffffff;
      padding: 50px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 4px solid #6366f1;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
      padding: 30px;
      border-radius: 8px;
    }
    .title {
      font-size: 32px;
      font-weight: 700;
      color: #6366f1;
      margin-bottom: 15px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .equipment-name {
      font-size: 28px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 8px;
    }
    .equipment-name-en {
      font-size: 18px;
      color: #666;
      font-weight: 400;
      font-style: italic;
    }
    .section {
      margin-bottom: 40px;
      padding: 25px;
      background: #fafafa;
      border-radius: 8px;
      border-left: 4px solid #6366f1;
    }
    .section.warning-section {
      border-left-color: #f59e0b;
      background: #fffbf0;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #6366f1;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title::before {
      content: '';
      width: 6px;
      height: 24px;
      background: #6366f1;
      border-radius: 3px;
    }
    .section.warning-section .section-title {
      color: #f59e0b;
    }
    .section.warning-section .section-title::before {
      background: #f59e0b;
    }
    .list {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    .list-item {
      padding: 12px 0;
      padding-left: 40px;
      position: relative;
      font-size: 15px;
      line-height: 1.8;
      color: #333;
    }
    .list-item::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
      font-size: 20px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 50%;
    }
    .list-item.warning::before {
      content: '⚠';
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
    }
    .text-content {
      font-size: 15px;
      line-height: 1.8;
      color: #333;
      padding-left: 10px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 25px;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    .divider {
      height: 2px;
      background: linear-gradient(to right, transparent, #e0e0e0, transparent);
      margin: 30px 0;
    }
    @media print {
      body {
        background: #ffffff;
        padding: 20px;
      }
      .container {
        box-shadow: none;
        padding: 30px;
      }
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">THÔNG TIN VẬT TƯ Y TẾ</div>
      <div class="equipment-name">${result.prediction_vi}</div>
      <div class="equipment-name-en">(${result.prediction_en})</div>
    </div>
    ${
      equipmentInfo
        ? `
      <div class="section">
        <div class="section-title">CÁCH SỬ DỤNG</div>
        <ul class="list">
          ${equipmentInfo.usage
            .map((item) => `<li class="list-item">${item}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="divider"></div>
      <div class="section">
        <div class="section-title">CÁCH BẢO QUẢN</div>
        <ul class="list">
          ${equipmentInfo.storage
            .map((item) => `<li class="list-item">${item}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="divider"></div>
      <div class="section">
        <div class="section-title">HẠN SỬ DỤNG</div>
        <div class="text-content">${equipmentInfo.expiry}</div>
      </div>
      <div class="divider"></div>
      <div class="section warning-section">
        <div class="section-title">LƯU Ý</div>
        <ul class="list">
          ${equipmentInfo.notes
            .map((item) => `<li class="list-item warning">${item}</li>`)
            .join("")}
        </ul>
      </div>
    `
        : `
      <div class="section">
        <div class="text-content" style="padding-left: 0; text-align: center; color: #999;">
          Thông tin chi tiết về vật tư này đang được cập nhật...
        </div>
      </div>
    `
    }
    <div class="footer">
      Tạo từ: Nhận Diện Vật Tư Y Tế - ${new Date().toLocaleString("vi-VN")}
    </div>
  </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.prediction_en.replace(/\s+/g, "_")}_info.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printContent = document.createElement("div");
    printContent.innerHTML = `
      <h2>Thông tin vật tư y tế: ${result.prediction_vi}</h2>
      <h3>${result.prediction_en}</h3>
      ${
        equipmentInfo
          ? `
        <h4>Cách sử dụng:</h4>
        <ul>${equipmentInfo.usage.map((u) => `<li>${u}</li>`).join("")}</ul>
        <h4>Cách bảo quản:</h4>
        <ul>${equipmentInfo.storage.map((s) => `<li>${s}</li>`).join("")}</ul>
        <h4>Hạn sử dụng:</h4>
        <p>${equipmentInfo.expiry}</p>
        <h4>Lưu ý:</h4>
        <ul>${equipmentInfo.notes.map((n) => `<li>${n}</li>`).join("")}</ul>
      `
          : "<p>Thông tin đang được cập nhật...</p>"
      }
      <p><small>In từ: Nhận Diện Vật Tư Y Tế - ${new Date().toLocaleString(
        "vi-VN"
      )}</small></p>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Thông tin vật tư y tế</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6366f1; }
            h3 { color: #666; }
            ul { line-height: 1.8; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Nhận diện: ${result.prediction_vi}`,
      text: `Vật tư y tế: ${result.prediction_vi} (${result.prediction_en})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Nhận diện: ${result.prediction_vi} (${result.prediction_en})`
      );
      alert("Đã sao chép thông tin vào clipboard!");
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Thông tin vật tư y tế
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Thống kê">
            <IconButton
              size="small"
              onClick={() => setOpenStats(true)}
              sx={{
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                },
              }}
            >
              <Assessment fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Lịch sử">
            <IconButton
              size="small"
              onClick={() => setOpenHistory(true)}
              sx={{
                backgroundColor: "rgba(236, 72, 153, 0.1)",
                color: "secondary.main",
                "&:hover": {
                  backgroundColor: "rgba(236, 72, 153, 0.2)",
                },
              }}
            >
              <History fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Statistics Dialog */}
      <Dialog
        open={openStats}
        onClose={() => setOpenStats(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Assessment color="primary" />
          Thống kê nhận diện
        </DialogTitle>
        <DialogContent>
          <StatisticsPanel />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStats(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* History Dialog */}
      <Dialog
        open={openHistory}
        onClose={() => setOpenHistory(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <History color="secondary" />
          Lịch sử nhận diện
        </DialogTitle>
        <DialogContent>
          <HistoryPanel
            history={result}
            onSelectHistory={(item) => {
              if (onSelectHistory) {
                onSelectHistory(item);
              }
              setOpenHistory(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHistory(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Prediction Result */}
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mb: 2,
          background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
          color: "white",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <LocalHospital sx={{ fontSize: 32 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {result.prediction_vi}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {result.prediction_en}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Tooltip title="Tải xuống file HTML">
            <IconButton
              onClick={handleDownloadHTML}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Description />
            </IconButton>
          </Tooltip>
          <Tooltip title="In thông tin">
            <IconButton
              onClick={handlePrint}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chia sẻ">
            <IconButton
              onClick={handleShare}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Equipment Details */}
      {equipmentInfo ? (
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {/* Cách sử dụng */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
            >
              <HowToReg color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Cách sử dụng
              </Typography>
            </Box>
            <List dense>
              {equipmentInfo.usage.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Cách bảo quản */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
            >
              <Storage color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Cách bảo quản
              </Typography>
            </Box>
            <List dense>
              {equipmentInfo.storage.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle fontSize="small" color="info" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Hạn sử dụng */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <CalendarToday color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Hạn sử dụng
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
              {equipmentInfo.expiry}
            </Typography>
          </Paper>

          {/* Lưu ý */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
            >
              <Warning color="warning" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Lưu ý
              </Typography>
            </Box>
            <List dense>
              {equipmentInfo.notes.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Info fontSize="small" color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      ) : (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            Thông tin chi tiết về vật tư này đang được cập nhật...
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default ResultDisplay;
