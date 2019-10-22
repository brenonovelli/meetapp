import styled from 'styled-components';

export const Container = styled.div`
  width: 940px;
  max-width: 90vw;
  margin: 2rem auto;
  form {
    display: flex;
    flex-direction: column;

    input[type='text'],
    textarea {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 1rem;
      margin-bottom: 1rem;
      padding: 0.75rem 1.25rem;
      border-radius: 0.25rem;
      color: white;
      border-left: 2px solid transparent;
      transition: border 0.3s ease-in;
      &:focus {
        border-left: 2px solid #f94d6a;
      }
    }
    textarea {
      height: 200px;
    }
    > div {
      width: 100%;
    }
    > span {
      color: #f94d6a;
      align-self: flex-start;
      margin-top: -0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.1rem 0.25rem;
      border-radius: 0 0 0.25rem 0.25rem;
      font-size: 0.75rem;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #f94d6a;
  border-radius: 0.25rem;
  margin-left: auto;
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
