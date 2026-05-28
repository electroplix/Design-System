import {
  BlockquoteTestimonial,
  CalloutBox,
  HeadingSection,
  InlineCodeText,
  ParagraphBlock,
  RichMarkdown,
  TeamGrid,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleTeamMembers } from '../data/samples';

export default function ContentPage() {
  return (
    <CategoryPage
      slug="content"
      title="Content"
      description="Long-form content blocks: callouts, headings, markdown, teams."
      componentCount={7}
    >
      <ComponentDemo name="BlockquoteTestimonial">
        <BlockquoteTestimonial
          quote="A design system that respects accessibility by default."
          author="Jordan Kim"
          role="Head of Design, Nimbus"
        />
      </ComponentDemo>
      <ComponentDemo name="CalloutBox">
        <CalloutBox variant="info" title="Note">
          Use callouts to highlight important information without breaking flow.
        </CalloutBox>
      </ComponentDemo>
      <ComponentDemo name="HeadingSection">
        <HeadingSection title="Section heading" subtitle="Optional supporting text." />
      </ComponentDemo>
      <ComponentDemo name="InlineCodeText">
        <p>
          Run <InlineCodeText>pnpm install</InlineCodeText> to begin.
        </p>
      </ComponentDemo>
      <ComponentDemo name="ParagraphBlock">
        <ParagraphBlock>
          Robust component primitives let teams compose interfaces quickly while staying consistent
          with the brand. Tokens drive every visual concern.
        </ParagraphBlock>
      </ComponentDemo>
      <ComponentDemo name="RichMarkdown">
        <RichMarkdown content={'# Hello\n\nThis is **markdown** rendered inline.'} />
      </ComponentDemo>
      <ComponentDemo name="TeamGrid">
        <TeamGrid members={sampleTeamMembers} title="Our team" columns={3} />
      </ComponentDemo>
    </CategoryPage>
  );
}
