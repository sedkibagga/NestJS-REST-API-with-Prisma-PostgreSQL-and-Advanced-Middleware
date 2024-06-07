import { Body, Controller, Delete, Get, Param, Patch, Post, Query , ParseIntPipe } from '@nestjs/common';
import { UsersService , User} from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto'; 
import { ValidationPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
@Controller('users')
export class UsersController { 
    constructor(private readonly usersService: UsersService) {}
    @Get() //Get /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') : User [] { 
        return this.usersService.findAll(role);
    }
 //the order of the methods is important so  @Get ('interns') should be before @Get(':id') specific route come before @Get(':id')
    // @Get ('interns') //Get /users/interns 
    // findAllInterns() {
    //     return [];
    // }
    @Get(':id') //Get /users/:id 
    findOne(@Param('id' , ParseIntPipe) id:number ) : User {
        //+id convert string to number(unary plus)
       const user =  this.usersService.findOne(id);  
       if (!user) {
           throw new NotFoundException('User not found');
       } else {
           return user;
       }
        
    }

    @Post() //Post /users 
    create(@Body(ValidationPipe) createUserDto : CreateUserDto) :User { 
        return this.usersService.create(createUserDto);
        
    }

    @Patch (':id') //Patch /users/:id 
    update(@Param('id' , ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto): User {
        return this.usersService.update(id, updateUserDto);
    } 

    @Delete (':id') //Delete /users/:id 
    delete(@Param('id' , ParseIntPipe) id: number) : User {
        return this.usersService.delete(id);
    }
  
}
