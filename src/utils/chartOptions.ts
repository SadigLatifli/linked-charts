/* eslint-disable @typescript-eslint/no-explicit-any */
import * as echarts from 'echarts';
import type { BarDataItem } from './types';




export const buildBarChartOption = (
    categories: string[],
    barData: BarDataItem[],
    selectedCategory: string
): echarts.EChartsOption => ({
    // universalTransition: {
    //     enabled: false,
    //     animationDuration: 5000,
    //     animationEasing: 'bounceOut'
    // },

    tooltip: {
        trigger: 'item',
        // I searched a lot but couldn't find a better way to type this. There are github issues but no solutions.
        formatter: (params: any) => {
            return `${params.data.name}: ${params.data.value}`;
        }
    },
    xAxis: {
        type: 'category',
        data: categories
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type: 'bar',
            data: barData.map(d => ({
                name: d.name,
                value: d.value,
                itemStyle: {
                    color: d.name === selectedCategory ? '#91cc75' : '#5470c6',
                    borderColor: d.name === selectedCategory ? '#73c0de' : undefined,
                    borderWidth: d.name === selectedCategory ? 2 : 0
                }
            })),

            animationDurationUpdate: 500,
            animationEasingUpdate: 'cubicOut',
        }
    ]
});


export const buildLineChartOption = (
    datasetSource: (string | number)[][],
    selectedCategory: string
): echarts.EChartsOption => ({
    // universalTransition: {
    //     enabled: true,
    //     animationDuration: 500,
    //     animationEasing: 'cubicOut'
    // },
    tooltip: {
        trigger: 'axis',
        // formatter: `{c} `
        // formatter: function (params) {
        //     if (Array.isArray(params)) {
        //         params = params[0];
        //     }
        //     if (params.value && Array.isArray(params.value)) {
        //         return (
        //             params.name + ' : ' +
        //             params.value[2]
        //         );
        //     }
        //     return '';
        // },
        formatter: function (params) {
            console.log(params);
            if (Array.isArray(params)) {
                const selected = params.find(p => p.seriesName === selectedCategory);
                return selected ? `${selected.seriesName}: ${selected.value}` : '';
            }
            return '';
        },
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data: [selectedCategory],
        top: '5%'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        type: 'value'
    },
    dataset: [
        {
            source: datasetSource
        },
        {
            transform: {
                type: 'filter',
                config: { dimension: 'category', eq: selectedCategory }
            }
        }
    ],
    series: [
        {
            name: selectedCategory,
            type: 'line',
            datasetIndex: 1,
            encode: {
                x: 'date',
                y: 'value'
            },
            smooth: true,
            animationDuration: 500,
            animationEasing: 'cubicOut'
        }
    ]
});