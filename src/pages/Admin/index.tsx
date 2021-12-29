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
import Swal from "sweetalert2";

type User = {
  id: string;
  name: string;
  email: string;
}
interface HandleDestroy {
  route:string;
  refreshCallback: () => void
}
interface HandleUpdate {
  route: string;
  data: object;
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
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const {update, destroy} = useContext(HandleContext)
    function handleDestroy({route,refreshCallback}: HandleDestroy) {
      destroy({route,refreshCallback});
    }
    async function handleUpdate({route,data}: HandleUpdate) {
      const {success,status} = await update({route,data});
      if(status == 409) {
        handleCloseModal()
        listAll();
        Swal.fire(
          'Email existente!',
          '',
          'error'
        )
        return;
      }
      handleCloseModal()
      listAll();
      Swal.fire(
        'Sucesso!',
        '',
        'success'
      )
    }
    function listAll() {
      api.get<User>(`users`).then(({data})  => {
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
          <div className={styles.modalContainer}><h2>Editar Usuario </h2>  
            <form>
              <Input onChange={(event) => {
                setName(event.target.value);
              }} defaultValue={name} style={{width:'50%'}} className={styles.input}/>
              <br />
              <Input onChange={(event) => {
                setEmail(event.target.value);
              }} defaultValue={email} style={{width:'50%'}} className={styles.input}/>
              <br />
              <Button onClick = {(event) => {
                const route = `users/${id}`
                const data = {
                  name,
                  email
                }
                handleUpdate({route,data}); 
              }} variant="contained" style={{marginBottom:'10px'}}className = {styles.sendButton}>Enviar</Button>

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
                      setId(id);
                      setName(name);
                      setEmail(email);
                      handleOpenModal()
                    
                    }}>
                      <Edit  color="warning"/>
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => {
                      const route = `users/${id}`;
                      const refreshCallback = () => {
                        listAll();
                      }
                      handleDestroy({route,refreshCallback});
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