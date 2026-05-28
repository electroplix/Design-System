import {
  Badge,
  BadgeGroup,
  BarChart,
  CalendarGrid,
  DataTable,
  LineChart,
  PieChart,
  ProgressBar,
  RatingStars,
  Sparkline,
  Timeline,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleTableRows, sampleTimeline } from '../data/samples';

export default function DataDisplayPage() {
  return (
    <CategoryPage
      slug="data-display"
      title="Data Display"
      description="Charts, tables, badges, progress, calendars, timelines."
      componentCount={11}
    >
      <ComponentDemo name="Badge">
        <Badge label="New" />
      </ComponentDemo>
      <ComponentDemo name="BadgeGroup">
        <BadgeGroup badges={['Beta', 'Stable', 'Experimental']} />
      </ComponentDemo>
      <ComponentDemo name="BarChart">
        <BarChart
          data={[120, 200, 150, 80, 70, 110, 130]}
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        />
      </ComponentDemo>
      <ComponentDemo name="LineChart">
        <LineChart data={[10, 25, 14, 32, 28, 40]} labels={['J', 'F', 'M', 'A', 'M', 'J']} />
      </ComponentDemo>
      <ComponentDemo name="PieChart">
        <PieChart data={[40, 30, 20, 10]} labels={['A', 'B', 'C', 'D']} />
      </ComponentDemo>
      <ComponentDemo name="Sparkline">
        <Sparkline data={[3, 7, 4, 8, 5, 10, 8]} />
      </ComponentDemo>
      <ComponentDemo name="ProgressBar">
        <ProgressBar value={65} />
      </ComponentDemo>
      <ComponentDemo name="RatingStars">
        <RatingStars value={4.5} />
      </ComponentDemo>
      <ComponentDemo name="CalendarGrid">
        <CalendarGrid year={2026} month={5} />
      </ComponentDemo>
      <ComponentDemo name="DataTable">
        <DataTable
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'role', header: 'Role' },
            { key: 'joined', header: 'Joined' },
          ]}
          rows={sampleTableRows}
        />
      </ComponentDemo>
      <ComponentDemo name="Timeline">
        <Timeline items={sampleTimeline} />
      </ComponentDemo>
    </CategoryPage>
  );
}
