import { useState } from 'react';
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
    Card
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import Row from './Row';

const products = [
    { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', 
    name: 'Product1', 
    description: 'Description1', 
    parts: 10, 
    ownedParts: [
        { id:1, name:'introduction', files: ['ferf.docs'] },
        { id:2, name:'part2', files: ['ferf.docs'] },
        { id:3, name:'part3', files: ['ferf.docs'] },
        { id:3, name:'part4', files: ['ferf.docs'] },
        { id:3, name:'end', files: ['ferf.docs'] },
    ]},
    { 
        id: 2, 
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', 
        name: 'Product1', 
        description: 'Description1', 
        parts: 5, 
        ownedParts: [
            { id:1, name:'introduction', files: ['ferf.docs'] },
            { id:2, name:'part2', files: ['ferf.docs'] },
            { id:3, name:'part3', files: ['ferf.docs'] },
            { id:3, name:'part4', files: ['ferf.docs'] },
            { id:3, name:'end', files: ['ferf.docs'] },
        ]},
]

function AccountProfilePurchases(){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    const { t } = useTranslation();
    return(
        <Card sx={{
            width:'100%',
        }}>
            <Table>
                <TableHead>
                    <TableCell/>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography variant='p'>{t('image')}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography variant='p'>{t('name')}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography variant='p'>{t('description')}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography variant='p'>{t('parts-owned')}</Typography>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {products.map( product => (
                        <Row product={product} />
                    ))}
                </TableBody>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Table>
        </Card>
    )
}

export default AccountProfilePurchases;