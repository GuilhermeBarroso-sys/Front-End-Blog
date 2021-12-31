import { responsiveFontSizes } from "@mui/material";
import {createContext, ReactNode} from "react";
import Swal from "sweetalert2";
import { api } from "../services/api";
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
interface UpdateResponse {
  success: boolean,
  status: number
}
interface CreateResponse {
  success: boolean,
  status: number|string
}
type HandleContextData = {
  update: ({route, data} : HandleUpdate) => Promise<UpdateResponse>;
  create: ({route, data} : HandleUpdate) => Promise<CreateResponse>;
  destroy: ({route, refreshCallback} : HandleDestroy )  => void;
}
export const HandleContext = createContext({} as HandleContextData)
type AuthProvider = {
  children: ReactNode
}
export function HandleFunctions(props : AuthProvider ) {
  function destroy({route, refreshCallback} : HandleDestroy) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Ao confirmar, Não sera possivel recuperar os dados.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#787A91',
      focusConfirm: false,
      cancelButtonText: 'Voltar',
      confirmButtonText: 'Deletar'
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        api.delete(route).then(() => {
          Swal.fire(
            'Deletado!',
            `Sucesso.`,
            'success'
          )
          refreshCallback();
        });
        
      }
    })
  }
  async function update({route, data} : HandleUpdate) : Promise<UpdateResponse> {
     return api.put(route, data)
     .then(() => {
       return {
         success:true,
         status: 200
       }
     })
     .catch(() => {
       return {
         success: false,
         status: 409
       }
     })
  
  }
  async function create({route, data} : HandleCreate) {
    console.log(route,data);
    return api.post(route, data)
     .then(() => {
       return {
         success:true,
         status: 200
       }
     })
     .catch((err) => {
       return {
         success: false,
         status: err.response.data
       }
     })
  }
  return (
    <HandleContext.Provider value={{update, destroy, create}}>
      {props.children}
    </HandleContext.Provider>
  )
}

