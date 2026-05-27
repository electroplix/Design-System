import React from 'react';
import { ElectroplixProvider, StaticHero, PrimaryNav } from '@electroplix/components';

function App() {
  return (
    <ElectroplixProvider>
      <PrimaryNav logo="ELECTROPLIX" />
      <StaticHero 
        title="Modern Component Library" 
        subtitle="Robust, Enterprise-Ready Design System"
        ctaText="Get Started"
      />
      <div style={{ padding: '2rem' }}>
        <h1>Electroplix Design System Showcase</h1>
        <p>Welcome to the component library showcase.</p>
      </div>
    </ElectroplixProvider>
  );
}

export default App;
