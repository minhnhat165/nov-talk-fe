import { CameraIcon, XCircleIcon } from '@heroicons/react/24/solid';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/actions/dropdown-menu';
import { Fragment, useCallback, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Avatar } from '@/components/data-display/avatar';
import { Button } from '@/components/actions/button';
import { Chip } from '@/components/data-display/chip/chip';
import { Input } from '@/components/data-entry/input';
import { SearchInput } from '@/components/data-entry';
import { Typography } from '@/components/data-display';
import { User } from '@/features/user/types';
import { UserItem } from '@/features/user/components/user-item';
import { roomApi } from '../../api/room-api';
import { searchApi } from '@/features/search/api/search-api';
import { useDropzone } from 'react-dropzone';
import { useInboxContext } from '../inbox/inbox-context';
import { useMutation } from '@tanstack/react-query';
import { useSearch } from '@/hooks/use-search';

export interface ChatCreatorProps {
  onBack?: () => void;
}

export const ChatCreator = (props: ChatCreatorProps) => {
  const { data, setSearchTerm } = useSearch<User[]>(searchApi.users);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { backToDefault } = useInboxContext();
  const router = useRouter();
  const params = useParams();
  const originId = useRef(params?.id);
  const handleRemoveUser = useCallback((user: User) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== user._id));
  }, []);
  const handleClickUser = useCallback(
    (user: User) => {
      setSelectedUsers((prev) => {
        let newSelectedUsers = [];
        const index = prev.findIndex((u) => u._id === user._id);
        if (index === -1) {
          newSelectedUsers = [...prev, user];
        } else {
          newSelectedUsers = [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ];
        }
        if (newSelectedUsers.length == 1) {
          router.push(`/talk/${newSelectedUsers[0]._id}`);
        } else {
          if (originId.current) {
            router.push(`/talk/${originId.current}`);
          } else {
            router.push(`/talk`);
          }
        }
        return newSelectedUsers;
      });
    },
    [router],
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: roomApi.createRoom,
    onSuccess: (data) => {
      backToDefault();
      router.push(`/talk/${data._id}`);
    },
  });
  const [preview, setPreview] = useState<string | undefined>();
  const { getRootProps, getInputProps, open, acceptedFiles, inputRef } =
    useDropzone({
      noClick: true,
      multiple: false,
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      },
      onDropAccepted: (files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file);
        setPreview(preview);
      },
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const participants = data.getAll('participants') as string[];
    let avatarFile: File | undefined;
    if (preview) {
      avatarFile = acceptedFiles[0];
    }
    mutate({
      name,
      participants,
      avatarFile,
    });
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-card shadow-sm">
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="space-y-1 p-4 py-2">
          <Typography>Add people to your chat</Typography>
          <SearchInput
            onChange={(e) =>
              setSearchTerm(e.currentTarget.value.toLocaleLowerCase())
            }
            placeholder="Search"
          />
        </div>
        <div className="w-full flex-1 overflow-y-scroll px-2">
          {data?.map((user) => (
            <UserItem
              isActive={!!selectedUsers.find((u) => u._id === user._id)}
              onClick={() => handleClickUser(user)}
              key={user._id}
              user={user}
            />
          ))}
        </div>
        {selectedUsers.length > 1 && (
          <form
            className="flex max-h-[16rem] flex-col border-t py-2"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 px-4">
              <input name="avatar" {...getInputProps()} />

              {preview ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar
                      src={preview}
                      shape="circle"
                      alt={selectedUsers[0].name}
                      className="ring-2 ring-background"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={open}>Change</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setPreview(undefined);
                      }}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button.Icon
                  onClick={open}
                  type="button"
                  shape="circle"
                  className="shrink-0"
                >
                  <CameraIcon />
                </Button.Icon>
              )}

              <Input placeholder="Type a name" name="name" />
            </div>
            <div className="flex w-full items-center justify-between px-4 pt-2">
              <Typography className="text-lg font-semibold">
                Selected
              </Typography>
              <div className="text-sm">
                <span className="text-primary">{selectedUsers.length}</span>
                /100
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2">
              {selectedUsers.map((user) => (
                <Fragment key={user._id}>
                  <Chip
                    key={user._id}
                    leftContent={
                      <Avatar
                        src={user.avatar}
                        shape="circle"
                        alt={user.name}
                        className="h-full"
                      />
                    }
                    content={user.name}
                    rightContent={
                      <div
                        onClick={() => handleRemoveUser(user)}
                        className="aspect-square h-full rounded-full p-0.5 ring-foreground hover:cursor-pointer hover:bg-slate-300"
                      >
                        <XCircleIcon className="text-primary/60" />
                      </div>
                    }
                    className="mb-1 mr-1"
                  />
                  <input
                    hidden
                    type="checkbox"
                    name="participants"
                    value={user._id}
                    defaultChecked
                  />
                </Fragment>
              ))}
            </div>
            <div className="p-2 pb-0">
              <Button loading={isLoading} className="w-full" color="primary">
                Create
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
