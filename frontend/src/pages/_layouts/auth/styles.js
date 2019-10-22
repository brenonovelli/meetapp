import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    input {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 0.25rem;
      height: 2.5rem;
      padding: 0 1rem;
      color: #fff;
      margin: 0 0 0.75rem;
    }

    button {
      padding: 0.75rem 1.25rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }

    span {
      color: #f94d6a;
      align-self: flex-end;
      margin-top: -0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.1rem 0.25rem;
      border-radius: 0 0 0.25rem 0.25rem;
      font-size: 0.75rem;
    }
  }
  a {
    color: rgba(255, 255, 255, 0.6);
    margin-top: 2rem;
    display: block;
    &:hover {
      text-decoration: underline;
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;
