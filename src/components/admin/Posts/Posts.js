import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../../../controllers/fetchData';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import { TableContainer } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { styled } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

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

const useStyles = makeStyles((theme) => ({
    button: {
        marginBottom: theme.spacing(.3)
    },
    link: {
        textDecoration: 'none'
    }
}))

function Post() {

    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [post, setPost] = useState({})

    useEffect(() => {
        fetchData('/posts')
            .then((posts) => { setPosts(posts) })
            .catch((err) => { console.log(err) })
    }, [])

    const handleFetchData = () => {
        fetchData('/posts')
            .then((posts) => { setPosts(posts) })
            .catch((err) => { console.log(err) })
    }

    const dialogClose = () => {
        setDeleteDialogOpen(false)
    }

    const tableHead = ['s.n', 'title', 'category', 'images', 'author', 'date', 'about', 'delete', 'update']

    return (
        <Container>
            {deleteDialogOpen ? <DeleteDialog
                isOpen={deleteDialogOpen}
                dialogClose={dialogClose}
                handleFetchData={handleFetchData}
                dialogContent={post.title}
                path={'/admin/posts'}
                apiPath={`deletepost/${post._id}`}
            /> : null}
            <Link to='/admin/addpost' className={classes.link} >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                    Add Post
                </Button>
            </Link>
            <TableContainer component={Paper} >
                <Table aria-label="table" >
                    <TableHead>
                        <TableRow>
                            {tableHead.map((th) =>
                                <StyledTableCell key={th}>{th}</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post, index) =>
                            <StyledTableRow key={post._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell >
                                    <div style={{ height: '20px', overflow: 'auto' }} >{post.title}</div>
                                </TableCell>
                                <TableCell>{post.category}</TableCell>
                                <TableCell>...{post.images.substring(post.images.indexOf('_')+1)}</TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>{post.date}</TableCell>
                                <TableCell>
                                    <div style={{ height: '20px', overflow: 'auto' }} >{post.about}</div>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        style={{ color: 'red' }}
                                        aria-label="edit-icon-button"
                                        onClick={e => {
                                            setPost(post);
                                            setDeleteDialogOpen(true)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/editpost/${post._id}`}>
                                        <IconButton
                                            style={{ color: 'blue' }}
                                            aria-label="edit-icon-button"
                                            onClick={e => {
                                                setPost(post);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Post;