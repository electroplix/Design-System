'use client';
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

export default function DataDisplayTest() {
  return (
    <div>
      <h1>Data Display</h1>
      <Badge id="b-1" data-testid="badge" label="New" />
      <BadgeGroup id="bg-1" badges={['A']} />
      <BarChart id="bc-1" data={[10, 20, 30]} />
      <CalendarGrid id="cg-1" year={2026} month={6} />
      <DataTable id="dt-1" aria-label="Users" columns={[]} rows={[]} />
      <LineChart id="lc-1" data={[10, 20, 30]} />
      <PieChart id="pc-1" data={[30, 40, 30]} />
      <ProgressBar id="pb-1" value={75} />
      <RatingStars id="rs-1" value={4.5} />
      <Sparkline id="sp-1" data={[1, 3, 2, 5, 4]} />
      <Timeline id="tl-1" items={[]} />
    </div>
  );
}
