import { MessagesInterface } from "../../application/interfaces/messages.interface";
import { AddMessageUseCase } from "../../application/useCases/messages/addMessage.useCase";

describe('use case addMessage',() => {
    let messageRepository: MessagesInterface;
    beforeEach(() => {
        messageRepository = {
            findAll: jest.fn(),
            create: jest.fn().mockResolvedValue({_id: '1', name: 'message 1', description: 'description 1'}),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
    })

    it('should create a message', async () => {
        const addMessageUseCase = new AddMessageUseCase(messageRepository);
        const message = await addMessageUseCase.execute('message 1', 'description 1');
        expect(message).toEqual({_id: '1', name: 'message 1', description: 'description 1'});
    });

    it('should throw an error when message not created', async () => {
        messageRepository.create = jest.fn().mockResolvedValue(null);
        const addMessageUseCase = new AddMessageUseCase(messageRepository);
        try {
            await addMessageUseCase.execute('message 1', 'description 1');
        } catch (error : any) {
            expect(error.message).toEqual('Message not created');
        }
    });
    
    it('should throw an error when repository throws', async () => {
        messageRepository.create = jest.fn().mockRejectedValue(new Error('Repository error'));
        const addMessageUseCase = new AddMessageUseCase(messageRepository);
        try {
            await addMessageUseCase.execute('message 1', 'description 1');
        } catch (error : any) {
            expect(error.message).toEqual('Repository error');
        }
    })

});