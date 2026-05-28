import {
  CommentsBox,
  FollowLike,
  ReactionsBar,
  ReviewsForm,
  SocialEmbed,
  SocialLoginButtons,
  SocialShareBar,
} from '@electroplix/components';
import { CategoryPage, ComponentDemo } from '../components/ShowcaseLayout';
import { sampleReactions, sampleSocialComments } from '../data/samples';

const noop = () => {};

export default function SocialPage() {
  return (
    <CategoryPage
      slug="social"
      title="Social"
      description="Share bars, social login, embeds, reactions, comments."
      componentCount={7}
    >
      <ComponentDemo name="SocialShareBar">
        <SocialShareBar
          url="https://electroplix.com"
          title="Electroplix Design System"
          networks={['twitter', 'facebook', 'linkedin', 'email', 'copy']}
        />
      </ComponentDemo>
      <ComponentDemo name="SocialLoginButtons">
        <SocialLoginButtons providers={['google', 'github', 'twitter']} onLogin={noop} />
      </ComponentDemo>
      <ComponentDemo name="SocialEmbed">
        <SocialEmbed type="twitter" url="https://twitter.com/electroplix/status/1" />
      </ComponentDemo>
      <ComponentDemo name="FollowLike">
        <FollowLike />
      </ComponentDemo>
      <ComponentDemo name="ReactionsBar">
        <ReactionsBar reactions={sampleReactions} onReact={noop} />
      </ComponentDemo>
      <ComponentDemo name="CommentsBox">
        <CommentsBox comments={sampleSocialComments} onSubmit={noop} title="Discussion" />
      </ComponentDemo>
      <ComponentDemo name="ReviewsForm">
        <ReviewsForm onSubmit={noop} />
      </ComponentDemo>
    </CategoryPage>
  );
}
