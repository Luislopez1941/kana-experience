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

    getYachtByYachtType: async (data: any) => {
        const path = `yachts/by-categories`;
        return ConfigurationAPIs.post(path, data);
    },


    getYachtsById: async (id: any) => {
        const path = `yachts/get-yacht-by-id/${id}`;
        return ConfigurationAPIs.get(path);
    },


    ///Reservations////

  createReservation: async (data: any) => {
    const path = `reservations/create`;
    return ConfigurationAPIs.post(path, data);
  },



    ////////CATEGORIAS DE YACHTS ////////////


    getYachtCategories: async (userId: any) => {
        const path = `yacht-categories/get-categories`;
        return ConfigurationAPIs.post(path, { userId });
    },



    /////////////Tour ////////////

    getTourByTourCategory: async (tourCategoryId: any) => {
        const path = `tours/by-category/${tourCategoryId}`;
        return ConfigurationAPIs.get(path);
    },

    getToursById: async (id: any) => {
        const path = `tours/get-tour-by-id/${id}`;
        return ConfigurationAPIs.get(path);
    },



    
    /////////////Categories Tour ////////////

    getTourCategories: async () => {
        const path = `tour-types/get-all`;
        return ConfigurationAPIs.get(path);
    },


      /////////////Clubs ////////////

      getClubByClubCategory: async (clubCategoryId: any) => {
        const path = `clubs/by-category/${clubCategoryId}`;
        return ConfigurationAPIs.get(path);
    },

    getClubsById: async (id: any) => {
        const path = `clubs/get-club-by-id/${id}`;
        return ConfigurationAPIs.get(path);
    },



    
    /////////////Categories Clubs ////////////

    getClubCategories: async () => {
        const path = `club-types/get-all`;
        return ConfigurationAPIs.get(path);
    },

    getClubAll: async () => {
        const path = `clubs/get-all`;
        return ConfigurationAPIs.get(path);
    },







    // http://localhost:3000/yachts/by-type/1

    // getProducts: async (categoryId: number) => {
    //     const path = `products/category/${categoryId}`;
    //     return ConfigurationAPIs.get(path);
    // },








}

export default APIs;
