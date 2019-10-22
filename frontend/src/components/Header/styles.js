import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const Content = styled.div`
  width: 940px;
  max-width: 90vw;
  padding: 1.625rem 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      max-height: 32px;
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;

  div {
    text-align: right;
    margin-right: 2rem;

    strong {
      display: block;
      font-size: 0.825rem;
    }

    a {
      display: block;
      margin-top: 0.125rem;
      font-size: 0.825rem;
      color: #999;
      &:hover {
        color: #d44059;
      }
    }
  }
  button {
    border-radius: 0.25rem;
    padding: 0.75rem 1.25rem;
    font-weight: bold;
    color: #fff;

    position: relative;
    overflow: hidden;
  }
`;
