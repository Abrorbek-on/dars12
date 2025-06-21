import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import * as bcrypt from "bcrypt"
import { MailerService } from 'src/common/maile/maile.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService,
        private newMaileService: MailerService
    ) { }

    private async generateToken(payload: { userId: number; role: string }, accessTokenOnly?: boolean) {
        const accessToken = await this.jwtService.signAsync(
            { id: payload.userId, role: payload.role, type: 'access' },
            { expiresIn: '1h' }
        );

        if (accessTokenOnly) {
            return { accessToken };
        }

        const refreshToken = await this.jwtService.signAsync(
            { id: payload.userId, type: 'refresh' },
            { expiresIn: '7d' }
        );

        return {
            accessToken,
            refreshToken,
        };
    }


    async register(payload: Required<registerDto>) {
        const { username, email, password } = payload;

        const existingUsername = await this.userModel.findOne({ where: { username } });
        if (existingUsername) throw new ConflictException('Username already exists');

        const existingEmail = await this.userModel.findOne({ where: { email } });
        if (existingEmail) throw new ConflictException('Email already exists');

        const code = Math.floor(100000 + Math.random() * 900000);
        await this.newMaileService.sendConfigurationMailer(email, "Tasdiqlash kodi", code);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userModel.create({ ...payload, password: hashedPassword });

        return this.generateToken({ userId: newUser.id, role: newUser.role });
    }

    async login(payload: Required<loginDto>) {
        const { username, password } = payload;

        const user = await this.userModel.findOne({ where: { username } });
        if (!user) throw new NotFoundException('Username or password is invalid');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new NotFoundException('Username or password is invalid');

        return this.generateToken({ userId: user.id, role: user.role });
    }

    async refreshtoken({ token }: { token: string }) {
        const payload = await this.jwtService.verifyAsync(token);
        return this.generateToken({ userId: payload.id, role: payload.role }, true);
    }
}
