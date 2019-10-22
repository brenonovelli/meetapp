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
    aside {
      nav {
        a {
          display: flex;
          align-items: center;
          border-radius: 0.25rem;
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          font-weight: bold;
          color: #fff;
          background-color: #f94d6a;
          border-radius: 0.25rem;
          transition: background-color 0.5s ease-in-out;
          &:hover {
            background-color: ${darken(0.05, '#f94d6a')};
          }

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

          svg {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;

export const MeetupList = styled.ul`
  margin: 2rem 0;
`;
export const Meetup = styled.li`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  transition: all 0.75s ease-in-out;
  cursor: pointer;
  + li {
    margin-top: 0.625rem;
  }
  a {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1.25rem 2rem;
  }
  strong {
    flex-grow: 1;
    font-size: 1.125rem;
  }
  time {
    color: rgba(255, 255, 255, 0.6);
    padding: 0 2.5rem;
    transition: all 0.5s ease-in-out;
  }
  svg {
    color: #fff;
    transition: all 0.5s ease-in-out;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
    svg {
      color: #f94d6a;
    }
    time {
      color: rgba(255, 255, 255, 0.75);
      padding: 0 2.5rem;
    }
  }
`;

export const Pagination = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  strong {
    flex-grow: 1;
    grid-column: 2;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const PreviousButton = styled.div`
  grid-column: 1;
  text-align: left;
`;
export const NextButton = styled.div`
  grid-column: 3;
  text-align: right;
`;
