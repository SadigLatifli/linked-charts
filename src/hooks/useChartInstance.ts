import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const useChartInstance = (containerRef: React.RefObject<HTMLDivElement>) => {
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (containerRef.current && !chartInstance.current) {
      chartInstance.current = echarts.init(containerRef.current);
    }

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [containerRef]);

  return chartInstance;
};