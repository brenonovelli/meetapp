import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #f94d6a;
  border-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
  font-weight: bold;
  color: #fff;
  transition: opacity 0.3s ease-in-out;
  + button {
    margin-left: 1rem;
  }
  &:hover {
    opacity: 0.9;
  }
  svg {
    margin-right: 0.5rem;
  }
`;
