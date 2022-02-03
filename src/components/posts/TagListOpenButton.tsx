import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IconButton, Modal } from 'src/components/common';
import { PostTagList } from 'src/components/posts';
import { WHITE, GREY } from 'src/constant';

import { usePostTagList } from 'src/lib/hooks';
import { isUserLoggedIn } from 'src/lib/store';
import { PostType } from 'src/types';

interface IPostTagListOpenButtonProps {
  postType?: PostType;
}

function PostTagListOpenButton({ postType = 'post' }: IPostTagListOpenButtonProps) {
  const { data, isModalOpen, setIsModalOpen, openModal, closeModal } = usePostTagList(postType);
  const isLoggedIn = useRecoilValue(isUserLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <>
      <Button onClick={openModal} />
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} onComplete={closeModal} title="태그 선택">
          <PostTagList isModalOpen={isModalOpen} data={data} postType={postType} />
        </Modal>
      )}
      {!isModalOpen && <PostTagList isModalOpen={isModalOpen} data={data} postType={postType} />}
    </>
  );
}

export default PostTagListOpenButton;

const Button = styled(IconButton).attrs({ type: 'primary', iconType: 'tag', iconWidth: '2.2rem' })`
  position: fixed;

  @media screen and (min-width: 1025px) {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    right: 2rem;
    bottom: 12.8rem;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 4rem;

  background-color: ${WHITE};
  border: none;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px, rgb(0 0 0 / 15%) 0px 8px 30px, rgb(255 255 255 / 20%) 0px 0px 0px 1px inset !important;

  transition: all 0.3s;
  :hover {
    cursor: pointer;
    background-color: ${GREY[200]};
  }
`;
