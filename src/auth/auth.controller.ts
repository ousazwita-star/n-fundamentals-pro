import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service.js';
import { CreateUserDTO } from '../user/dto/create-user.dto.js';
import { LoginDTO } from './dto/login.dto.js';
import { AuthService } from './auth.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(
        private usersService :UsersService,
        private authService : AuthService
    ){}

    @Post('signup')
    @ApiOperation({ summary: 'User Signup' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    signup(
        @Body()
        userDTO : CreateUserDTO
    ) : Promise<User>{
        return this.usersService.create(userDTO);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({
        status: 200,
        description: 'It will give you the access_token in the response',
    })
    login(
        @Body() 
        loginDTO : LoginDTO
    ){
        return this.authService.login(loginDTO)
    }

    @Get('env')
    getEnvVariables(){
        return this.authService.getEnvVariables();
    }

}
