import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 940px;
  max-width: 90vw;
  margin: 2rem auto;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    aside {
      nav {
        display: flex;
      }
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
  font-weight: bold;
  color: #fff;
`;

export const MeetupContent = styled.main`
  > header {
    a {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.25rem;
      border-radius: 0.25rem;
      font-weight: bold;
      font-size: 1rem;
      color: #fff;
      + button {
        margin-left: 1rem;
      }
      svg {
        margin-right: 0.5rem;
      }
      background-color: #4dbaf9;
      &:hover {
        background-color: ${darken(0.1, '#4dbaf9')};
      }
      /* Efeito hover - Um <Link> no dashboard também usa o efeito. */
      position: relative;
      overflow: hidden;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.1);
      }
      &:hover {
        &:after {
          width: 120%;
          padding-top: 120%;
          opacity: 0;
          transition: all 0.5s ease-out;
        }
      }
    }
  }
  img {
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    object-fit: cover;
    height: 300px;
    width: 100%;
  }
  p {
    white-space: pre;
  }
  p + p {
    margin-top: 2rem;
  }
  footer {
    margin-top: 2rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    display: flex;
    time {
      margin-right: 2rem;
    }
    time,
    address {
      display: flex;
      align-items: center;
    }
    svg {
      margin-right: 0.5rem;
    }
  }
`;
