import {createContext, ReactNode} from "react";
import Swal from "sweetalert2";
import { api } from "../services/api";
interface HandleDestroy {
  id:string;
  name:string;
  type:string;
  refreshCallback: () => void
}
type HandleContextData = {
  destroy: ({id, name, type, refreshCallback} : HandleDestroy )  => void;
}
export const HandleContext = createContext({} as HandleContextData)
type AuthProvider = {
  children: ReactNode
}
export function HandleFunctions(props : AuthProvider ) {
  function destroy({id, name, type, refreshCallback} : HandleDestroy) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Ao confirmar, o ${type} ${name} Será removido.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#787A91',
      focusConfirm: false,
      cancelButtonText: 'Voltar',
      confirmButtonText: 'Deletar'
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        api.delete(`destroy/${id}`).then(() => {
          Swal.fire(
            'Deletado!',
            `O ${type} ${name} foi deletado.`,
            'success'
          )
          refreshCallback();
        });
        
      }
    })
  }
  return (
    <HandleContext.Provider value={{destroy}}>
      {props.children}
    </HandleContext.Provider>
  )
}

