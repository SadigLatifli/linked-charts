# 📊 React + ECharts Dashboard

This project renders two linked ECharts visualizations using React:
- **Bar Chart (Chart 1):** Shows aggregated category values for the current period.  
- **Line Chart (Chart 2):** Shows the time-series trend for the category selected in the bar chart.

When a user clicks a bar, the line chart updates smoothly to display that category’s time series.  
Both charts update within the same React view without being re-initialized, ensuring smooth transitions.

---

## ⚙️ ECharts Version

- **ECharts:** `^6.0.0` (latest version at the time of implementation)

---

## 📚 ECharts Features Used

| Feature | Used? | Description |
|----------|--------|-------------|
| `dataset` | ✅ | Used for managing raw data and filtering by selected category using a `filter` transform. |
| `transform` | ✅ | Applies filtering on the dataset for the selected category. |
| `universalTransition` | ❌ | Researched but not applied — see reasoning below. |
| `animationDurationUpdate` / `animationEasingUpdate` | ✅ | Used to create smooth transitions between data updates. |
| `tooltip`, `legend`, `responsive resize` | ✅ | Implemented for interactivity and usability. |

---

## 🧠 Design Decisions

I explored **ECharts’s `universalTransition`** API (introduced in v5.4) but decided **not to use it** in this case.  
The task requires rendering **two separate charts** (bar and line) within the same view, not morphing one chart type into another.  
`universalTransition` is primarily intended for **geometry morphing** between chart types (e.g., bar → line → pie) within a single chart instance.

Instead, I implemented **smooth dataset-based transitions** using:

```js
animationDurationUpdate: 500,
animationEasingUpdate: 'cubicOut'
```


## 🔄 How the Transitions Work

1. **Bar Click Interaction**
   - When a bar is clicked, the selected category name is stored in React state (`selectedCategory`).
   - The **bar chart** updates its colors and borders to highlight the selected bar.
   - The **line chart** filters its dataset to only include data points for that selected category.

2. **Smooth Update Logic**
   - The line chart is updated using:
     ```js
     chart.setOption(newOption, { notMerge: false, lazyUpdate: true });
     ```
     This tells ECharts to **merge** the new data instead of recreating the chart from scratch.
   - ECharts automatically animates changes between old and new data using:
     ```js
     animationDurationUpdate: 500,
     animationEasingUpdate: 'cubicOut'
     ```

3. **Result**
   - The transition between states is smooth — bars and lines update fluidly.
   - No chart instances are re-initialized or disposed; both charts persist during state updates.
   - This ensures a **seamless visual transition** without a hard re-render.



# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the app
http://localhost:5173/   # (if using Vite)
