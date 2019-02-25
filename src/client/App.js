import React from 'react';
import PropTypes from 'prop-types';
// import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import createPalette from '@material-ui/core/styles/createPalette';

import TopNavigation from './components/layout/TopNavigation';
import SearchBar from './components/SearchBar';
import ArtistList from './components/media/ArtistList';
import AlbumList from './components/media/AlbumList';
import TrackList from './components/media/TrackList';
import MediaPlayer from './components/MediaPlayer';

const theme = createMuiTheme({
    palette: createPalette({
        primary: purple, // Purple and green play nicely together.
        secondary: purple // This is just green.A700 as hex.
    }),
    typography: { useNextVariants: true }
});

const styles = () => {
    return {
        root: {
            margin: '0 auto',
            maxWidth: '1200px'
        }
    };
};

const App = ({
    store, history, classes
}) => {
    return (
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <MuiThemeProvider theme={ theme }>
                    {/* <CssBaseline /> */}
                    <div className={ classes.root }>
                        <TopNavigation />
                        <SearchBar />
                        <Switch>
                            <Route path="/" exact component={ AlbumList } />
                            <Route path="/artists" exact component={ ArtistList } />
                            <Route path="/tracks" exact component={ TrackList } />
                        </Switch>
                        <MediaPlayer />
                    </div>
                </MuiThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};

App.propTypes = {
    classes: PropTypes.object,
    history: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
