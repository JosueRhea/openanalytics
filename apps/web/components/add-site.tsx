"use client";

import { createSite } from "@openanalytics/api";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Props {
  userId: string;
}

export const AddSite = ({ userId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnSubmit = async (formData: FormData) => {
    const data = await createSite(formData);
    if (data.success) {
      setIsOpen(false);
      return;
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button highContrast>
          New
          <PlusIcon style={{ marginLeft: 2 }} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>New site</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add the information of your site
        </Dialog.Description>
        <form action={handleOnSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                name="name"
                defaultValue=""
                placeholder="My site name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Url
              </Text>
              <TextField.Input
                name="url"
                defaultValue=""
                placeholder="mysite.com"
              />
            </label>
            <input type="hidden" name="userId" value={userId} />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <SaveButton />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

function SaveButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button highContrast disabled={pending} type="submit">
      {pending ? "..." : "Save"}
    </Button>
  );
}
