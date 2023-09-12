'use client';

import React, { useEffect } from 'react';

import socket from '@/lib/socket';
import useAuthStore from '@/features/auth/stores/use-auth-store';

const SocketProvider = () => {
  const { user } = useAuthStore();
  useEffect(() => {
    socket.connect();
    function onConnect() {
      if (user?._id) {
        socket.emit('client.join', user._id);
      }
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  return <></>;
};

export default SocketProvider;
