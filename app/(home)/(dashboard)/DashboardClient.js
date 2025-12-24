"use client";

import { Row, Col } from "react-bootstrap";
import MetricCard from "./_components/MetricCard";
import StatusDonut from "./_charts/StatusDonut";
import MonthlyTrend from "./_charts/MonthlyTrend";
import AlertList from "./_components/AlertList";
import ActivityFeed from "./_components/ActivityFeed";
import KPIProgressCard from "./_components/KPIProgressCard";
import InfoTile from "./_components/InfoTile";
import CostBreakdownDonut from "./_charts/CostBreakdownDonut";
import TreadHealthGauge from "./_charts/TreadHealthGauge";
import TireAgeBar from "./_charts/TireAgeBar";

// Utility wrapper for equal height + full width
const EqualSizeCol = ({ children, ...props }) => (
  <Col {...props} className="d-flex align-items-stretch">
    <div className="w-100">{children}</div>
  </Col>
);

const SummaryCards = ({ summary }) => (
  <Row className="g-3 mb-4 w-100">
    {summary.map((item, i) => (
      <EqualSizeCol xl={2} lg={3} md={4} sm={6} key={i}>
        <MetricCard {...item} className="w-100 h-100" />
      </EqualSizeCol>
    ))}
  </Row>
);

const ChartSection = () => (
  <Row className="g-4 mb-4 w-100">
    <EqualSizeCol lg={6}>
      <StatusDonut className="w-100 h-100" />
    </EqualSizeCol>
    <EqualSizeCol lg={6}>
      <MonthlyTrend className="w-100 h-100" />
    </EqualSizeCol>
  </Row>
);

const AlertsAndActivity = () => (
  <Row className="g-4 mb-4 w-100">
    <EqualSizeCol lg={6}>
      <AlertList className="w-100 h-100" />
    </EqualSizeCol>
    <EqualSizeCol lg={6}>
      <ActivityFeed className="w-100 h-100" />
    </EqualSizeCol>
  </Row>
);

const KPITiles = () => (
  <Row className="g-3 mb-4 w-100">
    <EqualSizeCol md={3}>
      <KPIProgressCard title="Avg Tire Age" value={18} max={36} unit="months" variant="info" className="w-100 h-100" />
    </EqualSizeCol>
    <EqualSizeCol md={3}>
      <KPIProgressCard title="Avg Tread Depth" value={6.2} max={10} unit="mm" variant="success" className="w-100 h-100" />
    </EqualSizeCol>
    <EqualSizeCol md={3}>
      <InfoTile label="Tires Near EOL" value={92} icon="mdi-alert" color="danger" className="w-100 h-100" />
    </EqualSizeCol>
    <EqualSizeCol md={3}>
      <InfoTile label="Pending Inspections" value={41} icon="mdi-timer-sand" color="warning" className="w-100 h-100" />
    </EqualSizeCol>
  </Row>
);

const AdditionalCharts = () => (
  <>
    <Row className="g-4 mb-4 w-100">
      <EqualSizeCol lg={6}>
        <TireAgeBar className="w-100 h-100" />
      </EqualSizeCol>
      <EqualSizeCol lg={6}>
        <CostBreakdownDonut className="w-100 h-100" />
      </EqualSizeCol>
    </Row>

    <Row className="g-4 mb-4 w-100">
      <EqualSizeCol lg={6}>
        <TreadHealthGauge className="w-100 h-100" />
      </EqualSizeCol>
      <EqualSizeCol lg={6}>
        <ActivityFeed className="w-100 h-100" />
      </EqualSizeCol>
    </Row>
  </>
);

export default function DashboardClient({ data }) {
  return (
    <div className="w-100">
      <SummaryCards summary={data.summary} />
      <ChartSection />
      <AlertsAndActivity />
      <KPITiles />
      <AdditionalCharts />
    </div>
  );
}
