import type { CategoryData } from './types';

export const mockData: CategoryData[] = [
  {
    category: 'A',
    values: [
      { date: '2025-10-01', value: 10 },
      { date: '2025-10-02', value: 15 },
      { date: '2025-10-03', value: 12 }
    ]
  },
  {
    category: 'B',
    values: [
      { date: '2025-10-01', value: 8 },
      { date: '2025-10-02', value: 21 },
      { date: '2025-10-03', value: 16 }
    ]
  }
];