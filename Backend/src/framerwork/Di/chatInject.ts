import { FindChatOfUserController } from "../../adapters/controllers/chat/findChatOfUserController";
import { LoadPreviousMessageController } from "../../adapters/controllers/messages/loadPreviousMessageController";
import { ChatRepository } from "../../adapters/repository/chat/chatRepository";
import { MessageRepository } from "../../adapters/repository/message/messageRepository";
import { CreateChatUseCase } from "../../useCases/chat/createChatUseCase";
import { FindChatBetweenClientAndVendorUseCase } from "../../useCases/chat/findChatBetweenClientAndVendorUseCase";
import { FindChatsOfAUserUseCase } from "../../useCases/chat/findChatsOfAUserUseCase";
import { UpdateLastMessageUseCase } from "../../useCases/chat/updateLastMessageOfChatUseCase";
import { CreateMessageUseCase } from "../../useCases/message/createMessageUseCase";
import { GetMessagesOfAChatUseCase } from "../../useCases/message/getMessagesOfAchatUseCase";
import { LoadPreviousChatUseCase } from "../../useCases/message/loadPreviousChatUseCase";

//-------------------------------- create chat --------------------------
const chatRepository = new ChatRepository()
export const injectedCreateChatUseCase = new CreateChatUseCase(chatRepository)

//-------------------------------Find chat between client and vendor----------------------------
export const injectedFindChatBetweenClientAndVendorUseCase = new FindChatBetweenClientAndVendorUseCase(chatRepository)



//------------------------------------------------------ create message=======================
const messageDatabase = new MessageRepository()
export const injectedCreateMessageUseCase = new CreateMessageUseCase(messageDatabase)




//-------------------------------------Find messages------------------------
export const injectedFindMessagesOfChatUseCase = new GetMessagesOfAChatUseCase(messageDatabase)

//------------------------------update Last message--------------------------
export const injectedUpdateLastMessageUseCase = new UpdateLastMessageUseCase(chatRepository)

//------------------------------------- load previous chat----------------------
const loadPreviousChatUseCase = new LoadPreviousChatUseCase(messageDatabase)
export const injectedLoadPreviousChatController = new LoadPreviousMessageController(loadPreviousChatUseCase)

//--------------------------------------Find chats of a user---------------------------------
const findChatsOfUserUseCase = new FindChatsOfAUserUseCase(chatRepository)
export const injectedFindChatsOfUserController = new FindChatOfUserController(findChatsOfUserUseCase)