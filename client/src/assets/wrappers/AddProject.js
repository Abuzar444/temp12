import styled from "styled-components";

const Wrapper = styled.section`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .parent {
    grid-column: 1/-1;
    grid-row: 1;
  }
  .child {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .form {
    max-width: 100%;
  }

  .multi {
    height: 150px;
    resize: none;
  }
  .comments {
    height: 80px;
    resize: none;
  }

  .form-center {
    padding-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }

  .form-center-multi {
    padding-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }

  .cards {
    background-color: #3f3f3f;
    padding: 10px;
  }
`;

export default Wrapper;
