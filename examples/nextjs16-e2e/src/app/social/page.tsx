'use client';
import {
  CommentsBox,
  FollowLike,
  ReactionsBar,
  ReviewsForm,
  SocialEmbed,
  SocialLoginButtons,
  SocialShareBar,
} from '@electroplix/components';

export default function SocialTest() {
  return (
    <div>
      <h1>Social</h1>
      <SocialShareBar id="ss-1" data-testid="social-share" url="https://example.com" />
      <SocialLoginButtons id="sl-1" providers={['google', 'github']} />
      <SocialEmbed id="se-1" type="youtube" url="https://youtube.com/watch?v=dQw4w9WgXcQ" />
      <FollowLike id="fl-1" />
      <ReactionsBar id="rb-1" reactions={[{ emoji: '👍', label: 'like', count: 5 }]} />
      <CommentsBox id="cb-1" comments={[]} />
      <ReviewsForm id="rf-1" />
    </div>
  );
}
