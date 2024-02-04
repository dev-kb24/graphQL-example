import { MessagesInterface } from "../../application/interfaces/messages.interface";
import { UpdateUseCase } from "../../application/useCases/messages/update.useCase";

describe('use case updateMessage',() => {
    let messageRepository: MessagesInterface;
    beforeEach(() => {
        messageRepository = {
            findAll: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn().mockResolvedValue({_id: '1', name: 'message 1', description: 'description 1'}),
            delete: jest.fn()
        };
    })

    it('should update a message', async () => {
        const updateMessageUseCase = new UpdateUseCase(messageRepository);
        const message = await updateMessageUseCase.execute('1', 'message 1', 'description 1');
        expect(message).toEqual({_id: '1', name: 'message 1', description: 'description 1'});
    });

    it('should throw an error when message not updated', async () => {
        messageRepository.update = jest.fn().mockResolvedValue(null);
        const updateMessageUseCase = new UpdateUseCase(messageRepository);
        try {
            await updateMessageUseCase.execute('1', 'message 1', 'description 1');
        } catch (error : any) {
            expect(error.message).toEqual('Message not updated');
        }
    });
    
    it('should throw an error when repository throws', async () => {
        messageRepository.update = jest.fn().mockRejectedValue(new Error('Repository error'));
        const updateMessageUseCase = new UpdateUseCase(messageRepository);
        try {
            await updateMessageUseCase.execute('1', 'message 1', 'description 1');
        } catch (error : any) {
            expect(error.message).toEqual('Repository error');
        }
    })

});