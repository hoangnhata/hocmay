import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  LocalHospital,
  Assessment,
  Timeline,
} from "@mui/icons-material";

function StatisticsPanel() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    mostRecognized: null,
    categories: {},
  });

  useEffect(() => {
    const loadStats = () => {
      const saved = localStorage.getItem("recognition_history");
      if (saved) {
        try {
          const history = JSON.parse(saved);
          const today = new Date().toDateString();
          const todayCount = history.filter(
            (item) => new Date(item.timestamp).toDateString() === today
          ).length;

          const categories = {};
          history.forEach((item) => {
            const key = item.prediction_vi;
            categories[key] = (categories[key] || 0) + 1;
          });

          const mostRecognized = Object.entries(categories).reduce(
            (a, b) => (categories[a[0]] > categories[b[0]] ? a : b),
            ["", 0]
          );

          setStats({
            total: history.length,
            today: todayCount,
            mostRecognized: mostRecognized[0] || null,
            categories,
          });
        } catch (e) {
          console.error("Error loading stats:", e);
        }
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Assessment color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Thống kê
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card
            sx={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Timeline color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Tổng số lần
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <TrendingUp color="secondary" />
                <Typography variant="body2" color="text.secondary">
                  Hôm nay
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "secondary.main" }}>
                {stats.today}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {stats.mostRecognized && (
          <Grid item xs={12}>
            <Card
              sx={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LocalHospital color="success" />
                  <Typography variant="body2" color="text.secondary">
                    Nhận diện nhiều nhất
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "success.main" }}>
                  {stats.mostRecognized}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {stats.categories[stats.mostRecognized]} lần
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default StatisticsPanel;

