import { Injectable , NotFoundException , ConflictException } from '@nestjs/common';  
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
@Injectable()
export class UsersService {
    private users : User[] = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') : User[] {
        if (role) {
           const rolesArray = this.users.filter (user => user.role === role)  ; 
           if (rolesArray.length === 0) {
               throw new NotFoundException('User not found');
           } else {
               return rolesArray;
           }
        } else {
            return this.users;
        }


    }

    findOne(id: number):User { 
        const user = this.users.find(user => user.id === id); 

        if (!user) {
            throw new NotFoundException('User not found');
        } else {
            return user ; 
        }
}  

create (createUserDto: CreateUserDto) :User { 
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
        id : usersByHighestId[0].id + 1,
        ...createUserDto
    } 
    const findUser = this.users.find(user => user.email === newUser.email);
    if (findUser) {
        throw new ConflictException('User already exists');
    } else { 
        this.users.push(newUser);
        return newUser;
    }
} 
update (id : number , updateUserDto : UpdateUserDto) : User { 
    const userFounded = this.users.find(user => user.id === id);
    if (!userFounded) {     
        throw new NotFoundException('User not found');
    } else { 
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUserDto
                }
            } else {
                return user;
            }
        })
        return userFounded;
        
    }
}

delete(id: number) : User { 

    const userFounded = this.users.find(user => user.id === id) ; 
    if (!userFounded) {
        throw new NotFoundException('User not found');
    } else { 
       this.users = this.users.filter(user => user.id !== id); 
        return userFounded;
    }
    

    }
}