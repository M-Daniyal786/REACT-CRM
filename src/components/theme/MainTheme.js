import { deepPurple } from '@material-ui/core/colors';
import {
    createMuiTheme
  } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: deepPurple[500],
      },
    },
  });
export default customTheme