import React, { useEffect, useState } from 'react';
import fetchData from '../../../controllers/fetchData';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import AddUserDialog from '../AddUserDialog/AddUserDialog';
import EditUserDialog from '../EditUserDialog/EditUserDialog'
import { Button, IconButton } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { styled } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axiosInstance from '../../../utils/axios';

const StyledTableCell = styled(TableCell)({
    backgroundColor: 'black',
    color: 'white',
    textTransform: 'uppercase'
});

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow)

function Users() {
    const history = useHistory()
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
    const { pageno } = useParams()
    var [page, setPage] = useState(parseInt(pageno));
    const [pageCount, setPageCount] = useState(1);

    const noDocShow = 2;

    const dialogClose = () => {
        setDeleteDialogOpen(false);
        setAddUserDialogOpen(false);
        setEditUserDialogOpen(false);
    }
    useEffect(() => {
        axiosInstance.get('countusers')
            .then((res) => {
                setPageCount(Math.ceil(res.data.total / noDocShow))
            }).catch((err) => {
                console.log(err)
            })

    }, [users])
    useEffect(() => {
        fetchData(`/users/${page}`)
            .then((users) => {
                setUsers(users)
            }).catch((err) => { console.log(err) })
    }, [page])

    const handleFetchData = () => {
        fetchData(`/users/${page}`)
            .then((users) => {
                setUsers(users)
            }).catch((err) => {
                console.log(err)
            })
        if (users.length <= 1) {
            setPage(page - 1)
            history.push(`/admin/users/${page - 1}`)
        } else {
            history.push(`/admin/users/${page}`)
            setPage(page)
        }
    }

    const handleAddData = () => {
        
        fetchData(`/users/${page}`)
            .then((users) => {
                setUsers(users)
            }).catch((err) => {
                console.log(err)
            })
            if (users.length === noDocShow) {
                history.push(`/admin/users/${pageCount + 1}`)
                setPage(pageCount + 1)
            } else {
                history.push(`/admin/users/${pageCount}`)
                setPage(pageCount)
            }
    }
    const handlePageChange = (event, value) => {
        history.push(`/admin/users/${value}`)
        setPage(value)
    }

    const tableHead = ['name', 'username', 'role', 'delete', 'update']

    return (
        <Container>
            {deleteDialogOpen ? <DeleteDialog
                isOpen={deleteDialogOpen}
                id={user._id}
                dialogClose={dialogClose}
                handleFetchData={handleFetchData}
                dialogContent={user.user_name}
                apiPath={`/deleteuser/${user._id}`}
            /> : null}
            {addUserDialogOpen ? <AddUserDialog
                isOpen={addUserDialogOpen}
                dialogClose={dialogClose}
                handleFetchData={handleAddData}
            /> : null}
            {editUserDialogOpen ? <EditUserDialog
                isOpen={editUserDialogOpen}
                dialogClose={dialogClose}
                handleFetchData={handleFetchData}
                user={user}
            /> : null}
            <Button
                variant='contained'
                color='primary'
                style={{ marginBottom: 3 }}
                onClick={() => { setAddUserDialogOpen(true) }}
            >
                ADD USER
            </Button>
            <TableContainer component={Paper} >
                <Table aria-label="table" >
                    <TableHead>
                        <TableRow>
                            {tableHead.map((thd) =>
                                <StyledTableCell key={thd}>{thd}</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) =>
                            <StyledTableRow key={user.user_name}>
                                <TableCell>{user.fname}</TableCell>
                                <TableCell>{user.user_name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton
                                        style={{ color: 'red' }}
                                        aria-label="delete-icon-button"
                                        onClick={e => {
                                            setUser(user)
                                            setDeleteDialogOpen(true)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        style={{ color: 'blue' }}
                                        aria-label="edit-icon-button"
                                        onClick={e => {
                                            setUser(user);
                                            setEditUserDialogOpen(true)
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                style={{ marginTop: 20 }}
            />
        </Container>
    )
}

export default Users;