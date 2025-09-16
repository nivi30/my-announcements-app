import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent, CardHeader, Collapse, IconButton,
  List, ListItem, ListItemText, Paper, Accordion, AccordionSummary, AccordionDetails,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Chip,
  Fab, Popover, Drawer, Badge, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    info: {
      main: '#29b6f6',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: '12px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        },
      },
    },
  },
});

const announcements = {
  'New Updates': "We've just released a major update with new features and improved performance. Check out the redesigned dashboard and enhanced reporting tools. We're confident this will streamline your workflow and provide a more intuitive experience. Further enhancements are planned for the upcoming months to provide even more value. We appreciate your feedback!",
  'Maintenance': "Scheduled maintenance is planned for this Friday from 2 AM to 4 AM UTC. During this period, some services may be temporarily unavailable. We apologize for any inconvenience this may cause and thank you for your patience as we work to improve our infrastructure. The maintenance is crucial for ensuring long-term stability and security.",
  'Issues/Errors': "We are aware of a recent issue affecting user login authentication on mobile devices. Our team is actively investigating the root cause and working on a fix. A temporary workaround is to use a desktop browser. We will provide updates as soon as we have more information and expect a resolution shortly.",
  'Feature Rollout': "We're excited to announce the gradual rollout of our new collaborative editing feature. Users in select regions will have access this week, with a full global release coming soon. Your feedback is highly valued as we refine this powerful tool.",
  'Community Event': "Join us for our first virtual community meetup next month! We'll discuss the product roadmap, share tips and tricks, and answer your questions live. Registration details will be sent out via email shortly.",
  'Policy Update': "Our privacy policy has been updated to reflect new data protection regulations. We have strengthened our commitment to safeguarding your data. You can review the full details on our legal page.",
  'Security Notice': "Your security is our top priority. We've enhanced our two-factor authentication process to provide an extra layer of protection for your account. We highly recommend all users enable this feature.",
  'Product Webinar': "Join our free live webinar next Tuesday to learn all about the new features. We'll have a Q&A session with our product team to answer your questions. Register today to reserve your spot!",
};

