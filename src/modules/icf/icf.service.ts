import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICF } from '../../model/icf.entity';

@Injectable()
export class ICFService {
  constructor(
    @InjectModel('ICF')
    private readonly _icfModel: Model<ICF>,
  ) { }

  async create(icf: ICF) {
    const newICF = new this._icfModel(icf);
    return await newICF.save();
  }

  async findAll(): Promise<ICF[]> {
    return await this._icfModel.find().exec();
  }

  async find(id: string): Promise<ICF> {
    return await this._icfModel.findById(id);
  }

  async findOneByExperimentId(experimentId: string) {
    return await this._icfModel.findOne({ experimentId: experimentId }).exec();
  }

  async update(id: string, icf: ICF): Promise<ICF> {
    return await this._icfModel.findByIdAndUpdate(id, icf).exec();
  }

  async remove(id: string) {
    return await this._icfModel.findByIdAndDelete(id).exec();;
  }
}
