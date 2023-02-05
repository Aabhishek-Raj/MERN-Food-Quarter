import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from '@mui/material';
import Header from './Header';
import { useTheme } from '@emotion/react';
import { tokens } from './theme';
import { useState, useEffect } from 'react';
import { getSupplierRequests, verifySupplier } from '../../features/admin/adminService';

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




const EachCard = (props) => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box m='20px'>
      <Card sx={{ maxWidth: 345, backgroundColor: colors.primary[400] }}>
        <CardHeader sx={{ backgroundColor: colors.blueAccent[700] }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              fjnfdkj
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.request.license}
          subheader={props.request.email}
        />
        <CardMedia
          component="img"
          height="194"
          image={`http://localhost:4000/images/${props.request.license}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
 
          </Typography>
          <Typography>Id no:  {props.request._id}</Typography>
          <Typography>Supply Location:  {props.request.location}</Typography>
          <Typography>
            terms & conditions: {props.request.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box
            width="40%"
            m="0 auto"
            p="3px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Button>Reject</Button>
          </Box>
          <Box
            width="40%"
            m="0 auto"
            p="3px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Button onClick={() => {props.onClick(props.request._id)}}>Approve</Button>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );

}

const Verifications = () => {

  const [requests, setRequests] = useState()

  useEffect(() => {
    async function fetchData() {

      const data = await getSupplierRequests()
      setRequests(data)
    }
    fetchData()
  }, [])
 
  const handleclick = async (supplierId) => {
      await verifySupplier(supplierId)
      const fetchData = async () => {
        const data = await getSupplierRequests()
        setRequests(data)
      }
      fetchData()
  }
  if (!requests) {
    return <div>No new Requests</div>
  }
  return (
    <Box m="20px">
      <Header
        title="REQUESTS"
        subtitle="Verify the Suppliers "
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          // "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {requests.map((request, index) => (

          <EachCard key={index} request={request} onClick={handleclick} />

        ))}

      </Box>
    </Box>
  )

};

export default Verifications