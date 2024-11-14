import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import api from '@api/axios';

interface PhishingAttempt {
  _id: string;
  email: string;
  status: string;
  content: string;
  openedAt: string | null;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState<PhishingAttempt[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchTotalRecords = async () => {
        const countResponse = await api.get<number>('/phishing/count');

        setTotalRecords(countResponse.data || 0);
    };

    fetchTotalRecords();
  }, [navigate]);

  useEffect(() => {
    const fetchList = async () => {
        const listResponse = await api.get<PhishingAttempt[]>('/phishing/list', {
          params: {
            page: page + 1,
            perPage: rowsPerPage,
          }
        });

        setData(listResponse.data || []);
    };

    fetchList();
  }, [navigate, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendEmail = async () => {
    await api.post(
        '/phishing/send',
        { email },
      );

      enqueueSnackbar('Email sent successfully', { variant: 'success' });
      setEmail('');
  };

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
          size='small'
        />
        <Button variant="contained" color="primary" onClick={handleSendEmail}>
          Send
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Opened At</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.openedAt ? new Date(item.openedAt).toLocaleString() : 'N/A'}
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalRecords}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Dashboard;