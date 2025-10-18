import type { CategoryData, BarDataItem } from './types';

export const getCategories = (data: CategoryData[]): string[] => {
    return data.map(d => d.category);
};

export const prepareDatasetSource = (data: CategoryData[]): (string | number)[][] => {
    return [
        ['category', 'date', 'value'],
        ...data.flatMap(d =>
            d.values.map(v => [d.category, v.date, v.value])
        )
    ];
};

export const aggregateBarData = (data: CategoryData[], categories: string[]): BarDataItem[] => {
    return categories.map(cat => {
        const catData = data.find(d => d.category === cat);
        const total = catData!.values.reduce((sum, v) => sum + v.value, 0);
        return { name: cat, value: total };
    });
};