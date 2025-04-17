import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { topicValidation } from './topic.validation';
import { topicController } from './topic.controller';


const topicRouter = express.Router();
topicRouter.post('/', auth.authUser('teacher'), validateRequest(topicValidation.createTopicSchema), topicController.createTopic);
topicRouter.get('/', auth.authUser('teacher'),  topicController.getTopic);
topicRouter.get('/:id', auth.authUser('teacher'),  topicController.getsingleTopic);
topicRouter.patch('/:id', auth.authUser('teacher'),  topicController.updateTopic);
topicRouter.delete('/:id', auth.authUser('teacher'),  topicController.deleteTopic);

export default topicRouter;