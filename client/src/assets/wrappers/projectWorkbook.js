import styled from "styled-components";

const Wrapper = styled.section`
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border: solid 1px #ddd;
    font-size: 10px;
    border-radius: 1px !important;
  }
  td {
    font-family: Arial, Helvetica, sans-serif;
    border: solid 1px #ddd;
    text-align: center;
    margin: 0;
    padding: 2px;
    border-collapse: collapse;
  }

  th {
    padding-top: 6px;
    padding-bottom: 6px;
    border: solid 1px #ddd;
    text-align: center;
    background-color: #2cb1bc;
    color: white;
    margin: 0;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  select {
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    font-size: 10px;
    outline: none;
  }
`;

export default Wrapper;
