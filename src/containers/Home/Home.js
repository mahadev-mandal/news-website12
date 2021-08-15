import React from 'react'
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import RecentNews from '../../components/RecentNews/RecentNews';
import PopularNews from '../../components/PopularNews/PopularNews';

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: 'center',
    },
    divider: {
        margin:10,
        backgroundColor: 'green',
    }
}))

function NewsCards() {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={5} >
                <Grid item md={8} xs={12} >
                    <Typography variant='h4' className={classes.heading}>Latest News</Typography>
                    <Divider className={classes.divider} />
                    <RecentNews />
                </Grid>
                <Divider orientation='vertical' flexItem style={{ marginRight: '-1px' }} />
                <Grid item md={4} xs={12} >
                    <Typography variant='h4' className={classes.heading}>Most Read</Typography>
                    <Divider className={classes.divider} />
                    <PopularNews />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewsCards
