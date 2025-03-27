import { HttpException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../model/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserExperimentsService } from '../user-experiments/user-experiments.service';
import { ExperimentsService } from '../experiments/experiments.service';
import { UserExperiment } from 'src/model/user-experiment.entity';
import { ForgotPasswordDto, ResetPasswordDto } from 'src/model/user.dto';

import { MailerService } from '@nestjs-modules/mailer';


const HOUR_1 = 3600000;
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly _userModel: Model<User>,
    @Inject(UserExperimentsService)
    private readonly userExperimentsService: UserExperimentsService,
    @Inject(ExperimentsService)
    private readonly experimentsService: ExperimentsService,
    private readonly mailerService: MailerService,
  ) { }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;
    let user = null;
    try {
      user = await this.findOneByEmail(email);
    } catch (error) {
      throw error;
    }

    user.recoveryPasswordToken = crypto.randomBytes(20).toString('hex');;
    user.recoveryPasswordTokenExpirationDate = new Date(Date.now() + HOUR_1);

    try {
      await this._userModel.findByIdAndUpdate(user._id, user, {
        new: true,
      }).exec();
    } catch (error) {
      throw new HttpException(`Ocorreu um erro inesperado tente novamente`, 500);
    }

    try {
      await this.sendResetPasswordEmail(user.email, user.recoveryPasswordToken);
    } catch (error) {
      throw new HttpException(`Ocorreu um erro inesperado tente novamente`, 500);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const user = await this.findOneByEmail(resetPasswordDto.email);

      if (user.recoveryPasswordToken && user.recoveryPasswordToken !== resetPasswordDto.token) {
        throw new Error('Token inválido');
      }
      if (user.recoveryPasswordTokenExpirationDate < new Date()) {
        throw new Error('Token expirado.')
      }

      user.password = resetPasswordDto.password;
      user.recoveryPasswordToken = null;
      user.recoveryPasswordTokenExpirationDate = null;

      await this.update(user._id, user);

    } catch (error) {
      throw error;
    }

  }

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new this._userModel(user);

    const userSaved = await newUser.save();
    const experiments = await this.experimentsService.findAll();

    for (const experiment of experiments) {
      const userExperiment = new UserExperiment();
      userExperiment.userId = userSaved._id;
      userExperiment.experimentId = experiment._id;
      await this.userExperimentsService.create(userExperiment);
    }
    return userSaved
  }

  async findAll(): Promise<User[]> {
    try {
      return await this._userModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this._userModel.findById(id).exec();

      if (!user) {
        throw new NotFoundException(`Não foi possível encontrar usuário com id: ${id}`)
      }
      return user
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this._userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException(`Não foi possível encontrar usuário cadastrado com email: ${email}`);
      }
      return user;
    } catch (error) {
      throw error
    }
  }

  async addChangePasswordToken(email: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    const token = crypto.randomBytes(32).toString('hex');
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30);
    user.recoveryPasswordToken = token;
    user.recoveryPasswordTokenExpirationDate = expirationDate;

    return await this.update(user._id, user);
  }

  async findByEmailAndPassword({ email, password }): Promise<User> {
    try {
      const user = await this.findOneByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      throw new UnauthorizedException()
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, user: User): Promise<User> {
    try {
      if (user.password?.length > 0) {
        user.password = await bcrypt.hash(user.password, 10);
      } else {
        user.password = undefined;
      }

      const result = await this._userModel.findByIdAndUpdate(id, user, {
        new: true,
      }).exec();
      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    return await this._userModel.findByIdAndDelete(id).exec();
  }

  async removeAll() {
    const result = await this._userModel.deleteMany().exec();
    return { n: result.deletedCount };
  }

  private async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MY_GMAIL_EMAIL,
        subject: 'Alteração de Senha plataforma Buscando e Aprendendo',
        text: `Por favor, acesse o link a seguir para restaurar sua senha: https://buscandoeaprendendo.onrender.com/reset-password?token=${token}&email=${email}`,
        html: `Por favor, acesse o link a seguir para restaurar sua senha: <a href='https://buscandoeaprendendo.onrender.com/reset-password?token=${token}&email=${email}'>https://buscandoeaprendendo.onrender.com/reset-password?token=${token}</a>`
      });
    } catch (error) {
      throw error;
    }
  }
}
