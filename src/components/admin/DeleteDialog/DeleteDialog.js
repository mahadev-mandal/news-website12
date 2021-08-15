import React from 'react'
import deleteData from '../../../controllers/deleteData';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';

function DeleteDialog(props) {

    const handleClose = () => {
        props.dialogClose()
    };

    const handleDelete = () => {
        deleteData(props.apiPath)
            .then((res) => {
                console.log("user deleted sucessfully")
                props.handleFetchData();
                props.dialogClose();
            }).catch((err) => {
                console.log("user not deleted")
            })
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure want to delete <span style={{color:'red'}}> {props.dialogContent} </span> ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default React.memo(DeleteDialog);