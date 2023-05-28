import { useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Collapse,
  Card,
  NativeSelect,
} from "@mui/material";
import PartRow from "./PartRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";

function Row({ product }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: open ? "unset" : "" },
          Width: "100%",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
          <Typography variant="h6">{product.name}</Typography>
        </TableCell>
        <TableCell
          sx={{
            width: "25%",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2">{product.description}</Typography>
        </TableCell>
        <TableCell
          sx={{
            width: "25%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "20px",
            }}
          >
            {product.ownedParts.length}/{product.parts}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              {/* <TableHead>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography>{t("number")}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography>{t("name")}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography>{t("files")}</Typography>
                </TableCell>
              </TableHead> */}

              <TableBody>
                {product.ownedParts.map((part) => (
                  <PartRow part={part} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
