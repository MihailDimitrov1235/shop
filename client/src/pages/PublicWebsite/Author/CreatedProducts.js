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

function CreatedProducts({ products }) {

  const {t} = useTranslation();
 // products = products.products; // !!!!!!!!!!!!!!
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
        {products.map((product, index) => (
          <Link
            to={`/products/${product.id}`}
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
                  src={product.image}
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
                <Typography variant="h5">{product.name}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2">
                  {product.description}
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
                  {product.sold}
                </Typography>
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}

export default CreatedProducts;
