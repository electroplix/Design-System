import type { Meta, StoryObj } from '@storybook/react';
import { InlineCodeText } from './InlineCodeText';
import { RichMarkdown } from './RichMarkdown';
import { TeamGrid } from './TeamGrid';
import { BlockquoteTestimonial, CalloutBox, HeadingSection, ParagraphBlock } from './index';

const meta: Meta = {
  title: 'Components/Content',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const HeadingSectionStory: Story = {
  render: () => <HeadingSection title="Main Heading" subtitle="A brief subtitle" />,
};

export const ParagraphBlockStory: Story = {
  render: () => <ParagraphBlock text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />,
};

export const BlockquoteTestimonialStory: Story = {
  render: () => <BlockquoteTestimonial quote="This product changed my life!" author="Jane Doe" />,
};

export const CalloutBoxStory: Story = {
  render: () => (
    <CalloutBox variant="info" title="Note" message="This is an informational callout." />
  ),
};

export const InlineCodeTextStory: Story = {
  render: () => <InlineCodeText code="const x = 42;" />,
};

export const RichMarkdownStory: Story = {
  render: () => <RichMarkdown content="## Hello\n\nThis is **markdown** content." />,
};

export const TeamGridStory: Story = {
  render: () => (
    <TeamGrid
      members={[
        { name: 'Alice', role: 'Engineer', avatarSrc: 'https://placehold.co/100' },
        { name: 'Bob', role: 'Designer', avatarSrc: 'https://placehold.co/100' },
      ]}
    />
  ),
};
