'use client';
import {
  BlockquoteTestimonial,
  CalloutBox,
  HeadingSection,
  InlineCodeText,
  ParagraphBlock,
  RichMarkdown,
  TeamGrid,
} from '@electroplix/components';

export default function ContentTest() {
  return (
    <div>
      <h1>Content</h1>
      <BlockquoteTestimonial id="bt-1" data-testid="blockquote" quote="Great!" author="Alice" />
      <CalloutBox id="cb-1" variant="info" title="Info">
        Content
      </CalloutBox>
      <HeadingSection id="hs-1" title="Section Title" />
      <InlineCodeText id="ict-1">npm install</InlineCodeText>
      <ParagraphBlock id="pb-1">Some text</ParagraphBlock>
      <RichMarkdown id="rm-1" markdown="Hello **world**" />
      <TeamGrid id="tg-1" members={[{ id: '1', name: 'Alice', role: 'Engineer' }]} />
    </div>
  );
}
