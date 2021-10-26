import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    return (
      <Typography variant="body2" style={{color:"white"}} align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://dipixels.com/" style={{color:"white"}}>
          DiPixel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
export default Copyright
