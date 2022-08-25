import styled from "styled-components";
import { Colors } from "../Theme";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${Colors.White};
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  color: ${Colors.Primary};
  border: none;
  border-radius: ${(p) => (p.round ? "50px" : "5px")};
  width: max-content;
`;
export default Button;
