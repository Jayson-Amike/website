import React from 'react';

const AdminDashboard = () => {
  // Mock data for the stats
  const stats = [
    { label: "Total Sales", value: "$24,500", color: "#4caf50" },
    { label: "New Users", value: "120", color: "#2196f3" },
    { label: "Pending Orders", value: "18", color: "#ff9800" },
    { label: "Products", value: "450", color: "#f44336" },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h2>Admin Overview</h2>
      
      {/* Stat Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '30px' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderLeft: `5px solid ${stat.color}`
          }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{stat.label}</p>
            <h3 style={{ margin: '10px 0 0 0', fontSize: '24px' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Recent Transactions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '12px' }}>Order ID</th>
              <th style={{ padding: '12px' }}>Customer</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px' }}>#1024</td>
              <td style={{ padding: '12px' }}>John Doe</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'green' }}>Completed</span></td>
              <td style={{ padding: '12px' }}>$120.00</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>#1025</td>
              <td style={{ padding: '12px' }}>Jane Smith</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'orange' }}>Pending</span></td>
              <td style={{ padding: '12px' }}>$45.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;