import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

export default function BlogReviewCard({ blog }) {
  if (!blog) return null;

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', padding: 2 }}>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {blog.title?.charAt(0) || 'B'}
          </Avatar>
        }
        title={blog.title}
        subheader={blog.createdAt?.substring(0, 10)}
      />

      <CardMedia
        component="img"
        height="194"
        image={
          blog.image ||
          "https://images.unsplash.com/photo-1501504905252-473c47e087f8"
        }
        alt={blog.title}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.description}
        </Typography>
      </CardContent>

    </Card>
  );
}