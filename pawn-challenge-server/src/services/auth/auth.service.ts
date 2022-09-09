import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class AuthService {
    async verifyToken(idToken: string) {
        try{
            let verifyToken = await admin.auth().verifyIdToken(idToken);
            return verifyToken;
        }catch{
            return null;
        }
    }

    async registerAccount(email: string, password: string) {
        let user = await admin.auth().createUser({
            email: email,
            password: password,
        });
        return user;
    }
}
