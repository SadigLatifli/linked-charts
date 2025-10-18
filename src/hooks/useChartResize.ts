import { useEffect } from 'react';
import * as echarts from 'echarts';


export const useChartResize = (chartInstances: React.RefObject<echarts.ECharts | null>[]) => {
  useEffect(() => {
    const handleResize = () => {
      chartInstances.forEach(instance => {
        instance.current?.resize();
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartInstances]);
};