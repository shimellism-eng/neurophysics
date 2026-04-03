import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import './Dashboard.css';

export function Dashboard() {
  return (
    <ScreenWrapper className="dashboard">
      <div className="dashboard__inner">
        <span className="dashboard__icon">📊</span>
        <h1>Teacher Dashboard</h1>
        <p className="text-muted">Coming in Phase 2</p>
        <p className="dashboard__desc">
          Track student misconceptions, view diagnostic patterns, and see class-wide progress — all from one screen.
        </p>
      </div>
    </ScreenWrapper>
  );
}
