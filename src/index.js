import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

// Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StyleSelect from './styleSelect';
import Map from './map';

import config from './config';
//import fcavConfig from './fcav_config';

mapboxgl.accessToken = 'pk.eyJ1IjoidmlvbGluY291bnRlciIsImEiOiJja2N5eHhoN3MwODRxMnhsb2p0eWsxc3BkIn0.ws9GBeyQBW-KZydHGVmYAA';

const styleUrlTemplate = style => `mapbox://styles/mapbox/${style.id}`

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


function Application() {

	const classes = useStyles();

	const [lng, setLng] =  useState(5);
	const [lat, setLat] = useState(34);
	const [zoom, setZoom] =  useState(2);
	const [activeStyle, setActiveStyle] = useState(config.styles.filter(style => style.default)[0]);

	useEffect(() => {

		let ignore = false;

		if (!ignore) {

			const styleUrl = styleUrlTemplate(activeStyle)

/*
			map.current.on('move', () => {
				setLng(map.current.getCenter().lng.toFixed(4));
				setLat(map.current.getCenter().lat.toFixed(4));
				setZoom(map.current.getZoom().toFixed(2));
			});
*/
		}

		return () => { ignore = true };

	})

/*
	useEffect(() => {
		map.current.setStyle(styleUrlTemplate(activeStyle))
	}, [map, activeStyle])
*/

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						All Layers
					</Typography>
				</Toolbar>
			</AppBar>
			<StyleSelect
				styles={config.styles}
				activeStyle={activeStyle}
				onSelect={style => setActiveStyle(style)}
			/>
			<Map
				mapbox={mapboxgl}
				style={activeStyle}
				setLng={setLng}
				setLat={setLat}
				setZoom={setZoom}>
			</Map>
		</div>
	)

}

ReactDOM.render(<Application />, document.getElementById('app'));

