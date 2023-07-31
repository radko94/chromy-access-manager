import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './db_entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  public createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this._userRepository.create(createUserDto);

    return this._userRepository.save(newUser);
  }

  public findById(id: number): Promise<User> {
    return this._userRepository.findOne({ where: { id: id } });
  }

  public getAll(): Promise<User[]> {
    return this._userRepository.findBy({});
  }

  public async validateKey(
    userId: number,
    userAccessKey: string,
  ): Promise<boolean> {
    const user = await this._userRepository.findOne({ where: { id: userId } });

    console.warn(user, userAccessKey, user.accessKey === userAccessKey);

    if (user.accessKey !== userAccessKey) {
      throw new Error();
    }

    return true;
  }
}
