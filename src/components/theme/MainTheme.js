import { indigo } from '@material-ui/core/colors';
import {
    createMuiTheme
  } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: indigo[500],
        light:indigo[100]
      },

    },
  });
export default customTheme