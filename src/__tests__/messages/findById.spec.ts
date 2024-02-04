import { MessagesInterface } from "../../application/interfaces/messages.interface";
import { FindByIdUseCase } from "../../application/useCases/messages/findById.useCase";

describe('use case findById',() => {
    let messageRepository: MessagesInterface;
    beforeEach(() => {
        messageRepository = {
            findAll: jest.fn(),
            create: jest.fn(),
            findById: jest.fn().mockResolvedValue({_id: '1', name: 'message 1', description: 'description 1'}),
            update: jest.fn(),
            delete: jest.fn()
        };
    })

    it('should return a message', async () => {
        messageRepository.findById = jest.fn().mockResolvedValue({_id: '1', name: 'message 1', description: 'description 1'});
        const findByIdUseCase = new FindByIdUseCase(messageRepository);
        const message = await findByIdUseCase.execute('1');
        expect(message).toEqual({_id: '1', name: 'message 1', description: 'description 1'});
    });

    it('should throw an error when message not found', async () => {
        messageRepository.findById = jest.fn().mockResolvedValue(null);
        const findByIdUseCase = new FindByIdUseCase(messageRepository);
        try {
            await findByIdUseCase.execute('1');
        } catch (error : any) {
            expect(error.message).toEqual('Message not found');
        }
    });
    
    it('should throw an error when repository throws', async () => {
        messageRepository.findById = jest.fn().mockRejectedValue(new Error('Repository error'));
        const findByIdUseCase = new FindByIdUseCase(messageRepository);
        try {
            await findByIdUseCase.execute('1');
        } catch (error : any) {
            expect(error.message).toEqual('Repository error');
        }
    })

})