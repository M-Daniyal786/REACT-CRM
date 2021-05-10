import styled from "styled-components";
import { TextField } from "@material-ui/core";

const styledTextField = styled(TextField)`
  ${({ theme }) => `
  .MuiOutlinedInput-root {  
    border-radius:50px
  }  
  `}
`;
export default styledTextField;

// cursor: pointer;
//   transition: ${theme.transitions.create(['background-color', 'transform'], {
//     duration: theme.transitions.duration.standard,
//   })};
//   &:hover {
//     transform: scale(1.08);
//   }
