import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { omit } from 'ramda'
import { DbService } from 'src/db/db.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('registry')
  async registry(@Body() data: Prisma.UserCreateInput) {
    const saltOrRounds = 10
    const password = data.password
    const hash = await bcrypt.hash(password, saltOrRounds)

    const user = await this.db.user.create({
      data: { username: data.username, password: hash },
    })

    return user.id
  }

  @Post('login')
  async login(
    @Body() data: Pick<Prisma.UserCreateInput, 'username' | 'password'>,
  ) {
    const matchedUser = await this.db.user.findFirst({
      where: { username: data.username },
    })

    if (matchedUser) {
      const isMatch = await bcrypt.compare(data.password, matchedUser.password)

      if (isMatch) {
        const token = this.jwtService.sign(omit(['password'], matchedUser))
        return token
      }
    }

    return new BadRequestException('用户名或密码错误')
  }
}
