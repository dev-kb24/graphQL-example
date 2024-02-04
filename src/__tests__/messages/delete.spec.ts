import { MessagesInterface } from "../../application/interfaces/messages.interface";
import { DeleteUseCase } from "../../application/useCases/messages/delete.useCase";

describe('use case deleteMessage',() => {
    let messageRepository: MessagesInterface;
    beforeEach(() => {
        messageRepository = {
            findAll: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue({_id: '1', name: 'message 1', description: 'description 1'}),
        };
    })

    it('should delete a message', async () => {
        const deleteMessageUseCase = new DeleteUseCase(messageRepository);
        const message = await deleteMessageUseCase.execute('message 1');
        expect(message).toEqual({_id: '1', name: 'message 1', description: 'description 1'});
    });

    it('should throw an error when message not deleted', async () => {
        messageRepository.delete = jest.fn().mockResolvedValue(null);
        const deleteMessageUseCase = new DeleteUseCase(messageRepository);
        try {
            await deleteMessageUseCase.execute('message 1');
        } catch (error : any) {
            expect(error.message).toEqual('Messages not deleted');
        }
    });
    
    it('should throw an error when repository throws', async () => {
        messageRepository.delete = jest.fn().mockRejectedValue(new Error('Repository error'));
        const deleteMessageUseCase = new DeleteUseCase(messageRepository);
        try {
            await deleteMessageUseCase.execute('message 1');
        } catch (error : any) {
            expect(error.message).toEqual('Repository error');
        }
    })

});