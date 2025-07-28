import { Box, Paper, Typography, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'; // Recharts components

/**
 * Reusable card component for the Dashboard.
 * Displays a title, main value, percentage change, and a small chart.
 *
 * @param {string} title - Kartın başlığı (örn: "Gelir", "Gider").
 * @param {string} value - Kartın ana değeri (örn: "₺100.000", "500").
 * @param {number} percentageChange - Yüzde değişimi (örn: 25, -10). Pozitifse yeşil, negatifse kırmızı.
 * @param {string} period - Verinin kapsadığı dönem (örn: "Son 30 gün").
 * @param {number[]} [chartData] - Grafik için veri dizisi (sayı dizisi olmalı).
 */
function DashboardCard({ title, value, percentageChange, period, chartData }: {
  title: string;
  value: string;
  percentageChange: number;
  period: string;
  chartData?: number[];
}) {
  const theme = useTheme(); // Tema renklerine erişmek için

  // Yüzde değişimine göre renk ve ikon belirleme
  const isPositive = percentageChange >= 0;
  // Yüzde değişiminin arka plan rengi
  const percentageBgColor = isPositive ? 'hsl(120, 87%, 6%)' : 'hsl(0, 93%, 6%)';
  // Yüzde değişiminin metin rengi (arka plana göre daha koyu/açık)
  const percentageTextColor = isPositive ? 'hsl(120, 61%, 77%)' : 'hsl(0, 94%, 80%)';
  const percentBorderColor = isPositive ? 'hsl(120, 84%, 10%)' : 'hsl(0, 95%, 12%)';

  const ArrowIcon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;

  // Recharts için veri formatını dönüştürme
  const formattedChartData = chartData?.map((dataPoint, index) => ({
    name: `Day ${index + 1}`,
    value: dataPoint,
  }));

  return (
    <Paper
      elevation={6} // Daha belirgin bir gölge
      sx={{
        p: 2, // İç boşluk
        borderRadius: 2, // Köşe yuvarlaklığı
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 130, // Sabit yükseklik
        minWidth: 330, // Minimum genişlik
        maxWidth: 340, // Maksimum genişlik
        flexGrow: 1, // Esnek büyüme
        // Dark/Light temaya göre arka plan rengi ve kenarlık
        backgroundImage: 'none',
        bgcolor: (theme) => theme.palette.background.default,
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : theme.palette.divider}`,
        color: theme.palette.text.primary, // Metin rengini temadan al
      }}
    >
      {/* Başlık ve Yüzde Değişimi (üstte yan yana, başlık solda, badge sağda) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
          {title}
        </Typography>
        {/* Yüzde değişimi için badge görünümü */}
        <Box 
          sx={{ 
            display: 'inline-flex',
            alignItems: 'center', 
            border: `1px solid ${percentBorderColor}`,
            bgcolor: percentageBgColor,
            borderRadius: 30,
            px: 0.8,
            py: 0.2,
          }}
        >
          <ArrowIcon sx={{ color: percentageTextColor, mr: 0.2, fontSize: '0.9rem' }} />
          <Typography variant="caption" sx={{ color: percentageTextColor, fontWeight: 'bold' }}>
            {`${isPositive ? '+' : ''}${percentageChange}%`}
          </Typography>
        </Box>
      </Box>

      {/* Ana Değer ve Dönem (alt alta, sola hizalı) */}
      <Box sx={{ mt: 1, mb: 'auto', textAlign: 'left' }}> {/* <-- Buraya textAlign: 'left' eklendi */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {period}
        </Typography>
      </Box>

      {/* Grafik Alanı */}
      <Box 
        sx={{ 
          height: 60,
          borderRadius: 1, 
          mt: 'auto', // En alta it
          width: '100%',
        }}
      >
        {formattedChartData && formattedChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedChartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '4px',
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                }} 
                itemStyle={{ color: theme.palette.text.primary }}
                labelStyle={{ color: theme.palette.text.secondary }}
              />
              <Line 
                type="monotone"
                dataKey="value"
                stroke={isPositive ? 'rgb(82, 188, 82)' : 'rgb(194, 10, 10)'}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: theme.palette.background.paper, stroke: isPositive ? 'rgb(82, 188, 82)' : 'rgb(194, 10, 10)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            bgcolor: theme.palette.action.hover,
            borderRadius: 1,
          }}>
            <Typography variant="caption" color="text.secondary">
              Grafik Yok
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default DashboardCard;
