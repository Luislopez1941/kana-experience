import { create } from 'zustand';

export interface UserInfo {
  id: number;
  sucursal_id: number;
  nombre: string;
  email: string;
  password: string;
  tipo_us: number;
}

export const EmptyUserState: UserInfo = {
  id: 0,
  sucursal_id: 0,
  nombre: '',
  email: '',
  password: '',
  tipo_us: 0
};

export const UserKey = 'userKana';

interface UserStore {
  url_server: string;
}

const useStore = create<UserStore>((set) => ({
  url_server: 'https://jllc-back.com/kana-experience/', // URL base de la imagen

}));

export default useStore;
