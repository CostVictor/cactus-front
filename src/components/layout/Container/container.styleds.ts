import { PropGridColumns } from "./container.types";
import styled from "styled-components";

export const GridContainer = styled.div<{ $columns: PropGridColumns }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, calc(100% / ${$columns}))`};
  gap: 0;

  ${({ $columns }) => $columns >= 4 && `
    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 25%);
    }
  `}

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, calc(100% / 3));
  }

  @media (max-width: 800px) {
      grid-template-columns: repeat(2, 50%);
  }

  @media (max-width: 500px) {
      grid-template-columns: repeat(1, 100%);
  }
`;
