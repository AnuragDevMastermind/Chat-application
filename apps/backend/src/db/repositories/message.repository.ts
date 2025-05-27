import { PipelineStage, Types } from "mongoose";
import { MessageModel } from "../../models/message.model";

export const createMessage = (values: Record<string, any>) =>
  new MessageModel(values).save().then((message) => message.toObject());

export const getPaginatedMessages = (
 conversationId: string,
 page: number,
 size: number
) => {
 const aggregationPipeline: PipelineStage[] = [
   {
     $match: {
       conversationId: new Types.ObjectId(conversationId)
     }
   },
   { $sort: { timestamp: -1 } },
   { $skip: (page - 1) * size },
   { $limit: size },
   { $sort: { timestamp: 1 } },
 ]
 return MessageModel.aggregate(aggregationPipeline).exec();
}
