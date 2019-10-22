import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import { darken } from 'polished';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: linear-gradient(180deg, #22202C, #402845);
    color: #fff;
  }

  body, input, button, textarea {
    font: 16px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    color: #fff;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #f94d6a;
    }
  }

  ul{
    list-style: none;
  }

  button {
    cursor: pointer;
    color: #fff;
    background-color: #f94d6a;
    border-radius: 0.25rem;
    padding: 0.75rem 1.25rem;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.5s ease-in-out;
    &:hover {
      background-color: ${darken(0.05, '#f94d6a')};
    }
    svg {
      margin-right: 0.5rem;
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
`;
