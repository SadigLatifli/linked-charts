/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const useEchart = (getOption: () => echarts.EChartsOption) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(getOption());

      const handleResize = () => chartInstance.current?.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        chartInstance.current?.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);


  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(getOption(), {
        notMerge: false,
        lazyUpdate: true
      });
    }
  }, [getOption]);

  return { chartRef, chartInstance };
};
