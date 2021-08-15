import React from 'react'
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import aboutImg from '../../assets/images/about.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row-reverse',
        }
    },
    img: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginTop:70
        }
    },
    list: {
        '& li':{
            textTransform:'uppercase'
        }
    }
}))


function AboutUs() {
    document.title = "about us";
    const classes = useStyles();
    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12} md={6}>
                    <img className={classes.img} src={aboutImg} alt="about vector" />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Typography align='center'
                        variant='h4'
                        component='h1'
                    >
                        About us
                    </Typography>
                    <Box component={Paper} padding={2}>
                        <Typography variant='h5' >
                            Our skills
                        </Typography>
                        <ul className={classes.list}>
                            <li>html</li>
                            <li>css</li>
                            <li>javascript</li>
                            <li>bootstrap</li>
                            <li>material-ui</li>
                            <li>react.js</li>
                            <li>node.js</li>
                            <li>express.js</li>
                            <li>mongodb</li>
                        </ul>
                    </Box>
                    <Box component={Paper} padding={2} marginTop={2}>
                        <Typography variant='h5'>
                            You can get
                        </Typography>
                        <ul>
                            <li>Personal presentation website</li>
                            <li>Corporate website</li>
                            <li>Ecommerse website</li>
                            <li>Educational website</li>
                            <li>Croudfunding website</li>
                            <li>Blogging website</li>
                        </ul>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutUs
