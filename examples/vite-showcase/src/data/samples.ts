/**
 * Sample data shared across showcase pages.
 *
 * These objects are intentionally small but realistic so every component
 * can render without crashing while still looking like a meaningful demo.
 */

export const sampleProduct = {
  id: 'p-001',
  title: 'Aurora Wireless Headphones',
  price: 249.99,
  image: 'https://placehold.co/400x400/0b0b0c/ffffff?text=Aurora',
  description: 'Premium noise cancelling, 40h battery life.',
};

export const sampleProducts = [
  sampleProduct,
  {
    id: 'p-002',
    title: 'Nimbus Smart Speaker',
    price: 129.0,
    image: 'https://placehold.co/400x400/0b0b0c/ffffff?text=Nimbus',
  },
  {
    id: 'p-003',
    title: 'Lumen LED Desk Lamp',
    price: 79.5,
    image: 'https://placehold.co/400x400/0b0b0c/ffffff?text=Lumen',
  },
];

export const sampleCartItems = [
  { id: 'p-001', title: 'Aurora Wireless Headphones', price: 249.99, qty: 1, image: '' },
  { id: 'p-002', title: 'Nimbus Smart Speaker', price: 129.0, qty: 2, image: '' },
];

export const sampleBlogPost = {
  id: 'post-001',
  title: 'Building accessible component libraries in 2026',
  slug: 'accessible-libraries-2026',
  excerpt:
    'A practical guide to designing primitives that scale across teams while staying WCAG-compliant.',
  coverImage: 'https://placehold.co/800x400/0b0b0c/ffffff?text=Cover',
  author: { name: 'Adnan Mukati', avatar: 'https://placehold.co/64x64/0b0b0c/ffffff?text=A' },
  date: '2026-04-12',
  readTime: '7 min read',
  tags: ['accessibility', 'design-systems', 'react'],
  category: 'Engineering',
};

export const sampleBlogPosts = [
  sampleBlogPost,
  {
    id: 'post-002',
    title: 'Theming patterns that scale',
    slug: 'theming-patterns',
    excerpt: 'Token-driven theming without runtime overhead.',
    date: '2026-03-22',
    readTime: '5 min read',
  },
  {
    id: 'post-003',
    title: 'Server components in practice',
    slug: 'server-components',
    excerpt: 'Real-world patterns from a production app.',
    date: '2026-02-08',
    readTime: '9 min read',
  },
];

export const samplePlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      { label: 'Up to 3 projects', included: true },
      { label: 'Community support', included: true },
      { label: 'Custom domains', included: false },
    ],
    cta: 'Start free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    highlighted: true,
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom domains', included: true },
    ],
    cta: 'Go Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Dedicated CSM', included: true },
      { label: 'SLA & audit logs', included: true },
    ],
    cta: 'Talk to sales',
  },
];

export const sampleNavLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
];

export const sampleTeamMembers = [
  { id: 'm1', name: 'Ada Lovelace', role: 'Engineering Lead', bio: 'Architecting the future.' },
  { id: 'm2', name: 'Alan Turing', role: 'Principal Researcher', bio: 'Pattern matchmaker.' },
  { id: 'm3', name: 'Grace Hopper', role: 'Compiler Architect', bio: 'A nanosecond at a time.' },
];

export const sampleStats = [
  { id: 's1', value: '12k', label: 'Customers', suffix: '+' },
  { id: 's2', value: '99.99', label: 'Uptime', suffix: '%' },
  { id: 's3', value: '40', label: 'Countries' },
  { id: 's4', value: '4.9', label: 'CSAT', suffix: '/5' },
];

export const sampleTestimonials = [
  {
    id: 't1',
    quote: 'Saved us months of foundational design work.',
    author: 'Priya Patel',
    role: 'CTO, Lumen',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'Finally, a design system that respects accessibility by default.',
    author: 'Jordan Kim',
    role: 'Head of Design, Nimbus',
    rating: 5,
  },
];

export const sampleFAQ = [
  {
    id: 'q1',
    question: 'Is this design system tree-shakable?',
    answer: 'Yes. Each component is a named export and the package is sideEffects:false.',
  },
  {
    id: 'q2',
    question: 'Does it support React Server Components?',
    answer: 'Yes. Import from @electroplix/components/config for server-safe utilities.',
  },
  {
    id: 'q3',
    question: 'Can I theme components at runtime?',
    answer: 'Wrap your tree in <ElectroplixProvider config={...}> and override any token.',
  },
];

export const sampleSearchItems = [
  { id: 's1', title: 'Getting started', snippet: 'Install via pnpm, import a component, ship.' },
  { id: 's2', title: 'Theming guide', snippet: 'Override tokens with the provider.' },
  { id: 's3', title: 'API reference', snippet: 'Every prop documented per component.' },
];

export const sampleFacets = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { id: 'docs', label: 'Documentation' },
      { id: 'guides', label: 'Guides' },
      { id: 'api', label: 'API' },
    ],
  },
  {
    id: 'level',
    name: 'Level',
    options: [
      { id: 'beginner', label: 'Beginner' },
      { id: 'advanced', label: 'Advanced' },
    ],
  },
];

export const sampleTableRows = [
  { id: 1, name: 'Alice Chen', role: 'Engineer', joined: '2024-01-12' },
  { id: 2, name: 'Bruno Costa', role: 'Designer', joined: '2024-03-04' },
  { id: 3, name: 'Camila Diaz', role: 'PM', joined: '2024-06-22' },
];

export const sampleGalleryItems = [
  { id: 'g1', src: 'https://placehold.co/300x200/0b0b0c/ffffff?text=One', alt: 'One' },
  { id: 'g2', src: 'https://placehold.co/300x200/8B5CF6/ffffff?text=Two', alt: 'Two' },
  { id: 'g3', src: 'https://placehold.co/300x200/2563eb/ffffff?text=Three', alt: 'Three' },
  { id: 'g4', src: 'https://placehold.co/300x200/16a34a/ffffff?text=Four', alt: 'Four' },
];

export const sampleTimeline = [
  {
    id: 'e1',
    title: 'Project kickoff',
    description: 'Initial scoping and team alignment.',
    date: 'Jan 2026',
  },
  {
    id: 'e2',
    title: 'Design tokens locked',
    description: 'Token system reviewed and approved.',
    date: 'Feb 2026',
  },
  { id: 'e3', title: 'v1 GA', description: 'Public release of stable v1.', date: 'Apr 2026' },
];

export const sampleHowItWorksSteps = [
  { id: 'h1', title: 'Install', description: 'pnpm add @electroplix/components', icon: 'download' },
  { id: 'h2', title: 'Configure', description: 'Wrap with ElectroplixProvider', icon: 'settings' },
  { id: 'h3', title: 'Ship', description: 'Compose and deliver to users', icon: 'check' },
];

export const sampleFeatures = [
  { id: 'f1', icon: 'zap', title: 'Fast', description: 'Tree-shakable ESM, zero runtime cost.' },
  {
    id: 'f2',
    icon: 'shield',
    title: 'Secure',
    description: 'Audited deps, SRI verified releases.',
  },
  {
    id: 'f3',
    icon: 'sparkles',
    title: 'Composable',
    description: '158 primitives across 18 categories.',
  },
];

export const sampleTrustBadges = [
  { id: 'b1', label: 'SOC 2 Type II', icon: 'shield' },
  { id: 'b2', label: 'GDPR Ready', icon: 'check' },
  { id: 'b3', label: '99.99% Uptime', icon: 'zap' },
];

export const sampleSettingsSections = [
  { id: 'general', label: 'General', icon: 'settings' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'billing', label: 'Billing', icon: 'credit-card' },
];

export const sampleReactions = [
  { id: 'r1', emoji: '👍', label: 'like', count: 42 },
  { id: 'r2', emoji: '🎉', label: 'celebrate', count: 17 },
  { id: 'r3', emoji: '❤️', label: 'love', count: 23 },
];

export const sampleSocialComments = [
  {
    id: 'c1',
    author: 'Maya Rao',
    content: 'This is exactly what we needed for our app rewrite!',
    timestamp: '2h ago',
  },
  {
    id: 'c2',
    author: 'Tomás Silva',
    content: 'The theming model is brilliant. Saved us hundreds of hours.',
    timestamp: '5h ago',
  },
];

export const sampleBlogComments = [
  {
    id: 'bc1',
    author: 'Eli Cohen',
    content: 'Loved the section on token contracts.',
    date: '2 days ago',
  },
];
