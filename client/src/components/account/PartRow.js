import { useState } from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
  NativeSelect,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from "react-i18next";

function PartRow( {part} ){

    const [downloadPart, setDownloadPart] = useState("all");
    const { t } = useTranslation();
    const handleChange = (event) =>{
        setDownloadPart(event.target.value)
      }

    const handleDownload = () =>{
        console.log("download " + downloadPart)
    }
    return(
        <TableRow>
                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h5">{part.id}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="subtitle2">{part.name}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                      }}
                    >
                      <NativeSelect
                      defaultValue={"all"}
                      variant='outlined'
                      onChange={handleChange}
                      >
                        <option value={"all"}>{t('all-files')}</option>
                        {part.files.map((file) => (
                          <option value={file}>{file}</option>
                        ))}
                      </NativeSelect>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "25%",
                        textAlign: "center",
                      }}
                    >
                        <IconButton
                        onClick={handleDownload}
                        >
                            <DownloadIcon/>
                        </IconButton>
                    </TableCell>
                  </TableRow>
    )
}

export default PartRow;