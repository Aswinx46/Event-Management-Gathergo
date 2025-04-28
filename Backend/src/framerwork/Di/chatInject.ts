import { ChatRepository } from "../../adapters/repository/chat/chatRepository";
import { MessageRepository } from "../../adapters/repository/message/messageRepository";
import { CreateChatUseCase } from "../../useCases/chat/createChatUseCase";
import { FindChatBetweenClientAndVendorUseCase } from "../../useCases/chat/findChatBetweenClientAndVendorUseCase";
import { CreateMessageUseCase } from "../../useCases/message/createMessageUseCase";
import { GetMessagesOfAChatUseCase } from "../../useCases/message/getMessagesOfAchatUseCase";

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