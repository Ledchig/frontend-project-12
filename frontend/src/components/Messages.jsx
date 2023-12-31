import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import InputNewMessage from './InputNewMessage';

const Messages = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  const currentChannelMessages = messages
    .filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', duration: 0 });
  }, [currentChannelMessages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-mutted">{`${currentChannelMessages.length} ${t('chat.messageCount', { count: currentChannelMessages.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map(({ body, username, id }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              :
              {` ${body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <InputNewMessage />
        </div>
      </div>

    </Col>
  );
};

export default Messages;
