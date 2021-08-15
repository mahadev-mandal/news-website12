import { Box, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import React from 'react'
import contact from '../../assets/images/contact.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]:{
            flexDirection:'row-reverse'
        }
    },
    img: {
        width:'100%',
        marginTop:10,
        [theme.breakpoints.up('md')]:{
            marginTop:'100px'
        }
    },
    textField: {
        marginTop: 15,
        textTransform: 'capitalize'
    }
}))

const textField = [
    { label: 'name', id: 'name' },
    { label: 'email', id: 'email' },
    { label: 'phone', id: 'phone' },
    { label: 'subject', id: 'subject' }
]


function ContactUs() {
    document.title='contact us'
    const classes = useStyles();
    return (
        <div>
            <Grid container className={classes.root} spacing={2}  >
                <Grid item xs={12} md={6}>
                    <img className={classes.img} src={contact} alt="contact vector" />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Box component={Paper} padding={2} marginBottom={2}>
                        <Typography variant='h4'
                            component='h1'
                            align='center'
                        >
                            Connect With Us
                        </Typography>
                        <Typography variant='body' component='p'>
                            We will love to respond to your queries and help you succeed. Feel free to get in touch with us.
                        </Typography>
                    </Box>
                    <Box component={Paper} padding={2}>
                        <Typography variant='h5' align='center' >
                            Send Your Request
                        </Typography>
                        {textField.map((field) => (
                            <TextField fullWidth
                                variant='outlined'
                                label={field.label}
                                id={field.id}
                                className={classes.textField}
                                autoComplete='off'
                            />
                        ))}
                        <Button fullWidth
                            variant='contained'
                            color='primary'
                            style={{ marginTop: 15 }}
                        >
                            Send
                        </Button>
                    </Box>
                    <Box component={Paper} padding={3} marginTop={1}>
                        <Typography variant='h4' align='center'>
                            Reach Us
                        </Typography>
                        <Typography variant='body' component='p'>
                            <span>Email:</span>&nbsp;&nbsp;&nbsp; <span>reachUs@emample.com</span><br />
                            <span>Phone:</span>&nbsp;&nbsp;&nbsp; <span>xxxxxxxxxx</span><br />
                            <span>Address:</span> <span></span>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContactUs
