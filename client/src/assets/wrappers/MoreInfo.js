import styled from "styled-components";

const Wrapper = styled.article`
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .parent {
    grid-column: span 2;
    grid-row: 1;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
    gap: 1rem;
    max-width: 100%;
    width: 100%;
  }

  .parent2 {
    grid-column: span 2;
    grid-row: 1;

    gap: 1rem;
    max-width: 100%;
    width: 100%;
  }

  .child {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
  }

  .baby {
    display: grid;
    grid-row: 1;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
    grid-column: span 3;
  }

  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .content-center2 {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr 1fr;
    row-gap: 1.5rem;
    align-items: center;
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
