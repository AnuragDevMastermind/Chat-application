import { ConversationModel } from "../../models/convrersation.model";


export const createConversation = (values: Record<string, any>) =>
  new ConversationModel(values)
    .save()
    .then((conversation) => conversation.toObject());

export const getConversations = (userId: string) => {
  const aggregationPipeline = [
    {
      $match: {
        userIds: userId,
      },
    },
    {
      $project: {
        friend: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$userIds",
                as: "user",
                cond: {
                  $ne: ["$$user", userId],
                },
              },
            },
            0,
          ],
        },
        lastMessage: 1,
        lastMessageTime: 1,
      },
    },
    {
      $addFields: {
        friend: { $toObjectId: "$friend" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "friend",
        foreignField: "_id",
        as: "friend",
      },
    },
    {
      $unwind: "$friend",
    },
    {
      $project: {
        lastMessage: 1,
        lastMessageTime: 1,
        friend: {
          _id: "$friend._id",
          number: "$friend.number",
          name: "$friend.name",
        },
      },
    },
  ];
  return ConversationModel.aggregate(aggregationPipeline).exec();
};

export const getConversation = (senderId: String, receiverId: String) =>
  ConversationModel.findOne({
    userIds: { $all: [senderId, receiverId] },
  });

  export const updateConversationById = (id: String, values: Record<string, any>) =>
    ConversationModel.findByIdAndUpdate(id, values)

