import React, { Component } from 'react';
import { debounce } from "debounce";
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withWidth from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ContactsDialog from './components/ContactsDialog';
import { getNumberOfColumns } from './helper';
import { fetchAllUsers, fetchUserDetails, clearUser, filterUsers, handleChange, handleCheckboxChange } from './actions/userAction';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    gridList: {
        width: '100%'
    },
    checkbox: {
        margin: '2px',
    },
});

const mapStateToProps = state => ({
    ...state.userReducer
})

const mapDispatchToProps = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchUserDetails: (userLogin) => dispatch(fetchUserDetails(userLogin)),
    clearUser: () => dispatch(clearUser()),
    filterUsers: (searchTerm) => dispatch(filterUsers(searchTerm)),
    handleChange: (searchTerm) => dispatch(handleChange(searchTerm)),
    handleCheckboxChange: (checked) => dispatch(handleCheckboxChange(checked))
})

class App extends Component {

    componentWillMount() {
        this.props.fetchAllUsers();
    }

    filterUsers(searchTerm) {
        this.props.handleChange(searchTerm);
        this.debouncedFiltering(searchTerm);
    }

    debouncedFiltering = debounce(searchTerm => {
        this.props.filterUsers(searchTerm)
    }, 500)

    render() {
        const { users, user, classes, width, searchValue } = this.props;
        const cols = getNumberOfColumns(width);

        return (
            <div className={classes.root} >
                {/* Show dialog when user is selected and loaded */}
                <ContactsDialog open={user.login ? true : false} user={user} onClose={this.props.clearUser} />
                <TextField
                    id="filled-username"
                    label="Username"
                    value={searchValue}
                    onChange={e => this.filterUsers(e.target.value)}
                    margin="normal"
                    variant="filled"
                />
                <FormControlLabel
                className={classes.checkbox}
                    control={
                        <Checkbox
                            checked={this.props.exactSearch}
                            onChange={e => this.props.handleCheckboxChange(e.target.checked)}
                            value="exactSearch"
                        />
                    }
                    label="Exact search"
                />
                <GridList className={classes.gridList} cols={cols}>
                    {users.map(user => (
                        <GridListTile key={user.avatar_url}>
                            <img src={user.avatar_url} alt={user.login} />
                            <GridListTileBar
                                title={user.login}
                                subtitle={<span>{user.type}</span>}
                                actionIcon={
                                    <IconButton onClick={() => this.props.fetchUserDetails(user.login)} className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default withWidth()(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App)));