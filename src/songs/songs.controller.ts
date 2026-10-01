import { Body,Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service.js';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { Song } from './song.entity.js';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto.js';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistsJwtGuard } from '../auth/artists-jwt-guard.js';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService){}

    @Post()
    @UseGuards(ArtistsJwtGuard)
    create(@Body() createSongDTO : CreateSongDTO,
        @Request() request : any 
    ){
        console.log('request.user ====> ',request.user);
        
        return this.songsService.create(createSongDTO)
    }
    
    @Get(":id")
    async findOne(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode :HttpStatus.NOT_ACCEPTABLE})
        )
        id : number
    ):Promise<Song>{
        // return `Fetch song based on the ${id} ${typeof id}`;
        return await this.songsService.findOne(id);  
    }
    
    @Get()
    findAll(
        @Query('page',new DefaultValuePipe(1),ParseIntPipe) page : number = 1,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit : number = 10

    ) : Promise<Pagination<Song>>{
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate(
            {
                page,limit
            }
        );
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSongDTO: UpdateSongDTO,
    ): Promise<Song> {
        return this.songsService.update(id, updateSongDTO);
    }
    
    @Delete(":id")
    deleteOne(
        @Param(
        'id',
        ParseIntPipe)
        id :number
    ):Promise<DeleteResult> {
       return this.songsService.remove(id);
    }

}
