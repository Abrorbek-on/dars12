import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.model';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(dto: Required<UserDto>) {
    return await this.userModel.create(dto);
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async update(dto: Partial<UserDto>, updateDto: Partial<UserDto>) {
    const user = await this.userModel.findOne({ where: { ...dto } });
    if (!user) throw new NotFoundException('User topilmadi');
    await user.update(updateDto);
    return user;
  }

  async delete(dto: Partial<UserDto>) {
    const deleted = await this.userModel.destroy({
      where: { ...dto },
    });
    if (!deleted) throw new NotFoundException('User topilmadi');
    return { message: 'User ochirildi' };
  }
}
