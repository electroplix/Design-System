import { Button } from '@electroplix/components';

export default function ButtonsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Buttons Showcase</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button>Default Button</Button>
        <Button variant="primary" bgColor="#e94560" textColor="#fff">
          Primary Action
        </Button>
        <Button radius={0}>Square Button</Button>
        <Button radius={50}>Pill Button</Button>
        <Button shadow="0 4px 14px 0 rgba(0,118,255,0.39)">Shadow Style</Button>
      </div>
    </div>
  );
}

