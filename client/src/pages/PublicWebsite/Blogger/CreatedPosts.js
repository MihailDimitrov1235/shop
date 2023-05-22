import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function CreatedPosts({ posts }) {

  const {t} = useTranslation();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h5">{t('image')}</Typography>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h5">{t('name')}</Typography>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h5">{t('description')}</Typography>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h5">{t('numbers-sold')}</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post, index) => (
          <Link
            to={`/blog/${post.id}`}
            style={{
              display: "contents",
            }}
            key={index}
          >
            <TableRow
              sx={{
                Width: "100%",
              }}
            >
              <TableCell
                sx={{ width: "25%", borderRadius: "15px", overFlow: "hidden" }}
              >
                <img
                  src={post.image}
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5">{post.title}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2">
                  {post.subtitle}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                }}
              >
                {/* <Typography
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  {post.visits}
                </Typography> */}
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}

export default CreatedPosts;
