import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class AuthService {
    async verifyToken(token: string) {
        try{
            let verifyToken = await admin.auth().verifyIdToken(token);
            return verifyToken;
        }catch{
            return null;
        }
    }
}
