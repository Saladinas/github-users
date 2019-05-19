import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
    image: {
        maxWidth: '100%',
    },
    listItem: {
        padding: '2px 24px',
    },
    gitHubLink: {
        cursor: 'pointer',
    },
});

class ContactsDialog extends Component {

    render() {
        const { open, user, classes } = this.props;

        // Contact array of objects with key and icon pairs where key represents
        // one of the property names of received user object
        const userContacts = [
            {
                key: 'login',
                icon: <SvgIcon className={classes.gitHubLink} onClick={() => window.open(user.html_url, "_blank")}>
                    <path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z" />
                </SvgIcon>
            },
            { key: 'name', icon: <FaceIcon /> },
            { key: 'location', icon: <LocationOnIcon /> },
            { key: 'company', icon: <WorkIcon /> },
            { key: 'email', icon: <EmailIcon /> },
        ];

        return (
            <Dialog
                fullWidth={false}
                maxWidth={'xs'}
                open={open}
                onClose={this.props.onClose}
                aria-labelledby="contacts-dialog-title"
            >
                <DialogTitle id="contacts-dialog-title">
                    <img className={classes.image} src={user.avatar_url} alt={user.login} />
                </DialogTitle>
                <Divider variant="middle" />
                <List>
                    {userContacts.map(contact => {
                        // If user contains contact property - return ListItem with icon and text
                        return user[contact.key] ? <ListItem className={classes.listItem} key={contact.key}>
                            <ListItemAvatar>
                                <Avatar>
                                    {contact.icon}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user[contact.key]} />
                        </ListItem> : null
                    })}
                </List>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ContactsDialog);