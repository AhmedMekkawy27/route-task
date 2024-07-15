import { BarChart } from '@mui/x-charts/BarChart';

type BarChart = {
  xAxis?: string[];
  yAxis?: number[];
}
export default function BasicBars({ xAxis, yAxis }: BarChart) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxis }]}
      series={[{ data: yAxis }]}
      width={500}
      height={300}
      sx={{
        "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
          stroke: "#fff",
        },
        "& .MuiChartsAxis-left .MuiChartsAxis-line": {
          stroke: "#fff",
        },
        "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
          fill: "#fff",
        },
        "& .MuiChartsAxis-tick": {
          stroke: "#fff",
        }
      }}
    />
  );
}