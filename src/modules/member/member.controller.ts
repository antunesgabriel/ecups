import { Controller, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { MemberService } from './member.service';
import { MemberCreateDTO } from './dto/member-create.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly _memberService: MemberService) {}

  async store(
    @Body() member: MemberCreateDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const message = await this._memberService.create(member);
    return res.status(HttpStatus.CREATED).json(message);
  }
}
