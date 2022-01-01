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
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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
interface HandleCreate {
  route: string;
  data: object;
}
export function Admin() {
  const {isAuthenticated} = useContext(AuthContext);
  const [auth, setAuth] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [users, setListUsers] = useState<User[]>([])
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const {update, destroy, create} = useContext(HandleContext);
  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if(!isAuthenticated()) {
      setAuth(false);
    }
    listAll()
  },[])
  function handleDestroy({route,refreshCallback}: HandleDestroy) {
    destroy({route,refreshCallback});
  }
  async function handleUpdate({route,data}: HandleUpdate) {
    const {status} = await update({route,data});
    handleCloseModal()
    if(status == 409) {
      Swal.fire(
        'Email existente!',
        '',
        'error'
      )
      return;
    }
    listAll();
    Swal.fire(
      'Sucesso!',
      '',
      'success'
    )
  }
  async function handleCreate({route,data}: HandleCreate) {
    const {status} = await create({route,data});
    handleCloseModal()
    if(status == 409) {
      Swal.fire(
        'Email existente!',
        '',
        'error'
      ).then(() => {
        setPassword('');
        handleOpenModal()
      })
      return;
    }else if(status == 400) {
      Swal.fire(
        'Preencha os campos!',
        '',
        'error'
      ).then(() => {
        setPassword('');
        handleOpenModal()
      })
      return;
    }
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
          <div className={styles.modalContainer}><h2>{isEdit ? 'Editar Usuario' : 'Criar Usuario'} </h2>  
            <form>
              <Input onChange={(event) => {
                setName(event.target.value);
              }} defaultValue={name} style={{width:'50%'}} placeholder="Nome" className={styles.input}/>
              <br />
              <Input type="email" onChange={(event) => {
                setEmail(event.target.value);
              }} defaultValue={email} style={{width:'50%'}} required placeholder="Email" className={styles.input}/>
              <br />
              {!isEdit 
              ? (
                  <>
                  <Input type="password" onChange={(event) => {
                    setPassword(event.target.value);
                  }}  style={{width:'50%'}} required placeholder="Senha" className={styles.input}/>
                  <br />
                  <Button onClick = {() => {
                    const route = `users`
                    const data = {
                      name,
                      email,
                      password
                    }
                    handleCreate({route,data}); 
                  }} variant="contained" style={{marginBottom:'10px'}}className = {styles.sendButton}>Enviar</Button>
                  </>
                )  
              : (
                  <Button onClick = {() => {
                    const route = `users/${id}`
                    const data = {
                      name,
                      email
                    }
                    handleUpdate({route,data}); 
                  }} variant="contained" style={{marginBottom:'10px'}}className = {styles.sendButton}>Enviar</Button>
                )
                
              }
            </form>
          </div>
      </Box>
    </Modal>
    <div className={styles.section}>
      <div className={styles.container}>
      <div className={styles.add}>
        <AddCircleRoundedIcon 
        style={{
          width: '2rem',
          height: '2rem'
        }} 
        className={styles.button}
        onClick = {() => {
          setId('');
          setName('');
          setEmail('');
          setPassword('');
          setIsEdit(false);
          handleOpenModal()
        }}/>
      </div>
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
                      setIsEdit(true);
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