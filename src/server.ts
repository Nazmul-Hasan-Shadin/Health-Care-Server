import express from 'express'
import app from './app';
import { Server } from 'http';

async function main (){
    const server:Server=app.listen(3000,()=>{
        console.log('server is listening');
        
    })
}
main()