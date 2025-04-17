"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const topic_validation_1 = require("./topic.validation");
const topic_controller_1 = require("./topic.controller");
const topicRouter = express_1.default.Router();
topicRouter.post('/', auth_1.auth.authUser('teacher'), (0, validateRequest_1.default)(topic_validation_1.topicValidation.createTopicSchema), topic_controller_1.topicController.createTopic);
topicRouter.get('/', auth_1.auth.authUser('teacher'), topic_controller_1.topicController.getTopic);
topicRouter.get('/:id', auth_1.auth.authUser('teacher'), topic_controller_1.topicController.getsingleTopic);
topicRouter.patch('/:id', auth_1.auth.authUser('teacher'), topic_controller_1.topicController.updateTopic);
topicRouter.delete('/:id', auth_1.auth.authUser('teacher'), topic_controller_1.topicController.deleteTopic);
exports.default = topicRouter;
