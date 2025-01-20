import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';




export const AccountProfile = () =>{
  const UserName = localStorage.getItem('user_name')
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  return(
    <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {UserName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.city} {user.country}
        </Typography>
    
      </Box>
    </CardContent>
    <Divider />
   
  </Card>
  )
} 
  
 

