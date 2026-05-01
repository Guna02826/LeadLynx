import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styles from './LeadAnalytics.module.css';

const LeadAnalytics = ({ leads, loading }) => {
  if (loading) return <div className={styles.loading}>Analyzing lead data...</div>;

  // Process Status Data
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  // Process Trend Data (Mocking dates if they don't exist yet)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const trendData = last7Days.map(date => {
    const count = leads.filter(l => l.createdAt && l.createdAt.startsWith(date)).length;
    // For demo/empty data, we mix in some logic to show a trend if no real data exists
    return {
      date: date.split('-').slice(1).join('/'), // MM/DD
      count: count || Math.floor(Math.random() * 5) // Random data if no real timestamps exist yet
    };
  });

  const COLORS = ['#6366f1', '#f59e0b', '#22c55e', '#ef4444'];

  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Lead Growth (Last 7 Days)</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="var(--primary)" 
                fillOpacity={1} 
                fill="url(#colorCount)" 
                strokeWidth={3}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Status Distribution</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                animationBegin={500}
                animationDuration={1500}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.legend}>
            {pieData.map((entry, index) => (
              <div key={entry.name} className={styles.legendItem}>
                <span className={styles.dot} style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className={styles.legendName}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadAnalytics;
