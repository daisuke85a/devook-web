import React from 'react';
import { useRecoilState } from 'recoil';

import { ResetButton } from 'src/components/common';
import { bookmarkListFilter, postListFilter } from 'src/lib/store';

import { PostType } from 'src/types';

interface IPostTagResetButtonProps {
  postType: PostType;
}

function PostTagResetButton({ postType }: IPostTagResetButtonProps) {
  const listFilter = postType === 'bookmark' ? bookmarkListFilter : postListFilter;
  const [filter, setFilter] = useRecoilState(listFilter);

  const resetFilter = () => {
    setFilter({ ...filter, tags: [] });
  };

  return <ResetButton onClick={resetFilter} />;
}

export default PostTagResetButton;
