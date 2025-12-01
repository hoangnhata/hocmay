import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  History,
  Delete,
  Visibility,
  LocalHospital,
} from "@mui/icons-material";

function HistoryPanel({ history, onSelectHistory, onClearHistory }) {
  const [localHistory, setLocalHistory] = useState([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("recognition_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalHistory(parsed);
      } catch (e) {
        console.error("Error loading history:", e);
      }
    }
  }, [history]);

  useEffect(() => {
    if (history) {
      const newHistory = [
        {
          ...history,
          timestamp: new Date().toISOString(),
          id: Date.now(),
        },
        ...localHistory,
      ].slice(0, 10); // Keep only last 10
      setLocalHistory(newHistory);
      localStorage.setItem("recognition_history", JSON.stringify(newHistory));
    }
  }, [history]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = localHistory.filter((item) => item.id !== id);
    setLocalHistory(updated);
    localStorage.setItem("recognition_history", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setLocalHistory([]);
    localStorage.removeItem("recognition_history");
    if (onClearHistory) onClearHistory();
  };

  if (localHistory.length === 0) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <History color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Lịch sử nhận diện
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          Chưa có lịch sử nhận diện
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <History color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Lịch sử nhận diện
          </Typography>
          <Chip
            label={localHistory.length}
            size="small"
            color="primary"
            sx={{ ml: 1 }}
          />
        </Box>
        <Tooltip title="Xóa tất cả">
          <IconButton size="small" onClick={handleClearAll} color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <List sx={{ maxHeight: 300, overflow: "auto" }}>
        {localHistory.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              onClick={() => onSelectHistory && onSelectHistory(item)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&:hover": {
                  background: "rgba(99, 102, 241, 0.1)",
                },
              }}
            >
              <LocalHospital sx={{ mr: 2, color: "primary.main" }} />
              <ListItemText
                primary={item.prediction_vi}
                secondary={
                  new Date(item.timestamp).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />
              <IconButton
                size="small"
                onClick={(e) => handleDelete(item.id, e)}
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            </ListItem>
            {index < localHistory.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default HistoryPanel;

