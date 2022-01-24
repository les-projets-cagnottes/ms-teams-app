// Read botFilePath and botFileSecret from .env file.
require('dotenv').config()

const {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    teamsGetChannelId
} = require('botbuilder');

class TeamsStartNewThreadInChannel extends TeamsActivityHandler {

    constructor() {
        super();

        this.onMessage(async (context, next) => {
            console.log(context.activity);
            const teamsChannelId = teamsGetChannelId(context.activity);
            const message = MessageFactory.text('This will be the first message in a new thread');
            const newConversation = await this.teamsCreateConversation(context, teamsChannelId, message);
            this.serviceUrl = newConversation[0].serviceUrl;
            await next();
        });
    }

    async teamsCreateConversation(context, teamsChannelId, message) {
        const conversationParameters = {
            isGroup: true,
            channelData: {
                channel: {
                    id: teamsChannelId
                }
            },

            activity: message
        };
        const notifyAdapter = context.adapter;
        const connectorClient = notifyAdapter.createConnectorClient(context.activity.serviceUrl);
        const conversationResourceResponse = await connectorClient.conversations.createConversation(conversationParameters);
        const conversationReference = TurnContext.getConversationReference(context.activity);
        conversationReference.conversation.id = conversationResourceResponse.id;
        return [conversationReference, conversationResourceResponse.activityId];
    }

    async proactiveUser(adapter) {
        
        const message = MessageFactory.text("Notification envoyée dans un canal privé");
        const conversationParameters = {
            isGroup: false,
            channelData: {
                tenant: {
                    id: process.env.MICROSOFT_TENANT_ID
                }
            },
            bot: {
                id: process.env.MICROSOFT_APP_ID,
                name: "Les Projets Cagnottes"
            },
            members: [
                {
                    id: "fakeid",
                    name: "fakename"
                }
            ]
        };

        const parametersTalk = conversationParameters;
        const connectorClient = adapter.createConnectorClient("https://smba.trafficmanager.net/emea/");
        const response = await connectorClient.conversations.createConversation(parametersTalk);
        await connectorClient.conversations.sendToConversation(response.id, message);

    }
    
    async proactiveChannel(adapter) {
        
        const teamsChannelId = "fakechannel";
        const message = MessageFactory.text("Notification envoyée dans un canal public");

        const conversationParameters = {
            isGroup: true,
            channelData: {
                channel: {
                    id: teamsChannelId
                }
            },
            activity: message
        };

        const conversationParametersReference = conversationParameters;
        const connectorClient = adapter.createConnectorClient("https://smba.trafficmanager.net/emea/");
        await connectorClient.conversations.createConversation(conversationParametersReference);

    }

}

module.exports.TeamsStartNewThreadInChannel = TeamsStartNewThreadInChannel;