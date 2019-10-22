import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 2rem;

  label {
    cursor: pointer;
    width: 100%;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s opacity ease-in-out;

    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgba(255, 255, 255, 0.3);
      transition: 0.5s color ease-in-out;
      position: relative;
      svg {
        margin-bottom: 0.5rem;
      }
      &::after {
        content: '';

        background: radial-gradient(
          farthest-side at 60% 55%,
          white,
          transparent
        );
        position: absolute;
        top: 4%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease-in;
      }
    }

    &:hover {
      span {
        color: #f94d6a;
      }
    }

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      background-color: rgba(0, 0, 0, 0.4);
      display: block;
    }

    input {
      display: none;
    }
  }
`;
