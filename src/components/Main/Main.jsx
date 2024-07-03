import React,{useContext} from 'react'
import { Card,CardHeader,CardContent,Typography,Grid,Divider } from '@material-ui/core'
import useStyles from './styles'
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from '../../context/context';
import InfoCard from '../infoCard';
import { Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';


const Main = () => {
    const classes=useStyles();
    const { balance } = useContext(ExpenseTrackerContext);
    const [open, setOpen] = useState(false);
    

useEffect(() => {
    // Example: Notify if balance is low
    if (balance < 1000) {
        setOpen(true);
    }
}, [balance]);

  return (
    <>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="Your balance is low!"
        />
    <Card className={classes.root}>
        
        <CardHeader title="Expense Tracker" subheader="Track and Manage Your Expenses Efficiently"/>
        <CardContent>
            <Typography align="center" variant="h5">Total Balance Rs{balance}</Typography>
            <Typography variant='subtitle1' style={{ lineHeight: '1.5em',marginTop: '20px'}}>
                <InfoCard/>
            </Typography>
            <Divider/>
            <Form/>
        </CardContent>
        <CardContent className={classes.CardContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List/>
                </Grid>
            </Grid>
        </CardContent>
        
    </Card>
    </>
  )
}

export default Main