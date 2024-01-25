import styled from "styled-components";

const Wrapper = styled.section`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .child {
    grid-column: 1/-1;
    grid-row: 1;
  }
`;

export default Wrapper;
