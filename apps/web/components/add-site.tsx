"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

export const AddSite = () => {
  return (
    <Dialog.Root>
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
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input defaultValue="" placeholder="My site name" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Url
            </Text>
            <TextField.Input defaultValue="" placeholder="mysite.com" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button highContrast>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
