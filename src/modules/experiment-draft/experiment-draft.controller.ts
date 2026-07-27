/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Body, Controller, Delete, ForbiddenException, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UserService } from '../user/user.service';
import { ExperimentDraftResponseDto } from './dto/experiment-draft-response.dto';
import { UpsertExperimentDraftDto } from './dto/upsert-experiment-draft.dto';
import { ExperimentDraft } from './entity/experiment-draft.entity';
import { ExperimentDraftService } from './experiment-draft.service';

type AuthenticatedRequest = Request & { user: { email: string } };

@ApiTags('ExperimentDraft')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('experiment-draft')
export class ExperimentDraftController {
  constructor(
    private readonly experimentDraftService: ExperimentDraftService,
    private readonly userService: UserService,
  ) { }

  // The draft payload can carry plaintext LLM/search API keys typed into
  // the task step, so ownerId in the URL must be checked against the JWT
  // owner instead of trusted as-is.
  private async assertOwnership(req: AuthenticatedRequest, ownerId: string): Promise<void> {
    const currentUser = await this.userService.findOneByEmail(req.user.email);
    if (currentUser._id !== ownerId) {
      throw new ForbiddenException('Você não tem permissão para acessar este rascunho.');
    }
  }

  @Put(':ownerId')
  @ApiOperation({ summary: 'Save or update the in-progress experiment draft for an owner' })
  @ApiParam({ name: 'ownerId', type: String, description: 'Owner user ID' })
  @ApiBody({ type: UpsertExperimentDraftDto })
  @ApiResponse({ status: 200, description: 'Draft saved successfully.', type: ExperimentDraftResponseDto })
  async upsert(
    @Req() req: AuthenticatedRequest,
    @Param('ownerId') ownerId: string,
    @Body() upsertExperimentDraftDto: UpsertExperimentDraftDto,
  ): Promise<ExperimentDraft> {
    await this.assertOwnership(req, ownerId);
    return await this.experimentDraftService.upsert(
      ownerId,
      upsertExperimentDraftDto.payload,
    );
  }

  @Get(':ownerId')
  @ApiOperation({ summary: 'Get the in-progress experiment draft for an owner, if any' })
  @ApiParam({ name: 'ownerId', type: String, description: 'Owner user ID' })
  @ApiResponse({ status: 200, description: 'Draft for the owner, or null if none exists.', type: ExperimentDraftResponseDto })
  async find(
    @Req() req: AuthenticatedRequest,
    @Param('ownerId') ownerId: string,
  ): Promise<ExperimentDraft> {
    await this.assertOwnership(req, ownerId);
    return await this.experimentDraftService.find(ownerId);
  }

  @Delete(':ownerId')
  @ApiOperation({ summary: 'Clear the in-progress experiment draft for an owner' })
  @ApiParam({ name: 'ownerId', type: String, description: 'Owner user ID' })
  @ApiResponse({ status: 200, description: 'Draft cleared successfully.' })
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('ownerId') ownerId: string,
  ): Promise<void> {
    await this.assertOwnership(req, ownerId);
    await this.experimentDraftService.remove(ownerId);
  }
}
