import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@material-ui/core";
  import React from "react";
  import CloseIcon from '@material-ui/icons/Close';
  
  function PopupList(props) {
    const { title, children, openPopup, setOpenPopup } = props;
  
    return (
      <Dialog open={openPopup} maxWidth="lg">
        <DialogTitle>
          <div style={{ display: "flex" ,justifyContent:"flex-end"}}>
            {/* <Typography variant="h6" style={{flex:1}}>{title}</Typography> */}
            <button class="text-red-700" onClick={()=>{setOpenPopup(false)}}>
              <CloseIcon  />
            </button>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    );
  }
  
  export default PopupList;
  