import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
//import { UserService } from '../user/user.service';
//import { User } from 'src/model/user.entity';
import {User2Service} from '../user2/user2.service';
import {User} from '../user2/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: User2Service,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      return await this.userService.findByEmailAndPassword({
        email,
        password,
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw error;
    }
  }

  async loginWithCredentials(user: User) {
    const payload = {email: user.email};
    return {
      id: user._id,
      email: user.email,
      researcher: user.researcher,
      name: user.name,
      lastName: user.lastName,
      accessToken: this.jwtService.sign(payload),
      expiredAt: Date.now() + 60000,
    };
  }
}
