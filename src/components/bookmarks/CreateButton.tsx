import React from 'react';
import styled from 'styled-components';

import { Modal, Input, Textarea, IconButton } from 'src/components/common';

import { useBookmarkCreate } from 'src/lib/hooks/bookmarks';

export default function BookmarkCreateButton() {
  const { form, onChange, onSubmit, openModal, closeModal, isModalOpen } = useBookmarkCreate();
  const { url, memo } = form;

  return (
    <>
      <IconButton iconType="add" iconWidth="2.8rem" onClick={openModal} />
      {isModalOpen && (
        <StyledModal onClose={closeModal} onComplete={onSubmit} title="북마크 추가하기">
          <Input name="url" value={url} onChange={onChange} label="링크" placeholder="북마크할 링크를 입력해주세요" />
          <Textarea
            name="memo"
            value={memo}
            onChange={onChange}
            label="메모"
            placeholder="이 북마크와 관련된 메모를 입력해보세요"
          />
        </StyledModal>
      )}
    </>
  );
}

// eslint-disable-next-line react/jsx-props-no-spreading
const StyledModal = styled((props) => <Modal {...props} />)`
  padding: 2rem;
`;
