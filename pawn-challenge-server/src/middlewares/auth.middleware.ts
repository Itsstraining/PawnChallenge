import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import * as admin from 'firebase-admin';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    // console.log(req);
    //   let idToken = req.headers['authorization'];
    //   if (idToken == undefined) {
    //     res.status(401).send('Unauthorized');
    //     return;
    //   }
    //   let verifyToken = await this.authService.verifyToken(idToken);
    //   if (verifyToken == null) {
    //     res.status(401).send('Permission denied');
    //     return verifyToken;
    //   }
    //   req.user = verifyToken;
    //   next();
    // }

    let idToken = req.headers['authorization'];
    if (idToken == undefined) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const bearer = idToken.split(' ');
    const token = bearer[1];
    try {
      let verifiedToken = await this.authService.verifyToken(token);
      if (verifiedToken == null) {
        console.log('verifiedToken == null');
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      next();
      req.payload = verifiedToken;
    } catch (error) {
      console.log(error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
