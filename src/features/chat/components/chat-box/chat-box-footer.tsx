import {
  CameraIcon,
  DocumentIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  PlusCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/data-display/popover';
import { forwardRef, useState } from 'react';
import { useChatBox, useMessagesBox } from '../../context';

import { Button } from '@/components/actions/button';
import Image from 'next/image';
import { Media } from '../../types/message';
import { createLocalMessage } from '../../utils/create-local-message';
import { messageApi } from '@/features/chat/api/message-api';
import { roomApi } from '../../api/room-api';
import { uploadImage } from '@/utils/upload-img';
import useAuthStore from '@/features/auth/stores/use-auth-store';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';

export interface ChatBoxFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ChatBoxFooter = forwardRef<HTMLDivElement, ChatBoxFooterProps>(
  (props, ref) => {
    const { room, updateRoom } = useChatBox();
    const { addMessage, replaceMessage } = useMessagesBox();
    const currentUser = useAuthStore((s) => s.user);
    const [files, setFiles] = useState<
      {
        url: string;
        file: File;
      }[]
    >([]);
    const { getInputProps, getRootProps, open } = useDropzone({
      onDropAccepted: (files) => {
        const newFiles = files.map((file) => ({
          url: URL.createObjectURL(file),
          file,
        }));
        setFiles((old) => [...old, ...newFiles]);
      },
      noClick: true,
      noKeyboard: true,
      maxSize: 3 * 1024 * 1024, // 5MB
    });

    const { mutateAsync } = useMutation({
      mutationFn: messageApi.sendMessage,
      onSuccess: (data, variables) => {
        // replaceMessage(data, variables.clientTempId);
      },
    });

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      const items = e.clipboardData.items;
      const files = Array.from(items)
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFile());
      const newFiles = files.map((file) => ({
        url: URL.createObjectURL(file!),
        file: file!,
      }));
      setFiles((old) => [...old, ...newFiles]);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const content = formData.get('message') as string;
      const images: Media[] = [];
      const documents: Media[] = [];
      for (const file of files) {
        if (file.file.type.startsWith('image')) {
          images.push({
            url: file.url,
            type: 'image',
            file: file.file,
            name: file.file.name,
            size: file.file.size,
          });
        } else {
          documents.push({
            url: file.url,
            type: 'document',
            file: file.file,
            name: file.file.name,
            size: file.file.size,
          });
        }
      }
      e.currentTarget.reset();
      setFiles([]);
      let roomId = room._id;

      if (room.status === 'temporary') {
        const res = await roomApi.createRoom({
          participants: room.participants.map((p) => p._id),
        });
        roomId = res._id;
        updateRoom(res);
      }

      if (content) {
        const localMessage = createLocalMessage({
          sender: currentUser!,
          content,
        });
        addMessage(localMessage);
        mutateAsync({
          content,
          roomId,
          clientTempId: localMessage._id,
        });
      }

      if (images.length) {
        const localImageMessage = createLocalMessage({
          sender: currentUser!,
          media: images,
        });
        addMessage(localImageMessage);
        const imagesUploaded: Media[] = await Promise.all(
          images.map(async (img) => {
            const res = await uploadImage(img.file!);
            return {
              url: res.secure_url,
              type: 'image',
            };
          }),
        );

        mutateAsync({
          content: '',
          roomId,
          clientTempId: localImageMessage._id,
          media: imagesUploaded,
        });
      }
      if (documents.length) {
        const localDocumentMessages = documents.map((doc) => {
          const localDocumentMessage = createLocalMessage({
            sender: currentUser!,
            media: [doc],
          });
          addMessage(localDocumentMessage);
          return localDocumentMessage;
        });
        Promise.all(
          localDocumentMessages.map(async (message, index) => {
            const res = await uploadImage(documents[index].file!);
            mutateAsync({
              content: '',
              roomId,
              clientTempId: message._id,
              media: [
                {
                  ...documents[index],
                  url: res.secure_url,
                },
              ],
            });
          }),
        );
      }
    };
    return (
      <form
        {...getRootProps()}
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2"
      >
        <div className="min-h-[3.5rem] flex-1 items-center gap-2 rounded-lg bg-card p-2 shadow-sm transition-all">
          <div className="flex flex-1 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button.Icon size="md" variant="ghost" shape="circle">
                  <PlusCircleIcon />
                </Button.Icon>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="w-fit p-2"
                align="start"
                sideOffset={16}
                alignOffset={-8}
              >
                <Button.Icon disabled size="sm" variant="ghost" shape="circle">
                  <CameraIcon />
                </Button.Icon>
                <Button.Icon
                  onClick={open}
                  size="sm"
                  variant="ghost"
                  shape="circle"
                >
                  <PhotoIcon />
                </Button.Icon>
                <Button.Icon
                  onClick={open}
                  size="sm"
                  variant="ghost"
                  shape="circle"
                >
                  <DocumentIcon />
                </Button.Icon>
                <Button.Icon disabled size="sm" variant="ghost" shape="circle">
                  <MicrophoneIcon />
                </Button.Icon>
              </PopoverContent>
            </Popover>
            <input
              onPaste={handlePaste}
              name="message"
              type="text"
              className="flex-1 bg-transparent outline-none"
              placeholder="Type a message"
            />
            <input hidden {...getInputProps()} />
          </div>
          {files.length > 0 && (
            <div className="flex flex-row-reverse justify-end gap-2 pt-4">
              {files.map((file) => {
                const isImage = file.file.type.startsWith('image');
                return (
                  <div
                    key={file.url}
                    className="relative aspect-square h-16 rounded-lg shadow"
                  >
                    {isImage ? (
                      <Image
                        layout="fill"
                        src={file.url}
                        alt="img"
                        key={file.url}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex  h-full w-full items-center justify-center rounded-lg bg-primary/10">
                        <DocumentIcon className="h-8 w-8 text-primary/60" />
                        <div className="absolute bottom-0 left-0  w-full rounded-b-md bg-black/50 p-1">
                          <span
                            title={file.file.name}
                            className="line-clamp-1 text-xs text-primary-foreground"
                          >
                            {file.file.name}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      tabIndex={-1}
                      type="button"
                      onClick={() =>
                        setFiles((old) => old.filter((f) => f.url !== file.url))
                      }
                      className="absolute right-0.5 top-0.5 h-6 w-6 overflow-hidden rounded-full bg-slate-400"
                    >
                      <XCircleIcon className="h-full w-full" />
                    </button>
                  </div>
                );
              })}
              <div
                onClick={open}
                className="aspect-square h-16 cursor-pointer overflow-hidden rounded-lg shadow"
              >
                <PlusCircleIcon className="h-full w-full bg-primary/10 p-2" />
              </div>
            </div>
          )}
        </div>
        <Button.Icon size="lg" shape="circle" className="shrink-0">
          <PaperAirplaneIcon />
        </Button.Icon>
      </form>
    );
  },
);
ChatBoxFooter.displayName = 'ChatBoxFooter';
