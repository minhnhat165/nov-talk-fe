import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/feedback/alert-dialog/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/actions/dropdown-menu';
import { EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/data-entry/radio-group';
import { forwardRef, useState } from 'react';

import { Button } from '@/components/actions/button';
import { Label } from '@/components/data-display/lable';
import { Message } from '../../types';
import { PinIcon } from 'lucide-react';
import { messageApi } from '../../api/message-api';
import { useMutation } from '@tanstack/react-query';

export interface MessageMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  message: Message;
  isMine: boolean;
}

export const MessageMenu = forwardRef<HTMLDivElement, MessageMenuProps>(
  (props, ref) => {
    const { mutate } = useMutation({
      mutationFn: messageApi.remove,
    });
    const [removeType, setRemoveType] = useState<'all' | 'me'>('me');
    const handleSubmit = () => {
      mutate({
        id: props.message._id,
        type: removeType,
      });
    };
    return (
      <div ref={ref} {...props}>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button.Icon shape="circle" size="sm" variant="ghost">
                <EllipsisHorizontalIcon />
              </Button.Icon>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <AlertDialogTrigger className="w-full">
                <DropdownMenuItem>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  <span>Unsent</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <PinIcon className="mr-2 h-4 w-4" />
                  <span>Pin</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Who do you want to remove this message for?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <RadioGroup
                  value={removeType}
                  onValueChange={(value) => setRemoveType(value as any)}
                  defaultValue="me"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      disabled={!props.isMine}
                      value="all"
                      id="option-two"
                    />
                    <Label htmlFor="option-two">For everyone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="me" id="option-one" />
                    <Label htmlFor="option-one">For you</Label>
                  </div>
                </RadioGroup>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:bg-slate-400">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSubmit}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
);
MessageMenu.displayName = 'MessageMenu';
