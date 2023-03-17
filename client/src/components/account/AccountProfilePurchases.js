import {
    Box,
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
import { useTranslation } from 'react-i18next';

const products = [
    { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80', 
    name: 'Product1', 
    description: 'Description1', 
    parts: 10, 
    ownedParts: [
        { id:1 }
    ]},
]

function AccountProfilePurchases(){
    const { t } = useTranslation();
    return(
        <Card sx={{
            width:'100%',
        }}>
            <Table>
                <TableHead>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography>{t('image')}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography>{t('name')}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography>{t('description')}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                        textAlign: "center",
                        }}
                    >
                        <Typography>{t('parts-owned')}</Typography>
                    </TableCell>
                </TableHead>
                <TableBody></TableBody>
            </Table>
        </Card>
    )
}

export default AccountProfilePurchases;