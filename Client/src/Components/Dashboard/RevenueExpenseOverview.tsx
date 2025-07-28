import { Box, Grid, Typography } from '@mui/material';
import DashboardCard from './DashboardCard'; // DashboardCard bileşenini içe aktar

/**
 * Gelir ve Gider metriklerini gösteren genel bakış bileşeni.
 * DashboardCard bileşenlerini kullanarak gelir, gider ve potansiyel olarak kar/zarar kartlarını görüntüler.
 */
function RevenueExpenseOverview() {
  // Şimdilik statik veriler kullanıyoruz. Gerçek uygulamada API'den çekilecek.
  const incomeData = {
    title: "Toplam Gelir",
    value: "₺150.000",
    percentageChange: 25,
    period: "Son 30 gün",
    chartData: [10, 20, 15, 25, 30, 28, 35] // Örnek grafik verisi
  };

  const expenseData = {
    title: "Toplam Gider",
    value: "₺75.000",
    percentageChange: -10,
    period: "Son 30 gün",
    chartData: [30, 60, 150, 20, 210, 18, 300] // Örnek grafik verisi
  };

  const profitLossData = {
    title: "Net Kar/Zarar",
    value: "₺75.000",
    percentageChange: 15, // (150.000 - 75.000) / (önceki kar)
    period: "Son 30 gün",
    chartData: [5, 10, 8, 12, 15, 10, 20] // Örnek grafik verisi
  };

  return (
    <Box sx={{ mb: 4 }}>

      <Grid container spacing={3} justifyContent="center"> {/* Kartları ortalamak için */}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard {...incomeData} />
        </Grid>


        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard {...expenseData} />
        </Grid>


        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard {...profitLossData} />
        </Grid>


      </Grid>
    </Box>
  );
}

export default RevenueExpenseOverview;
