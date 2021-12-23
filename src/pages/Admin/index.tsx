import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import styles from './styles.module.scss';
import 'sweetalert2/src/sweetalert2.scss'
import { Navigate } from "react-router-dom";;
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { api } from '../../services/api';
import { HandleContext } from '../../contexts/handle';
import { Box, Button, IconButton, Input, Modal, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type User = {
  id: string;
  name: string;
  email: string;
}
interface HandleDestroy {
  id:string;
  name:string;
  refreshCallback: () => void
}
export function Admin() {
  const {isAuthenticated} = useContext(AuthContext);
  const [auth, setAuth] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }
    useEffect(() => {
      const authenticated = isAuthenticated();
      if(!authenticated) {
        setAuth(false);
      }
      listAll()
    },[])
    const [users, setListUsers] = useState<User[]>([])
    const [editUser, setEditUser] = useState<User>();
    const {destroy} = useContext(HandleContext)
    function handleDestroy({id,name,refreshCallback}: HandleDestroy) {
      destroy({id,name,refreshCallback});
    }
    function refreshCallback() {
      listAll();
    }
    function listAll() {
      api.get<User>(`listAll`).then(({data})  => {
        // @ts-ignore
        setListUsers(data);
      })
    }
  return (
    <>
    {!auth && <Navigate to="/login" />}
    <Header/>
    <br/>
    <br/>
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box style={
        { 
          width:'50%', 
          margin: '0 auto',
          marginTop: '3rem',
          borderRadius: '3px',
          backgroundColor: 'white'
        }}>
          <div className={styles.modalContainer}><h2>Editar Usuario {editUser?.name} </h2>  
            <form>
              <Input defaultValue={editUser?.name} style={{width:'50%'}} className={styles.input}/>
              <br />
              <Input defaultValue={editUser?.email} style={{width:'50%'}} className={styles.input}/>
              <br />
              <Button variant="contained" style={{marginBottom:'10px'}}className = {styles.sendButton}>Enviar</Button>

            </form>
          </div>
      </Box>
    </Modal>
    <div className={styles.section}>
      <div className={styles.container}>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650, margin: '0 auto',  maxWidth: 1100 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell >Email</TableCell>
                <TableCell align="right">funcoes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(({id,name,email}) => (
                <TableRow
                  key={name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {name}
                  </TableCell >
                  <TableCell >{email}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" size="large" onClick={() => {
                      setEditUser({id,name,email})
                      handleOpenModal()
                    
                    }}>
                      <Edit  color="warning"/>
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => {
                      handleDestroy({id,name, refreshCallback})
                    }}>
                      <Delete  color="error"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    
    </>

  )
}