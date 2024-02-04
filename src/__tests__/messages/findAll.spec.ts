import { FindAllUseCase } from "../../application/useCases/messages/findAll.useCase";
import { MessagesInterface } from "../../application/interfaces/messages.interface";

describe('use case findAll',() => {
    let messageRepository: MessagesInterface;
    beforeEach(() => {
        messageRepository = {
            findAll: jest.fn().mockResolvedValue([{_id: '1', name: 'message 1', description: 'description 1'}]),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
    })

    it('should return all messages', async () => {
        const findAllUseCase = new FindAllUseCase(messageRepository);
        const messages = await findAllUseCase.execute();
        expect(messages).toEqual([{_id: '1', name: 'message 1', description: 'description 1'}]);
    });

    it('should throw an error when messages not found', async () => {
        messageRepository.findAll = jest.fn().mockResolvedValue(null);
        const findAllUseCase = new FindAllUseCase(messageRepository);
        try {
            await findAllUseCase.execute();
        } catch (error : any) {
            expect(error.message).toEqual('Messages not found');
        }
    });
    
    it('should throw an error when repository throws', async () => {
        messageRepository.findAll = jest.fn().mockRejectedValue(new Error('Repository error'));
        const findAllUseCase = new FindAllUseCase(messageRepository);
        try {
            await findAllUseCase.execute();
        } catch (error : any) {
            expect(error.message).toEqual('Repository error');
        }
    })
})