import { useState, useEffect, useRef, useCallback } from "react";
import { mockData } from "@/utils/data";
import {
  getCategories,
  prepareDatasetSource,
  aggregateBarData,
} from "@/utils/dataTransform";
import {
  buildBarChartOption,
  buildLineChartOption,
} from "@/utils/chartOptions";
import { useChartInstance } from "@/hooks/useChartInstance";
import { useChartResize } from "@/hooks/useChartResize";
import type { ChartClickParams } from "@/utils/types";
import "@/styles/dashboard.css";

const Dashboard = () => {
  
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  const barChartInstance = useChartInstance(
    barChartRef as React.RefObject<HTMLDivElement>
  );
  const lineChartInstance = useChartInstance(
    lineChartRef as React.RefObject<HTMLDivElement>
  );

  const categories = getCategories(mockData);
  const datasetSource = prepareDatasetSource(mockData);
  const barData = aggregateBarData(mockData, categories);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  useChartResize([barChartInstance, lineChartInstance]);

  const getBarOption = useCallback(
    () => buildBarChartOption(categories, barData, selectedCategory),
    [selectedCategory, categories, barData]
  );

  const getLineOption = useCallback(
    () => buildLineChartOption(datasetSource, selectedCategory),
    [selectedCategory, datasetSource]
  );

  useEffect(() => {
    if (barChartInstance.current && lineChartInstance.current) {
      barChartInstance.current.setOption(getBarOption(), true);
      lineChartInstance.current.setOption(getLineOption(), true);

      barChartInstance.current.on("click", (params: ChartClickParams) => {
        if (params.componentType === "series") {
          setSelectedCategory(params.name);
        }
      });
    }
  }, [barChartInstance, lineChartInstance, getBarOption, getLineOption]);

  useEffect(() => {
    if (lineChartInstance.current) {
      lineChartInstance.current.setOption(getLineOption(), {
        notMerge: false,
        lazyUpdate: true,
      });
    }
  }, [selectedCategory, getLineOption, lineChartInstance]);

  useEffect(() => {
    if (barChartInstance.current) {
      barChartInstance.current.setOption(getBarOption(), {
        notMerge: false,
        lazyUpdate: true,
      });
    }
  }, [selectedCategory, getBarOption, barChartInstance]);

  return (
    <div className="dashboard-container">
      <div className="chart-wrapper">
        <div ref={barChartRef} className="chart" />
        <div ref={lineChartRef} className="chart" />
      </div>
    </div>
  );
};

export default Dashboard;
