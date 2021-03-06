import React from 'react'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../state/store'
import { logout } from '../../state/user/userActions'
import { NavLink, useHistory } from 'react-router-dom'
import '../pageElements.css'
import PetsIcon from '@material-ui/icons/Pets'
import { Typography } from '@material-ui/core'
import { ADMIN, VET, OWNER } from '../../utils/constants'

interface Route {
  caption: string
  path: string
}

const ownerRoutes: Route[] = [
  {
    caption: 'Moje Zwierzęta',
    path: '/pets',
  },
  // {
  //   caption: 'Weterynarze',
  //   path: '/',
  // },
  {
    caption: 'Kalendarz',
    path: '/calendar',
  },
  {
    caption: 'Dostęp',
    path: '/pets/my/invitations',
  },
]

const vetRoutes: Route[] = [
  {
    caption: 'Zwierzęta',
    path: '/pets',
  },
  // {
  //   caption: 'Weterynarze',
  //   path: '/',
  // },
  {
    caption: 'Kalendarz',
    path: '/',
  },
]

const adminRoutes: Route[] = [
  {
    caption: 'Zwierzęta',
    path: '/pets',
  },
  {
    caption: 'Użytkownicy',
    path: '/users',
  },
  {
    caption: 'Rasy',
    path: '/races',
  },
  {
    caption: 'Gatunki',
    path: '/species',
  },
  {
    caption: 'Instytucje',
    path: '/institutions',
  },
  {
    caption: 'Typy badań',
    path: '/examination/types',
  },
  {
    caption: 'Parametry badań',
    path: '/examination/parameters',
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

export function LoggedInNavbar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: RootState) => state.user.user)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>{user.email}</MenuItem>
      <MenuItem
        onClick={() => {
          history.push('/profile/edit')
        }}
      >
        Moje konto
      </MenuItem>
      <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
    </Menu>
  )

  const renderMobileMenuItemByRole = () => {
    switch (user.role) {
      case ADMIN:
        return renderMobileMenuItem(adminRoutes)
      case OWNER:
        return renderMobileMenuItem(ownerRoutes)
      case VET:
        return renderMobileMenuItem(vetRoutes)
    }
  }

  const renderMobileMenuItem = (routes: Route[]) => {
    return routes.map(r => (
      <MenuItem key={r.caption}>
        <NavLink
          exact
          className="navlink"
          activeClassName="activeNavLink"
          color="inherit"
          to={r.path}
        >
          {r.caption}
        </NavLink>
      </MenuItem>
    ))
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink
          exact
          className="navlink"
          activeClassName="activeNavLink"
          color="inherit"
          to="/"
        >
          <Typography className="title peru">
            <PetsIcon fontSize="small" />
            iPetCare
          </Typography>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink
          exact
          className="navlink"
          activeClassName="activeNavLink"
          color="inherit"
          to="/users/search"
        >
          Wyszukaj
        </NavLink>
      </MenuItem>
      {renderMobileMenuItemByRole()}
    </Menu>
  )

  const renderDesktopMenuItemByRole = () => {
    switch (user.role) {
      case ADMIN:
        return renderDesktopMenuItem(adminRoutes)
      case OWNER:
        return renderDesktopMenuItem(ownerRoutes)
      case VET:
        return renderDesktopMenuItem(vetRoutes)
    }
  }

  const renderDesktopMenuItem = (routes: Route[]) => {
    return routes.map(r => (
      <NavLink
        exact
        key={r.caption}
        className="navlink"
        activeClassName={'activeNavLink'}
        color="inherit"
        to={r.path}
      >
        {r.caption}
      </NavLink>
    ))
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={classes.sectionDesktop}>
            <NavLink
              exact
              className="navlink"
              activeClassName="activeNavLink"
              color="inherit"
              to="/"
            >
              <Typography className="title peru" variant="h4">
                <PetsIcon fontSize="small" />
                iPetCare
              </Typography>
            </NavLink>
            <NavLink
              exact
              className="navlink"
              activeClassName="activeNavLink"
              color="inherit"
              to="/users/search"
            >
              Wyszukaj
            </NavLink>
            {renderDesktopMenuItemByRole()}
          </div>
          <div className={classes.grow} />
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
