import React, { useContext, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  MenuItem, 
  Menu, 
  IconButton, 
  Select, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  FaUserMd, 
  FaHome, 
  FaUserCircle, 
  FaHospital, 
  FaClipboardList, 
  FaBars, 
  FaChevronDown,
  FaHeartbeat
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { LangContext } from '../contexts/LangContextDef.js';

export default function Navbar() {
  const { user } = useAuth();
  const { lang, switchLang } = useContext(LangContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenMenu = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const toggleMobileMenu = (open) => () => {
    setMobileOpen(open);
  };

  const navItems = [
    { label: 'Accueil', path: '/', icon: <FaHome /> },
    { 
      label: 'Services', 
      icon: <FaHospital />, 
      items: [
        { label: 'Spécialisations', path: '/specialisations', icon: <FaClipboardList /> },
        { label: 'Nos Médecins', path: '/doctors', icon: <FaUserMd /> },
        { label: 'À propos', path: '/a-propos', icon: <FaHospital /> },
      ] 
    }
  ];

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '3px solid #1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        
    {/* BLOC GAUCHE : MENU MOBILE & LOGO PROFESSIONNEL */}
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
  <IconButton 
    color="inherit" 
    onClick={toggleMobileMenu(true)} 
    sx={{ display: { md: 'none' }, color: '#1976d2', p: 0.5 }}
  >
    <FaBars />
  </IconButton>
  
  {/* LOGO AVEC SYMBOLE MÉDICAL */}
  <Box 
    component={Link} 
    to="/" 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1, 
      textDecoration: 'none',
      '&:hover .logo-icon': { transform: 'scale(1.1) rotate(-5deg)' },
      '&:hover .logo-text': { color: '#115293' }
    }}
  >
    {/* Symbole Médical Pro */}
    <Box 
      className="logo-icon"
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'rgba(25, 118, 210, 0.08)',
        color: '#1976d2',
        p: 1,
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Forme organique moderne
        transition: 'transform 0.3s ease',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)'
      }}
    >
      <FaHeartbeat size={22} />
    </Box>

    {/* Texte du Logo */}
    <Typography 
      variant="h5" 
      className="logo-text"
      sx={{ 
        fontWeight: '900', 
        color: '#1976d2', 
        letterSpacing: '0.7px',
        fontSize: { xs: '1.2rem', sm: '1.4rem' },
        transition: 'color 0.3s ease',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      BOMPI<span style={{ color: '#2e7d32', fontWeight: '800' }}>KILIKI</span>
    </Typography>
  </Box>
</Box>


        {/* BLOC CENTRAL : NAVIGATION DESKTOP */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navItems.map((menu, index) => (
            <Box key={menu.label}>
              {menu.items ? (
                <>
                  <Button 
                    onClick={(e) => handleOpenMenu(e, index)} 
                    endIcon={<FaChevronDown style={{ fontSize: '0.7rem' }} />} 
                    sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: '#1976d2' } }}
                  >
                    {menu.label}
                  </Button>
                  <Menu 
                    anchorEl={anchorEl} 
                    open={activeMenu === index} 
                    onClose={handleCloseMenu} 
                    sx={{ mt: 1 }}
                    disableScrollLock
                  >
                    {menu.items.map((item) => (
                      <MenuItem 
                        key={item.label} 
                        component={Link} 
                        to={item.path} 
                        onClick={handleCloseMenu} 
                        sx={{ gap: 2, minWidth: 180 }}
                      >
                        <Box sx={{ color: '#1976d2', display: 'flex' }}>{item.icon}</Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button 
                  component={Link} 
                  to={menu.path} 
                  sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none', '&:hover': { color: '#1976d2' } }}
                >
                  {menu.label}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* BLOC DROITE : SÉLECTEUR DE LANGUE & ACTIONS UTILISATEUR */}
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <Select 
    value={lang} 
    onChange={(e) => switchLang(e.target.value)} 
    variant="standard" 
    disableUnderline 
    sx={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'text.secondary', cursor: 'pointer' }}
  >
    <MenuItem value="fr">FR</MenuItem>
    <MenuItem value="en">EN</MenuItem>
  </Select>

  <Button 
    variant="contained" 
    size="small" 
    component={Link} 
    to="/doctor-planning" 
    sx={{ 
      borderRadius: '20px', 
      textTransform: 'none', 
      px: 3, 
      fontWeight: 'bold', 
      display: { xs: 'none', sm: 'flex' }, 
      bgcolor: '#1976d2', 
      '&:hover': { bgcolor: '#115293' } 
    }}
  >
    RDV
  </Button>

  {user && (
    <IconButton component={Link} to="/account" sx={{ color: '#1976d2', p: 0.5 }}>
      <FaUserCircle size={28} />
    </IconButton>
  )}
</Box>


        {/* MENU LATÉRAL MOBILE (DRAWER) */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu(false)}>
          <Box sx={{ width: 260, pt: 3 }} role="presentation">
            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: '800', mb: 3, color: '#1976d2' }}>
              BOMPI<span style={{ color: '#2e7d32' }}>KILIKI</span>
            </Typography>
            <Divider />
            <List sx={{ px: 1 }}>
              {navItems.map((item) => (
                <React.Fragment key={item.label}>
                  {item.items ? (
                    item.items.map((sub) => (
                      <ListItem disablePadding key={sub.label} sx={{ mb: 0.5 }}>
                        <ListItemButton component={Link} to={sub.path} onClick={toggleMobileMenu(false)} sx={{ borderRadius: '8px' }}>
                          <ListItemIcon sx={{ color: '#1976d2', minWidth: 35 }}>{sub.icon}</ListItemIcon>
                          <ListItemText primary={sub.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton component={Link} to={item.path} onClick={toggleMobileMenu(false)} sx={{ borderRadius: '8px' }}>
                        <ListItemIcon sx={{ color: '#1976d2', minWidth: 35 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                      </ListItemButton>
                    </ListItem>
                  )}
                  <Divider sx={{ my: 1 }} />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Drawer>

      </Toolbar>
    </AppBar>
  );
}
