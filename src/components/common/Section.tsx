import React from 'react';
import styled from 'styled-components';

import { P, Button } from 'src/components/common';
import { GREY } from 'src/constant';

interface ISectionProps {
  type?: 'primary' | 'secondary';
  title: string;
  handleEdit?: () => void;
  children?: React.ReactNode;
}

function Section({ type = 'primary', title, handleEdit, children }: ISectionProps) {
  return (
    <Wrapper>
      <Header>
        <P fontSize={type === 'primary' ? '2.2rem' : '1.8rem'} fontWeight={type === 'primary' ? 500 : ''}>
          {title}
        </P>
        {handleEdit && <Button buttonType="text" text="수정" color="GREY" onClick={handleEdit} />}
      </Header>
      {children}
    </Wrapper>
  );
}

export default Section;

const Wrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${GREY[300]};
  margin-bottom: 1.2rem;
`;
