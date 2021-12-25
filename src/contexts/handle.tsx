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
  refreshCallback: () => void
}
type HandleContextData = {
  update: ({route, data, refreshCallback} : HandleUpdate) => void;
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
  function update({route, data, refreshCallback} : HandleUpdate) {
    api.put(route, data)
    .then(() => {
      Swal.fire(
        'Atualizado!',
        `Sucesso.`,
        'success'
      )
      refreshCallback()
    })
  }
  return (
    <HandleContext.Provider value={{update, destroy}}>
      {props.children}
    </HandleContext.Provider>
  )
}

