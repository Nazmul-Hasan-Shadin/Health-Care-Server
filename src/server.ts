import express from 'express'
import app from './app';
import { Server } from 'http';
import config from './config';

async function main (){
    const server:Server=app.listen(config.port,()=>{
        console.log('server is listening');
        
    })
}
main()