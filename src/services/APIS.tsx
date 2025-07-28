import ConfigurationAPIs from '../services/ConfigApi';

interface LoginData {
    email: string;
    password: string;
}

interface UserData {
    firstName: string;
    firstSurname: string;
    typeUser: string;
    phone: string;
    email: string;
    password: string;
    description: string
}


interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;
};

// interface userGet {
//     id: number;
//     firstName: string;
//     firstSurname: string;
//     typeUser: string;
//     phone: string;
//     email: string;
//     password: string;
//}

interface Skill {
    name: string;
}

type Skills = Skill[];

interface UpdateUserData {
    id: number,
    type: string,
    profilePhoto: string;
    background: string;
    description?: string;
    skills: Skills;
}

interface FormData {
    first_name: string;
    first_surname: string;
    phone: string;
    email: string;
    password: string;
    id_state: number | null;
    id_locality: number | null;
    id_municipality: number | null;
}



const APIs = {
    login: async (data: LoginData) => {
        const path = 'general_login';
        return ConfigurationAPIs.post(path, data);
    },

    getYachtByYachtType: async (yachtTypeId: any) => {
        const path = `yachts/by-type/${yachtTypeId}`;
        return ConfigurationAPIs.get(path);
    },


    getTourByTourType: async (tourTypeId: any) => {
        const path = `tours/by-type/${tourTypeId}`;
        return ConfigurationAPIs.get(path);
    },

    // http://localhost:3000/yachts/by-type/1

    // getProducts: async (categoryId: number) => {
    //     const path = `products/category/${categoryId}`;
    //     return ConfigurationAPIs.get(path);
    // },








}

export default APIs;
