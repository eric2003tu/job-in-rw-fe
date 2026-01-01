import React from 'react';
import Link from 'next/link';

const sidebarStyle: React.CSSProperties = {
  width: '240px',
  background: '#222',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 1rem',
  minHeight: '100vh',
  boxShadow: '2px 0 8px rgba(0,0,0,0.04)'
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  margin: '1rem 0',
  fontWeight: 500,
  fontSize: '1.1rem',
  transition: 'color 0.2s',
};

export default function Sidebar() {
  return (
    <aside style={sidebarStyle}>
      <h2 style={{ marginBottom: '2rem', fontWeight: 700, fontSize: '1.5rem' }}>Dashboard</h2>
      <Link href="/dashboard" style={linkStyle}>My Jobs</Link>
      <Link href="/dashboard/applications" style={linkStyle}>My Applications</Link>
      <Link href="/dashboard/post-job" style={linkStyle}>Post a Job</Link>
    </aside>
  );
}