const newsFeedItems = [
  {
    title: 'New Dashboard UI',
    content: "The dashboard has been completely redesigned for better usability and a more modern look.",
    date: '2023-10-27',
    isNew: true
  },
  {
    title: 'New Editing Feature',
    content: 'Our collaborative editing feature is now in a phased rollout. Check your account for access.',
    date: '2023-11-01',
    isNew: true
  },
  {
    title: 'Security Patch Deployed',
    content: "An important security update has been deployed to fix a minor vulnerability. No user action is required.",
    date: '2023-10-25',
    isNew: false
  },
  {
    title: 'Server Maintenance',
    content: "Scheduled maintenance is planned for this Friday. Services may be temporarily unavailable.",
    date: '2023-10-20',
    isNew: false
  },
];

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [isHighlightVisible, setIsHighlightVisible] = useState(true);

  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const [badgeAnchorEl, setBadgeAnchorEl] = useState(null);

  const openFabPopover = (event) => {
    setFabAnchorEl(event.currentTarget);
  };
  const closeFabPopover = () => {
    setFabAnchorEl(null);
  };

  const openBadgePopover = (event) => {
    setBadgeAnchorEl(event.currentTarget);
  };
  const closeBadgePopover = () => {
    setBadgeAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 6, color: 'primary.light' }}>
            Announcements
          </Typography>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>1. Collapsible Cards</Typography>
            <CollapsibleCardAnnouncements />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>2. Accordion Style</Typography>
            <AccordionAnnouncements />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>3. Simple Collapsible List</Typography>
            <SimpleCollapsibleList />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>4. Card with "Show More/Less"</Typography>
            <CardWithShowMore />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>5. On-Page Dialog (Modal)</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                View Important Update
              </Button>
            </Box>
            <ModalAnnouncement open={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>6. Snackbar/Toast Notification</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => setIsSnackbarOpen(true)}>
                Show New Update Toast
              </Button>
            </Box>
            <SnackbarAnnouncement open={isSnackbarOpen} onClose={() => setIsSnackbarOpen(false)} />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>7. Simple Carousel</Typography>
            <CarouselAnnouncement />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>8. Fixed Banner</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button variant="contained" onClick={() => setIsBannerVisible(true)} disabled={isBannerVisible}>
                Show Fixed Banner
              </Button>
            </Box>
            <FixedBannerAnnouncement visible={isBannerVisible} onClose={() => setIsBannerVisible(false)} />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>9. Inline Dismissible Alert</Typography>
            <DismissibleAlertAnnouncement visible={isAlertVisible} onClose={() => setIsAlertVisible(false)} />
          </Box>
          
          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>10. Drawer/Sidebar</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
                Open Announcements
              </Button>
            </Box>
            <DrawerAnnouncement open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>11. Notification Badge</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <BadgeNotification open={Boolean(badgeAnchorEl)} anchorEl={badgeAnchorEl} handleClose={closeBadgePopover} handleClick={openBadgePopover} />
            </Box>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>12. Inline Expanding Table Row</Typography>
            <ExpandingTableAnnouncement />
          </Box>

          {/* New: News Feed/Timeline */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>14. News Feed/Timeline</Typography>
            <NewsFeedAnnouncement />
          </Box>
 
          {/* New: Highlight Card */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>13. Highlight Card</Typography>
            <HighlightCardAnnouncement visible={isHighlightVisible} onClose={() => setIsHighlightVisible(false)} />
          </Box>

        </Container>

        {/* Floating Action Button (FAB) with Popover */}
        <Fab color="primary" aria-label="announcements" onClick={openFabPopover} sx={{ position: 'fixed', bottom: 24, right: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
          <NotificationsIcon />
        </Fab>
        <Popover
          open={Boolean(fabAnchorEl)}
          anchorEl={fabAnchorEl}
          onClose={closeFabPopover}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          PaperProps={{ sx: { borderRadius: '12px', minWidth: { xs: '80vw', sm: '350px' }, maxWidth: '80vw' } }}
        >
          <Box sx={{ p: 2, maxHeight: '400px', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h5" fontWeight="bold">Announcements</Typography>
              <IconButton onClick={closeFabPopover} size="small" sx={{ color: 'text.secondary' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper sx={{ p: 2, bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  New Feature Release!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check out our latest feature, now available to all users. We've added a new dark mode setting!
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Scheduled Maintenance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our platform will be undergoing maintenance on Saturday from 2 AM to 4 AM EST. Thank you for your patience.
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: 'background.paper', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Important Update
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We've patched a security vulnerability. Please update your password at your earliest convenience.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Popover>
      </Box>
    </ThemeProvider>
  );
};

// Idea 1: Collapsible Cards
const CollapsibleCardAnnouncements = () => {
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      {Object.entries(announcements).map(([section, content]) => (
        <Card key={section} sx={{ bgcolor: 'background.paper' }}>
          <CardHeader
            title={section}
            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            action={
              <ExpandMore
                expand={expanded[section]}
                onClick={() => handleExpandClick(section)}
                aria-expanded={expanded[section]}
                aria-label="show more"
                sx={{ color: 'primary.light' }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            }
          />
          <Collapse in={expanded[section]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

// Idea 2: Accordion Style
const AccordionAnnouncements = () => {
  return (
    <Box>
      {Object.entries(announcements).map(([section, content]) => (
        <Accordion key={section} sx={{ bgcolor: 'background.paper', mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />}
            aria-controls={`${section}-content`}
            id={`${section}-header`}
          >
            <Typography variant="h6" fontWeight="bold">{section}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

// Idea 3: Simple Collapsible List
const SimpleCollapsibleList = () => {
  const [expanded, setExpanded] = useState({});

  const handleToggle = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Paper sx={{ bgcolor: 'background.paper', p: 2 }}>
      <List>
        {Object.entries(announcements).map(([section, content]) => (
          <React.Fragment key={section}>
            <ListItem disablePadding onClick={() => handleToggle(section)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
              <ListItemText
                primary={<Typography variant="subtitle1" fontWeight="bold" component="span">{section}</Typography>}
                secondary={!expanded[section] ? content.slice(0, 80) + '...' : ''}
              />
              <IconButton edge="end" aria-label="expand" sx={{ color: 'primary.light' }}>
                {expanded[section] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </ListItem>
            <Collapse in={expanded[section]} timeout="auto" unmountOnExit>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {content}
                </Typography>
              </Box>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

// Idea 4: Card with "Show More/Less" link
const CardWithShowMore = () => {
  const [expanded, setExpanded] = useState({});

  const handleToggle = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      {Object.entries(announcements).map(([section, content]) => (
        <Card key={section} sx={{ bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>{section}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {expanded[section] ? content : `${content.slice(0, 100)}...`}
            </Typography>
            <Typography
              variant="body2"
              color="primary.light"
              onClick={() => handleToggle(section)}
              sx={{ cursor: 'pointer', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}
            >
              {expanded[section] ? 'Show less' : 'Show more'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Idea 5: On-Page Dialog (Modal)
const ModalAnnouncement = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '12px' } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Important Update!</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          The most recent announcement is a major one. We've just released new features!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {announcements['New Updates']}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Idea 6: Snackbar/Toast Notification
const SnackbarAnnouncement = ({ open, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ bottom: { xs: 16, sm: 24 } }}>
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%', borderRadius: '8px' }}>
        New Update: Check out the latest features!
      </Alert>
    </Snackbar>
  );
};

// Idea 7: Simple Carousel
const CarouselAnnouncement = () => {
  const [index, setIndex] = useState(0);
  const sections = Object.keys(announcements);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + sections.length) % sections.length);
  };

  const currentSection = sections[index];

  return (
    <Paper sx={{ bgcolor: 'background.paper', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton onClick={handlePrev} sx={{ color: 'primary.light' }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1, textAlign: 'center', px: 2, overflow: 'hidden' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {currentSection}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {announcements[currentSection]}
        </Typography>
      </Box>
      <IconButton onClick={handleNext} sx={{ color: 'primary.light' }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Paper>
  );
};

// Idea 8: Fixed Banner
const FixedBannerAnnouncement = ({ visible, onClose }) => {
  return (
    <Collapse in={visible}>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'primary.main', p: 2, zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.3)' }}>
        <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
          Important: Scheduled maintenance this Friday!
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: 2, color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Collapse>
  );
};

// Idea 9: Inline Dismissible Alert
const DismissibleAlertAnnouncement = ({ visible, onClose }) => {
  return (
    <Collapse in={visible}>
      <Alert
        severity="info"
        onClose={onClose}
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="body1">
          <span style={{ fontWeight: 'bold' }}>New Updates:</span> Check out the redesigned dashboard and new features!
        </Typography>
      </Alert>
    </Collapse>
  );
};

// Idea 10: Drawer/Sidebar
const DrawerAnnouncement = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '80%', sm: '400px' }, bgcolor: 'background.paper', borderRadius: '12px 0 0 12px' }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">Announcements</Typography>
          <IconButton onClick={onClose} sx={{ color: 'primary.light' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {Object.entries(announcements).map(([section, content]) => (
            <ListItem key={section} disablePadding sx={{ mb: 2, alignItems: 'flex-start' }}>
              <ListItemText
                primary={<Typography variant="subtitle1" fontWeight="bold">{section}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{content}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

// Idea 11: Notification Badge
const BadgeNotification = ({ open, anchorEl, handleClose, handleClick }) => {
  const newAnnouncementsCount = 2; // Example count

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={newAnnouncementsCount} color="error">
          <NotificationsIcon sx={{ color: 'text.secondary' }} />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { borderRadius: '12px', minWidth: '300px' } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Notifications
          </Typography>
          <List dense>
            {Object.entries(announcements).slice(0, 2).map(([section, content]) => ( // Show a couple for demo
              <ListItem key={section} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText
                  primary={<Typography variant="subtitle2" fontWeight="bold">{section}</Typography>}
                  secondary={content.slice(0, 50) + '...'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

// Idea 12: Inline Expanding Table Row
const ExpandingTableAnnouncement = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (section) => {
    setExpandedRow(expandedRow === section ? null : section);
  };

  return (
    <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', borderRadius: '12px' }}>
      <Table aria-label="announcements table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Type</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Summary</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 'bold' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(announcements).map(([section, content]) => {
            const firstPeriodIndex = content.indexOf('.');
            const summary = firstPeriodIndex !== -1 ? content.slice(0, firstPeriodIndex + 1) : content.slice(0, 100) + '...';

            return (
              <React.Fragment key={section}>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                  }}
                  onClick={() => handleRowClick(section)}
                >
                  <TableCell component="th" scope="row">
                    <Chip label={section} color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                  </TableCell>
                  <TableCell>{summary}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      {expandedRow === section ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={expandedRow === section} timeout="auto" unmountOnExit>
                      <Box sx={{ my: 2 }}>
                        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{section}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {content}
                          </Typography>
                        </Paper>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// New: News Feed/Timeline
const NewsFeedAnnouncement = () => {
  return (
    <Paper sx={{ bgcolor: 'background.paper', p: 3, borderRadius: '12px' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Recent News</Typography>
      <List disablePadding>
        {newsFeedItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ alignItems: 'flex-start', py: 1.5 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle1" fontWeight="bold" component="span">{item.title}</Typography>
                    {item.isNew && (
                      <Chip label="New" color="secondary" size="small" sx={{ ml: 1, fontWeight: 'bold' }} />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" component="span">{item.content}</Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }} component="span">
                      {item.date}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < newsFeedItems.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

// New: Highlight Card
const HighlightCardAnnouncement = ({ visible, onClose }) => {
  return (
    <Collapse in={visible}>
      <Card sx={{ bgcolor: 'info.main', mb: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsIcon sx={{ mr: 2, color: 'white' }} />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
              We've launched a new feature! Click here to learn more.
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default App;