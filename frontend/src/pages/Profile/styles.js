import styled from 'styled-components';

export const Container = styled.div`
  width: 940px;
  max-width: 90vw;
  margin: 2rem auto;
  header {
    margin-bottom: 1rem;
    nav {
      a {
        font-size: 0.625rem;
      }
    }
  }
  form {
    input {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 1rem;
      margin-bottom: 1rem;
      padding: 0.75rem 1.25rem;
      border-radius: 0.25rem;
      color: white;
    }
    hr {
      border: 0;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.1);
      margin: 0.625rem 0 1.25rem;
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
  svg {
    margin-right: 0.5rem;
  }
`;
