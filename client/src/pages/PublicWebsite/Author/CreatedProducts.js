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

function CreatedProducts(products) {
  products = products.products;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Image</Typography>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Name</Typography>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Description</Typography>
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Numbers sold</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
            <Link to={`/product/${product.id}`} style={{
                display:'contents'
            }}>
          <TableRow
            sx={{
              Width: "100%",
            }}
          >
            <TableCell
              sx={{ width:'25%', borderRadius: "15px", overFlow: "hidden" }}
            >
              <img src={product.image} style={{
                borderRadius: "15px",
                width:'100%',
              }}/>
            </TableCell>
            <TableCell sx={{
                width:'25%',
                textAlign:'center',
            }}>
              <Typography variant="h5">{product.name}</Typography>
            </TableCell>
            <TableCell sx={{
                width:'25%',
                textAlign:'center',
            }}>
              <Typography variant="subtitle2">{product.description}</Typography>
            </TableCell>
            <TableCell sx={{
                width:'25%',
                textAlign:'center',
            }}>
              <Typography sx={{
                fontSize:'20px'
              }}>{product.sold}</Typography>
            </TableCell>
          </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}

export default CreatedProducts;
