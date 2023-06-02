import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

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
            <Typography variant="h5">{t('visits')}</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
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
                  src={`${process.env.REACT_APP_ASSETS}/${post.image_path}`}
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
                <Typography
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  {post.visits_count}
                </Typography>
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}

export default CreatedPosts;
